import prisma from '@/libs/prismadb'
import getCurrentUser from './getCurrentUser'

const getNotFollowUsers = async () => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return []

    const followingUsers = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: { followingIds: true }, // 只選取 followingIds 這個欄位
    })
    if (!followingUsers) return []

    // 如果該使用者沒有關注其他使用者，則直接取得所有使用者資料
    if (followingUsers.followingIds.length === 0) {
      const allUsers = await prisma.user.findMany({
        where: { NOT: { id: currentUser.id } },
      })
      return allUsers
    }

    const unfollowedUsers = await prisma.user.findMany({
      where: {
        NOT: [{ id: { in: followingUsers.followingIds } }, { id: currentUser.id }], // 使用 NOT IN 來排除已關注的使用者
      },
    })
    return unfollowedUsers
  } catch (err: any) {
    return []
  }
}

export default getNotFollowUsers
