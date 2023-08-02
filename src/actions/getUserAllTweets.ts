import prisma from '@/libs/prismadb'

export async function getUserAllTweets(id: string) {
  try {
    const allUserTweets = await prisma.tweet.findMany({
      where: { authorId: id, responseFrom: null },
      include: {
        author: true,
        likeFrom: true,
        responseFrom: true,
        comments: true,
        retweetFrom: true,
      },
    })

    return allUserTweets
  } catch (err: any) {
    return []
  }
}
