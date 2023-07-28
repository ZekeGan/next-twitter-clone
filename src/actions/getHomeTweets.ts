import prisma from '@/libs/prismadb'

export default async function getHomeTweets(slug: string) {
  try {
    const tweets = await prisma.tweet.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: true },
    })
    return tweets
  } catch (err: any) {
    return []
  }
}
