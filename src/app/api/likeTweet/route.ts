import getCurrentUser from '@/actions/getCurrentUser'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    console.log('good')
    const body = await req.json()
    if (!body.tweetId) {
      return new NextResponse('不能提交空白內容', { status: 401 })
    }

    const currentUser = await getCurrentUser()
    if (!currentUser) return new NextResponse('未登入', { status: 401 })

    const updateTweet = await prisma.tweet.update({
      where: { id: body.tweetId },
      data: {
        likeFrom: { connect: { id: currentUser.id } },
      },
    })

    return NextResponse.json(updateTweet)
  } catch (err: any) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
