import prisma from '@/libs/prismadb'
export default async function getSingleTweet(tweetId: string) {
  try {
    if (!tweetId) return null
    const tweet = await prisma.tweet.findUnique({
      where: { id: tweetId },
      include: {
        author: true,
        comments: {
          orderBy: { createdAt: 'desc' },
          include: { author: true },
        },
      },
    })
    return tweet
  } catch (err: any) {
    return null
  }
}
