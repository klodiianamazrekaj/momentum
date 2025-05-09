import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"

import {db} from "@/lib/db"
import authConfig from "@/auth.config"


export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    session: {strategy: "jwt"},
    adapter: PrismaAdapter(db),
})