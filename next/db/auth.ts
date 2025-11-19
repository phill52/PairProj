import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./index";

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

/** Not sure if we should add this? **/
// import NextAuth from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { prisma } from "./prisma"
 
// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [],
// })
//taken from https://github.com/fullstackbook/next-auth-drizzle-postgres-tutorial
