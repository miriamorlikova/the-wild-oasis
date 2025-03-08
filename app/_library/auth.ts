import NextAuth, { Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import Google from "next-auth/providers/google";
import { NextRequest } from "next/server";
import { createGuest, getGuest } from "./data-service";
import { CustomSessionType } from "./types";
const authConfig = {
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],
	callbacks: {
		authorized({ auth }: { auth: Session | null; request: NextRequest }) {
			return !!auth?.user;
		},

		async signIn({ user }: { user: User | AdapterUser }) {
			try {
				const existingGuest = await getGuest(user.email!);

				if (!existingGuest) {
					await createGuest({
						email: user.email ?? "",
						full_name: user.name ?? "",
					});
				}
				return true;
			} catch {
				return false;
			}
		},
		async session({ session }: { session: CustomSessionType }) {
			const guest = await getGuest(session.user.email as string);
			session.user.guest_id = guest?.id;
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
};

export const {
	handlers: { GET, POST },
	signIn,
	signOut,
	auth,
} = NextAuth(authConfig);
