import getCurrentUser from '@/actions/getCurrentUser'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'
export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.comment || !body.responseFrom)
      return new NextResponse('不能提交空白內容', { status: 401 })

    const currentUser = await getCurrentUser()
    if (!currentUser) return new NextResponse('帳號未登入', { status: 401 })

    const newComment = await prisma.tweet.create({
      data: {
        author: { connect: { id: currentUser.id } },
        responseFrom: { connect: { id: body.responseFrom } },
        content: body.comment,
      },
    })
    console.log(newComment);
    

    return NextResponse.json(newComment)
  } catch (err: any) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
