import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import {v} from "convex/values";

const schema = defineSchema({
... authTables,
designs: defineTable({
userId: v.id("users"),
// userId: v.string(),
title: v.string(),
json: v.any(),
height: v.float64(),
width: v.float64(),
thumbnail: v.optional (v.string()),
category: v.optional (v.string()),
isPro: v.boolean(),
isPublished: v.boolean(),
}),
files: defineTable({
    uniqueId: v.string(),
    k: v.number(),
    mdFilename: v.string(),
    imageFilename: v.string(),
    mdStorageId: v.id("_storage"),
    imageStorageId: v.id("_storage"),
    mdUrl: v.string(),
    imageUrl: v.string(),
    createdAt: v.string(),
  })
  .index("by_unique_id", ["uniqueId"])
  .index("by_created_at", ["createdAt"]),
documents: defineTable({
    title: v.string(),
    content: v.string(),
    level: v.number(),
    embedding: v.array(v.float64()),
    collectionName: v.string(),
    metadata: v.object({
      source: v.optional(v.string()),
      chunkIndex: v.optional(v.number()),
    }),
    createdAt: v.number(),
  })
  .index("by_collection", ["collectionName"])
  .index("by_created", ["createdAt"]),
  images: defineTable({
    userId: v.id("users"),
    images: v.array(v.string()),
  })
});

export default schema;