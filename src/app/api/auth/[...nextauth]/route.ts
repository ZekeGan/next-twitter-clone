import NextAuth from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/libs/prismadb'
import { AuthOptions } from 'next-auth'
import bcrypt from 'bcrypt'

export const authOption: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email && !credentials?.password) {
          throw new Error('未含有使用者名稱或密碼')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        if (!user?.email || !user?.hashedPassword) throw new Error('使用者不存在')

        const isCorrect = await bcrypt.compare(credentials.password, user.hashedPassword)
        if (!isCorrect) throw new Error('密碼錯誤')

        return user
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
}
const handler = NextAuth(authOption)

export { handler as POST, handler as GET }
