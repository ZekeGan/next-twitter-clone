import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'
import getCurrentUser from '@/actions/getCurrentUser'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log(body)
    if (!body.textarea) return new NextResponse('內容不得為空', { status: 401 })

    const currentUser = await getCurrentUser()
    if (!currentUser) return new NextResponse('使用者未登入', { status: 401 })

    const notification = await prisma.notification.create({
      data: {
        content: body.textarea,
        type: 'NEW_TWEET',
        from: { connect: { id: currentUser.id } },
      },
    })

    if (currentUser.followBy.length === 0) {
      return new NextResponse('沒有追隨者', { status: 200 })
    }

    await Promise.all(
      currentUser.followBy.map(async (user) => {
        await prisma.user.update({
          where: { id: user.id },
          data: { notifications: { connect: { id: notification.id } } },
        })
      }),
    )

    return new NextResponse('成功', { status: 200 })
  } catch (err: any) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
