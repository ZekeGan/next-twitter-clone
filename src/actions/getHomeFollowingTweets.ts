import prisma from '@/libs/prismadb'
import getCurrentUser from './getCurrentUser'

export default async function getHomeFollowingTweets() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return []

    // 1. 取得某user已關注的使用者ID
    const followingUsers = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: { followingIds: true }, // 只選取 followingIds 這個欄位
    })
    if (!followingUsers) return []

    // 2. 如果該使用者存在且有關注的使用者，則查詢這些使用者的 "tweet" 資料
    if (followingUsers.followingIds.length > 0) {
      const tweetsFromFollowingUsers = await prisma.tweet.findMany({
        where: { authorId: { in: followingUsers.followingIds } }, // 使用 IN 來過濾已關注的使用者 ID
        include: {
          author: true,
          comments: { orderBy: { createdAt: 'desc' } },
          retweetFrom: true,
          likeFrom: true,
          responseFrom: { include: { author: true } },
        },
      })
      return tweetsFromFollowingUsers
    }

    return []
  } catch (err: any) {
    return []
  }
}
