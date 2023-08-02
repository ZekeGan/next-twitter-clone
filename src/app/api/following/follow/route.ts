import getCurrentUser from '@/actions/getCurrentUser'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.targetUserId) {
      return new NextResponse('不能提交空白內容', { status: 401 })
    }

    const currentUser = await getCurrentUser()
    if (!currentUser) return new NextResponse('未登入', { status: 401 })

    const updateUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        following: { connect: { id: body.targetUserId } },
      },
    })

    return NextResponse.json(updateUser)
  } catch (err: any) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
