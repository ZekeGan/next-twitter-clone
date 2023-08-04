import { authOption } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import prisma from '@/libs/prismadb'
import getCurrentUser from './getCurrentUser'

const getFollowing = async () => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return []

    const followingUsers = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: { following: true },
    })
    if (!followingUsers?.following) return []

    return followingUsers.following
  } catch (err: any) {
    return []
  }
}

export default getFollowing
