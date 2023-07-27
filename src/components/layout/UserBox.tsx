import Avatar from '@/components/Avatar'
import Button from '@/components/input/Button'
import clsx from 'clsx'
import React from 'react'
interface UserBoxProps {
  name: string
  userId: string
  isProfile?: boolean
  children?: React.ReactNode
}
const UserBox: React.FC<UserBoxProps> = ({
  name,
  userId,
  isProfile = false,
  children,
}) => {
  return (
    <div
      className={clsx(
        `pt-auto
        hover:bg-gray-700 
        flex 
        items-center 
        justify-between 
        p-3 
        mt-auto`,
        isProfile && 'rounded-full',
      )}
    >
      <div className='flex items-center space-x-4 '>
        <Avatar />
        <div className=' hidden lg:block'>
          <div className='text-white font-semibold text-sm'>{name}</div>
          <div className='text-gray-500 font-light text-sm'>
            @{userId.length > 10 ? `${userId.slice(0, 9)}...` : userId}
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}

export default UserBox
