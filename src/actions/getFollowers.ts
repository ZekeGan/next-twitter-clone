import prisma from '@/libs/prismadb'
import getCurrentUser from './getCurrentUser'

const getFollowers = async () => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return []

    const followingUsers = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: { followBy: true },
    })
    if (!followingUsers?.followBy) return []

    return followingUsers.followBy
  } catch (err: any) {
    return null
  }
}

export default getFollowers
