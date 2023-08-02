import { authOption } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import prisma from '@/libs/prismadb'

const getAnotherUser = async (userId: string) => {
  try {
    if (!userId) return null

    const AnotherUser = await prisma.user.findUnique({
      where: { userId: userId },
      include: { followBy: true, following: true },
    })

    return AnotherUser
  } catch (err: any) {
    return null
  }
}

export default getAnotherUser
