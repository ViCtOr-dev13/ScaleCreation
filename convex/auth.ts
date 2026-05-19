import GitHub from "@auth/core/providers/github";
import { convexAuth } from "@convex-dev/auth/server";
import Google from "@auth/core/providers/google";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    GitHub({
      profile(githubProfile, tokens) {
      return {
            id: githubProfile.node_id,
            name: githubProfile.name || githubProfile.login || "Unknown User",
            email: githubProfile.email || "",
            image: githubProfile.avatar_url || "",
          };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});