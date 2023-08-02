'use client'

import { Notification } from '@prisma/client'

interface NotificationBoxProps {
  data: Notification
}

const NotificationBox: React.FC<NotificationBoxProps> = ({ data }) => {
  return <div>{data.content}</div>
}

export default NotificationBox
