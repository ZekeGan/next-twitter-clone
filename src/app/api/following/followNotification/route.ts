import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'
import getCurrentUser from '@/actions/getCurrentUser'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.id) return new NextResponse('找不到該名使用者', { status: 401 })

    const currentUser = await getCurrentUser()
    if (!currentUser) return new NextResponse('使用者未登入', { status: 401 })

    const notification = await prisma.notification.create({
      data: {
        type: 'BE_FOLLOWED',
        from: { connect: { id: currentUser.id } },
      },
    })

    console.log('created notification')

    if (!notification) {
      return new NextResponse('通知創建錯誤', { status: 401 })
    }

    await prisma.user.update({
      where: { id: body.id },
      data: { notifications: { connect: { id: notification.id } } },
    })

    console.log('updated user')

    return new NextResponse('通知創建成功', { status: 200 })
  } catch (err: any) {
    console.error(err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
