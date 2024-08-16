import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, accounts, sessions, users, verificationTokens } from "./schema";

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth({
	adapter: DrizzleAdapter(db),
	providers: [GitHub],
	callbacks: {
		async session({ session, token, user }) {
			return session;
		},
	},
});
//taken from https://github.com/fullstackbook/next-auth-drizzle-postgres-tutorial
