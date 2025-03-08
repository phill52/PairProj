import NextAuth from "next-auth";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			id: string;
			name: string;
		};
	}
}
//taken from https://github.com/fullstackbook/next-auth-drizzle-postgres-tutorial/blob/main/lib/auth.ts
