import { mutation, query, action, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const uploadFile = action({
  args: {
    uniqueId: v.string(),
    k: v.number(),
    mdFilename: v.string(),
    mdContent: v.string(),  // ← Texte markdown brut
    imageFilename: v.string(),
    imageData: v.bytes(),   // ← Bytes bruts de l'image
  },
  handler: async (ctx, args) => {
    // === Markdown file ===
    const mdBlob = new Blob([args.mdContent], { type: 'text/markdown' });
    const mdStorageId = await ctx.storage.store(mdBlob);
    const mdUrl = await ctx.storage.getUrl(mdStorageId);

    // === Image file ===
    const imageBlob = new Blob([args.imageData], { type: 'image/jpeg' });
    const imageStorageId = await ctx.storage.store(imageBlob);
    const imageUrl = await ctx.storage.getUrl(imageStorageId);

    // Write to database via internal mutation
    await ctx.runMutation(internal.file.storeFileData, {
      uniqueId: args.uniqueId,
      k: args.k,
      mdFilename: args.mdFilename,
      imageFilename: args.imageFilename,
      mdStorageId,
      imageStorageId,
      mdUrl: mdUrl ?? "",
      imageUrl: imageUrl ?? "",
    });

    return { success: true, mdUrl, imageUrl };
  },
});

export const storeFileData = internalMutation({
  args: {
    uniqueId: v.string(),
    k: v.number(),
    mdFilename: v.string(),
    imageFilename: v.string(),
    mdStorageId: v.id("_storage"),
    imageStorageId: v.id("_storage"),
    mdUrl: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    await ctx.db.insert("files", {
      uniqueId: args.uniqueId,
      k: args.k,
      mdFilename: args.mdFilename,
      imageFilename: args.imageFilename,
      mdStorageId: args.mdStorageId,
      imageStorageId: args.imageStorageId,
      mdUrl: args.mdUrl,
      imageUrl: args.imageUrl,
      createdAt: now,
    });
  },
});

export const getMarkdownByUniqueId = query({
  args: { uniqueId: v.string() },
  handler: async (ctx, args) => {
    const files = await ctx.db
      .query("files")
      .filter(q => q.eq(q.field("uniqueId"), args.uniqueId))
      .order("asc")
      .collect();

    return files;
  },
});


