import prisma from '@/libs/prismadb'
import getCurrentUser from './getCurrentUser'

const getAllNotifications = async () => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return []

    const allUserNotifications = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: { notifications: { orderBy: { createdAt: 'desc' } } },
    })
    if (!allUserNotifications) return []

    const allNotifications = await Promise.all(
      allUserNotifications.notifications.map(async (item) => {
        const singleNotification = await prisma.notification.findUnique({
          where: { id: item.id },
          include: { from: true, content: true },
        })
        return singleNotification
      }),
    )

    return allNotifications.filter((item) => item !== null)
  } catch (err: any) {
    return []
  }
}

export default getAllNotifications
