import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { name, email, password } = body

    if (!name || !password || !email) {
      return new NextResponse('missing email, name or password', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        name,
        hashedPassword,
        email,
      },
    })
    return NextResponse.json(newUser)
  } catch (err: any) {
    return new NextResponse('error GG', { status: 500 })
  }
}
