import db from "@/prisma/prisma"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async session({ session, user, token }) {

      try {
        if (session) {
          const userExist = await db.user.findUnique({
            where: {
              email: session.user.email
            }
          })

          if (!userExist) {
            await db.user.create({
              data: {
                email: session.user.email
              }
            })
          }
        }
      } catch (e) {
        console.error(e)
        return session
      }

      return session
    },
  }
})