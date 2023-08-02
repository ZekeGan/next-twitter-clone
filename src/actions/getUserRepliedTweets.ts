import prisma from '@/libs/prismadb'

export async function getUserRepliedTweets(id: string) {
  try {
    const userRepliedTweets = await prisma.tweet.findMany({
      where: { authorId: id, NOT: { responseFrom: null } },
      include: {
        author: true,
        likeFrom: true,
        responseFrom: {
          include: { author: true },
        },
        comments: true,
        retweetFrom: true,
      },
    })

    return userRepliedTweets
  } catch (err: any) {
    return []
  }
}
