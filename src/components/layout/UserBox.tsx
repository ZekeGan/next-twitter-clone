import Avatar from '@/components/Avatar'
import clsx from 'clsx'
import React from 'react'
interface UserBoxProps {
  name: string | null
  userId: string | null
  image?: string | null
  isProfile?: boolean
  children?: React.ReactNode
}
const UserBox: React.FC<UserBoxProps> = ({
  name,
  userId,
  isProfile = false,
  image,
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
        p-2
        mt-auto`,
        isProfile && 'rounded-full',
      )}
    >
      <div className='flex items-center space-x-4 lg:mr-3'>
        <Avatar image={image} />
        <div className=' hidden lg:block'>
          <div className='text-white font-semibold text-sm'>{name}</div>
          <div className='text-gray-500 font-light text-sm'>
            @{userId && userId?.length > 10 ? `${userId?.slice(0, 9)}...` : userId}
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

export default UserBox
