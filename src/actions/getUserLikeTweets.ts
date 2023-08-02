import prisma from '@/libs/prismadb'

export async function getUserLikeTweets(id: string) {
  try {
    const userLikeTweet = await prisma.user.findUnique({
      where: { id: id },
      include: {
        likeTweets: {
          include: {
            author: true,
            comments: true,
            retweetFrom: true,
            likeFrom: true,
          },
        },
      },
    })
    if (!userLikeTweet) return []

    return userLikeTweet.likeTweets
  } catch (err: any) {
    return []
  }
}
