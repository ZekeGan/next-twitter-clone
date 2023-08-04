'use client'

import { MdArticle } from 'react-icons/md'

import { Notification, Tweet, User } from '@prisma/client'
import Avatar from '@/components/Avatar'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { BiSolidUser } from 'react-icons/bi'
import axios from 'axios'

interface NotificationBoxProps {
  data: Notification & {
    from: User
    content?: Tweet | null
  }
}

const NotificationBox: React.FC<NotificationBoxProps> = ({ data }) => {
  useEffect(() => {
    if (!data.seen) {
      axios.put('/api/seenTheNotification', { id: data.id })
    }
  }, [data])

  if (data.type === 'NEW_TWEET')
    return (
      <Content
        message={
          <div>
            來自 <span className='font-semibold'>{data.from.name}</span> 的新推文
          </div>
        }
        typeIcon={<MdArticle size={30} className=' text-white' />}
        from={data.from}
        href={`user/${data.from.userId}/status/${data.content?.id}`}
        image
        content={<div className='text-gray-500'>{data.content?.content}</div>}
      />
    )
  if (data.type === 'BE_FOLLOWED')
    return (
      <Content
        message={
          <div>
            <span className='font-semibold'>{data.from.name}</span> 已追蹤您
          </div>
        }
        typeIcon={<BiSolidUser size={30} className='text-sky-500' />}
        from={data.from}
        href={`user/${data.from.userId}/tweet`}
        image
      />
    )
}

interface ContentProps {
  from: User
  message: ReactNode
  typeIcon: ReactNode
  href?: string
  option?: ReactNode
  image?: boolean
  content?: ReactNode
}
const Content: React.FC<ContentProps> = ({
  message,
  typeIcon,
  from,
  option,
  href,
  image,
  content,
}) => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(href || '#')}
      className='
        grid 
        grid-cols-[3rem_auto] 
        px-5 
        py-3 
        border-b-[1px] 
        border-gray-600 
        hover:bg-gray-700 
        hover:bg-opacity-50 
        transition 
        cursor-pointer'
    >
      <div>{typeIcon}</div>
      <div className='space-y-2'>
        {image && <Avatar image={from.image} sm />}
        <div className='text-white'>
          <div>{message}</div>
          <div>{content}</div>
        </div>
        {option}
      </div>
    </div>
  )
}

export default NotificationBox
