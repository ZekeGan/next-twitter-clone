import { authOption } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import prisma from '@/libs/prismadb'
import getCurrentUser from './getCurrentUser'

const getFollowing = async (userId: string) => {
  try {
    const followingUsers = await prisma.user.findUnique({
      where: { userId: userId },
      select: { following: { orderBy: { name: 'asc' } } },
    })
    if (!followingUsers?.following) return []

    return followingUsers.following
  } catch (err: any) {
    return []
  }
}

export default getFollowing
