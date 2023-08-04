'use client'
import useDifferenceInDate from '@/hooks/useDifferenceInDate'
import { User } from '@prisma/client'
import Link from 'next/link'

interface AuthorInfoProps {
  author: User
  tweetCreatedAt: Date
  children?: React.ReactNode
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ author, tweetCreatedAt, children }) => {
  const differenceInTime = useDifferenceInDate(tweetCreatedAt)
  return (
    <div className='flex space-x-2 items-center'>
      {children}
      <Link
        onClick={(e) => e.stopPropagation()}
        href={`/user/${author.userId}/tweet`}
        className='font-semibold text-white hover:underline'
      >
        <span>{author.name}</span>
      </Link>
      <span className=' text-gray-500'>
        <span>@{author.userId}</span>
        <time> · {differenceInTime}</time>
      </span>
    </div>
  )
}

export default AuthorInfo
