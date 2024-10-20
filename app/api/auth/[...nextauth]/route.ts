import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { supabase } from "@/lib/supabase"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        })

        if (error) {
          console.error('Supabase auth error:', error)
          return null
        }

        return {
          id: data.user?.id,
          email: data.user?.email,
          name: data.user?.user_metadata?.full_name,
          role: data.user?.user_metadata?.role
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
})

export { handler as GET, handler as POST }