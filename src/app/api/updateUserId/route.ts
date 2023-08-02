import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'
import getCurrentUser from '@/actions/getCurrentUser'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body) return new NextResponse('發生錯誤請再重試一次', { status: 401 })

    const currentUser = await getCurrentUser()
    if (!currentUser) return new NextResponse('未登入', { status: 401 })

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        userId: body.userId,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (err: any) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
