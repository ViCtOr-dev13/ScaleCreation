import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createImages = mutation({
  args: {
    images: v.array(v.string()),
    // Removed userId from args - we get it from auth instead
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("User not authenticated");
    
    const images = await ctx.db.insert("images", {
      userId: userId,
      images: args.images
    });
    
    return images;
  },
});

export const getUsersImages = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("User not authenticated");
    
    const images = await ctx.db
      .query("images")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first(); // Changed to .first() to return single object instead of array
    
    return images; 
  }
});

export const UpdateUserImages = mutation({
  args: {
    id: v.id("images"),
    images: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("User not authenticated");

    const updateImages = await ctx.db.patch(args.id, {
      images: args.images,
    });

    return updateImages;
  }
});