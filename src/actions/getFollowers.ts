import prisma from '@/libs/prismadb'

const getFollowers = async (userId: string) => {
  try {
    const followingUsers = await prisma.user.findUnique({
      where: { userId: userId },
      select: { followBy: { orderBy: { name: 'asc' } } },
    })
    console.log(followingUsers)

    if (!followingUsers?.followBy) return []

    return followingUsers.followBy
  } catch (err: any) {
    return null
  }
}

export default getFollowers
