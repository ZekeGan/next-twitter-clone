import prisma from '@/libs/prismadb'
import getCurrentUser from './getCurrentUser'

const getAllUsers = async () => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return []

    const users = await prisma.user.findMany({
      orderBy: { userId: 'desc' },
      where: { NOT: { email: currentUser.email } },
    })

    return users
  } catch (err: any) {
    return []
  }
}

export default getAllUsers
