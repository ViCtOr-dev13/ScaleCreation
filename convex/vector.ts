// vector.ts
import { v } from "convex/values";
import {
  query,
  action,
  internalMutation,
  internalQuery,
  ActionCtx,
  QueryCtx,
  MutationCtx,
} from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

// Définir les types en premier pour éviter les références circulaires
export type SearchResult = {
  _id: string;
  _score: number;
  title: string;
  content: string;
  level: number;
  collectionName: string;
};

type DocumentData = {
  _id: Id<"documents">;
  title: string;
  content: string;
  level: number;
  embedding: number[];
  collectionName: string;
  metadata: {
    source?: string;
    chunkIndex?: number;
  };
  createdAt: number;
};

type Chunk = {
  title: string;
  content: string;
  level: number;
};

type SearchResultWithScore = {
  _id: Id<"documents">;
  _score: number;
};

// Fonction utilitaire séparée
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error("Vectors must have the same dimensions");
  }
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  if (normA === 0 || normB === 0) {
    return 0;
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Fonction d'embedding séparée
export async function embed(text: string): Promise<number[]> {
  console.log(`Computing embedding for: ${text.substring(0, 50)}...`);
  
  // Simulation d'embedding - à remplacer par votre vrai service
  const embedding = Array(384).fill(0).map(() => Math.random() * 2 - 1);
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  return embedding.map(val => val / magnitude);
}

// Query interne pour lister les documents d'une collection
export const listCollection = internalQuery({
  args: {
    collectionName: v.string(),
  },
  handler: async (ctx: QueryCtx, args: { collectionName: string }): Promise<DocumentData[]> => {
    const docs = await ctx.db
      .query("documents")
      .withIndex("by_collection", (q) => q.eq("collectionName", args.collectionName))
      .collect();
    
    return docs.map(doc => ({
      _id: doc._id,
      title: doc.title,
      content: doc.content,
      level: doc.level,
      embedding: doc.embedding,
      collectionName: doc.collectionName,
      metadata: doc.metadata,
      createdAt: doc.createdAt,
    }));
  },
});

// Query interne pour récupérer les résultats de recherche
export const fetchResults = internalQuery({
  args: {
    results: v.array(v.object({ 
      _id: v.id("documents"), 
      _score: v.float64() 
    })),
  },
  handler: async (ctx: QueryCtx, args: { results: SearchResultWithScore[] }): Promise<SearchResult[]> => {
    const out: SearchResult[] = [];
    
    for (const result of args.results) {
      const doc = await ctx.db.get(result._id);
      if (!doc) {
        continue;
      }
      
      out.push({
        _id: doc._id.toString(),
        _score: result._score,
        title: doc.title,
        content: doc.content,
        level: doc.level,
        collectionName: doc.collectionName,
      });
    }
    
    return out;
  },
});

// Action pour rechercher des documents similaires
export const searchSimilar = action({
  args: {
    query: v.string(),
    collectionName: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx: ActionCtx, args: { query: string; collectionName: string; limit?: number }): Promise<SearchResult[]> => {
    const limit = args.limit || 5;
    
    // Génère l'embedding de la requête
    const queryEmbedding = await embed(args.query);
    
    // Récupère tous les documents de la collection
    const docs: DocumentData[] = await ctx.runQuery(internal.vector.listCollection, {
      collectionName: args.collectionName,
    });
    
    // Calcule la similarité cosinus pour chaque document
    const results: SearchResultWithScore[] = [];
    for (const doc of docs) {
      const similarity = cosineSimilarity(queryEmbedding, doc.embedding);
      results.push({
        _id: doc._id,
        _score: similarity,
      });
    }   
    
    // Trie par score et limite les résultats
    results.sort((a, b) => b._score - a._score);
    const topResults: SearchResultWithScore[] = results.slice(0, limit);
    
    // Récupère les documents complets
    return await ctx.runQuery(internal.vector.fetchResults, {
      results: topResults,
    });
  },
});

// Mutation interne pour insérer une ligne
export const insertRow = internalMutation({
  args: {
    title: v.string(),
    content: v.string(),
    level: v.number(),
    embedding: v.array(v.float64()),
    collectionName: v.string(),
    metadata: v.object({
      source: v.optional(v.string()),
      chunkIndex: v.optional(v.number()),
    }),
  },
  handler: async (ctx: MutationCtx, args: { 
    title: string; 
    content: string; 
    level: number; 
    embedding: number[]; 
    collectionName: string;
    metadata: { source?: string; chunkIndex?: number };
  }): Promise<void> => {
    await ctx.db.insert("documents", {
      title: args.title,
      content: args.content,
      level: args.level,
      embedding: args.embedding,
      collectionName: args.collectionName,
      metadata: args.metadata,
      createdAt: Date.now(),
    });
  },
});

// Action pour peupler la base avec des documents Markdown
export const populate = action({
  args: {
    chunks: v.array(v.object({
      title: v.string(),
      content: v.string(),
      level: v.number(),
    })),
    collectionName: v.string(),
  },
  handler: async (ctx: ActionCtx, args: { chunks: Chunk[]; collectionName: string }): Promise<void> => {
    console.log(`Populating collection '${args.collectionName}' with ${args.chunks.length} chunks...`);
    
    for (const [index, chunk] of args.chunks.entries()) {
      const text = chunk.title ? `${chunk.title}\n${chunk.content}` : chunk.content;
      const embedding = await embed(text);
      
      await ctx.runMutation(internal.vector.insertRow, {
        title: chunk.title,
        content: chunk.content,
        level: chunk.level,
        embedding,
        collectionName: args.collectionName,
        metadata: {
          chunkIndex: index,
          source: "markdown",
        },
      });
      
      if (index % 10 === 0) {
        console.log(`Processed ${index + 1}/${args.chunks.length} chunks...`);
      }
    }
    
    console.log(`✅ Successfully populated collection '${args.collectionName}' with ${args.chunks.length} documents`);
  },
});

// Action pour insérer un seul document
export const insert = action({
  args: {
    title: v.string(),
    content: v.string(),
    level: v.number(),
    collectionName: v.string(),
    metadata: v.optional(v.object({
      source: v.optional(v.string()),
      chunkIndex: v.optional(v.number()),
    })),
  },
  handler: async (ctx: ActionCtx, args: { 
    title: string; 
    content: string; 
    level: number; 
    collectionName: string;
    metadata?: { source?: string; chunkIndex?: number };
  }): Promise<void> => {
    const text = args.title ? `${args.title}\n${args.content}` : args.content;
    const embedding = await embed(text);
    
    await ctx.runMutation(internal.vector.insertRow, {
      title: args.title,
      content: args.content,
      level: args.level,
      embedding,
      collectionName: args.collectionName,
      metadata: args.metadata || {},
    });
    
    console.log(`✅ Inserted document into collection '${args.collectionName}'`);
  },
});

// Query pour lister les documents d'une collection
export const list = query({
  args: {
    collectionName: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx: QueryCtx, args: { collectionName: string; limit?: number }): Promise<any[]> => {
    const limit = args.limit || 10;
    
    const docs = await ctx.db
      .query("documents")
      .withIndex("by_collection", (q) => q.eq("collectionName", args.collectionName))
      .order("desc")
      .take(limit);
    
    return docs.map(doc => ({
      _id: doc._id,
      title: doc.title,
      content: doc.content,
      level: doc.level,
      collectionName: doc.collectionName,
      metadata: doc.metadata,
      createdAt: doc.createdAt,
    }));
  },
});

// Mutation pour vider une collection
export const clearCollection = internalMutation({
  args: {
    collectionName: v.string(),
  },
  handler: async (ctx: MutationCtx, args: { collectionName: string }): Promise<number> => {
    const docs = await ctx.db
      .query("documents")
      .withIndex("by_collection", (q) => q.eq("collectionName", args.collectionName))
      .collect();
    
    await Promise.all(docs.map(doc => ctx.db.delete(doc._id)));
    
    console.log(`🗑️ Cleared ${docs.length} documents from collection '${args.collectionName}'`);
    return docs.length;
  },
});

// Action pour vider une collection (version publique)
export const clear = action({
  args: {
    collectionName: v.string(),
  },
  handler: async (ctx: ActionCtx, args: { collectionName: string }): Promise<number> => {
    return await ctx.runMutation(internal.vector.clearCollection, args);
  },
});