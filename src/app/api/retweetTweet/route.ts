import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'
import getCurrentUser from '@/actions/getCurrentUser'
export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.tweetId) return new NextResponse('發生錯誤請再重試一次', { status: 401 })

    const currentUser = await getCurrentUser()
    if (!currentUser) return new NextResponse('未登入', { status: 401 })
    const updatedTweet = await prisma.tweet.update({
      where: { id: body.tweetId },
      data: {
        retweetFrom: { connect: { id: currentUser.id } },
      },
    })

    return NextResponse.json(updatedTweet)
  } catch (err: any) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
