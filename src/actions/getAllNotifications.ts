import prisma from '@/libs/prismadb'
import getCurrentUser from './getCurrentUser'

const getAllNotifications = async () => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return []

    const allNotifications = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: { notifications: true },
    })
    if (!allNotifications) return []

    return allNotifications.notifications
  } catch (err: any) {
    return []
  }
}

export default getAllNotifications
