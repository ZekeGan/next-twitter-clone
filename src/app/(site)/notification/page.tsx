import getAllNotifications from '@/actions/getAllNotifications'
import React from 'react'
import NotificationBox from './_component/NotificationBox'

const Notification = async () => {
  const notifications = await getAllNotifications()

  if (!notifications) return <div className='text-white'>未找到通知</div>

  return notifications.map((item) => <NotificationBox data={item} />)
}

export default Notification
