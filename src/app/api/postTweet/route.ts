import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'
import getCurrentUser from '@/actions/getCurrentUser'

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return new NextResponse('使用者未登入', { status: 401 })

    const body = await req.json()
    if (!body.textarea) return new NextResponse('內容不得為空', { status: 401 })

    const newTweet = await prisma.tweet.create({
      data: {
        content: body.textarea,
        author: {
          connect: { id: currentUser.id },
        },
      },
    })

    return NextResponse.json(newTweet)
  } catch (err: any) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
