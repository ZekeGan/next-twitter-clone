'use client'
import Avatar from '@/components/Avatar'
import React from 'react'
import { FaRegComment, FaRetweet, FaHeart } from 'react-icons/fa'
import { FiMoreHorizontal } from 'react-icons/fi'
import { LuHeart, LuUpload } from 'react-icons/lu'
import ActionButton from '@/components/layout/ActionButton'
import { Tweet, User } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface TweetBoxProps {
  data: Tweet & {
    author: User
  }
}

const TweetBox: React.FC<TweetBoxProps> = ({ data }) => {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(`/user/${data.author.id}/status/${data.id}`)}
      className='
        px-3 
        py-2 
        border-b-[1px] 
        border-gray-600 
        hover:bg-white 
        hover:bg-opacity-5 
        transition 
        cursor-pointer'
    >
      <article className='flex space-x-3'>
        <Avatar image={data?.author?.image} />
        <div className='w-full'>
          <div className='flex justify-between'>
            <div className='space-x-2 mb-1'>
              <span className='font-semibold text-white'>{data.author.name}</span>
              <span className=' text-gray-500'>
                <span>@{data.author.userId}</span>
                <i className='text-gray-500'>. 2小時</i>
              </span>
            </div>
            <ActionButton icon={FiMoreHorizontal} onClick={() => {}} />
          </div>

          <p className='text-white mb-3'>{data.content}</p>
          <div className='flex justify-between'>
            <ActionButton icon={FaRegComment} num={20} onClick={() => {}} />
            <ActionButton icon={FaRetweet} num={20} onClick={() => {}} />
            <ActionButton icon={LuHeart} num={20} onClick={() => {}} />
            <ActionButton icon={LuUpload} onClick={() => {}} />
          </div>
        </div>
      </article>
    </div>
  )
}

export default TweetBox
