import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import {v} from "convex/values";
// createDesign is a mutation that creates a new design in the database.

export const createDesign = mutation({
    args: {
        title: v.string(),
        category: v.optional (v.string()),
        json: v.any(),
        height: v.float64(),
        width: v.float64(),

        isPro: v.boolean(),
        isPublished: v.boolean(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("User not authenticated");
        const design = await ctx.db.insert("designs", {
        userId: userId,
        title: args.title,
        category: args.category,
        json: args.json,
        height: args.height,
        width: args.width,
        isPro: args.isPro,
        isPublished: args.isPublished,
    });
    return design;
    },
});


export const getUsersDesigns = query({
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("User not authenticated");
        const designs = await ctx.db
        .query("designs")
        .filter((q) => q.eq(q.field("userId"), userId))
        .collect();
    return designs; 
    }

})


export const DeleteDesign = mutation({
args:{ id: v.id("designs")},
handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("User not authenticated");
    const deleteD = await ctx.db.delete(args.id);
    return deleteD
}

})


export const UpdateDesignTitle = mutation({
  args: {
    id: v.id("designs"),
    title: v.optional(v.string()),  // <— ICI !
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("User not authenticated");

    const updated = await ctx.db.patch(args.id, {
      title: args.title, // peut être string OU undefined
    });

    return updated;
  }
})


export const getDesigns = query({
    args:{ id: v.id("designs")},
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("User not authenticated");
        const designs = await ctx.db
        .query("designs")
        .filter((q) => q.eq(q.field("_id"), args.id))
        .unique();
    return designs; 
    }

})


export const UpdateDesignSize = mutation({
  args: {
    id: v.id("designs"),
    height: v.float64(), 
    width: v.float64(), // <— ICI !
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("User not authenticated");

    const updatedSize = await ctx.db.patch(args.id, {
      height: args.height,
      width: args.width // peut être string OU undefined
    });

    return updatedSize;
  }
})