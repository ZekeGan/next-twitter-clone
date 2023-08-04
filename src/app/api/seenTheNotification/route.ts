import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    if (!body.id) return new NextResponse('發生錯誤請再重試一次', { status: 401 })

    await prisma.notification.update({
      where: { id: body.id },
      data: { seen: true },
    })

    return new NextResponse('是否已觀看訊息更新成功', { status: 200 })
  } catch (err: any) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
