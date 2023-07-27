import { authOption } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import prisma from '@/libs/prismadb'

const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOption)
    if (!session?.user?.name || !session?.user?.email) return null

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return null

    return user
  } catch (err: any) {
    return null
  }
}

export default getCurrentUser
