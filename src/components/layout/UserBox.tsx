'use client'
import Avatar from '@/components/Avatar'
import clsx from 'clsx'
import React, { useState } from 'react'
import UserBoxModal from './LeftSideBar/LeftUserBoxModal'
interface UserBoxProps {
  name: string
  userId: string
  image?: string
  isProfile?: boolean
  children?: React.ReactNode
  onClick?: () => void
}
const UserBox: React.FC<UserBoxProps> = ({
  name,
  userId,
  isProfile = false,
  image,
  children,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        `pt-auto
        hover:bg-gray-700 
        transition
        flex 
        items-center 
        justify-between 
        p-2
        mt-auto 
        cursor-pointer`,
        isProfile && 'rounded-full',
      )}
    >
      <div className='flex items-center space-x-4 lg:mr-3'>
        <Avatar image={image} />
        <div className=' hidden lg:block'>
          <div className='text-white font-semibold text-sm'>{name}</div>
          <div className='text-gray-500 font-light text-sm'>
            @{userId && userId?.length > 15 ? `${userId?.slice(0, 14)}...` : userId}
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

export default UserBox
