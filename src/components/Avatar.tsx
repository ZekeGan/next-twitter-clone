import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface AvatarProps {
  image?: string | null
  lg?: boolean
  sm?: boolean
  border?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ image, lg, sm, border }) => {
  return (
    <div className='relative'>
      <div
        className={clsx(
          `relative flex items-center rounded-full overflow-hidden h-10 w-10`,
          lg && ' h-32 w-32',
          sm && ' h-5 w-5',
          border && ' border-4  border-twi-900',
        )}
      >
        <Image
          src={image || '/image/placeholder.jpg'}
          alt='avatar'
          fill
          sizes='(min-width: 768px) 2.5rem 2.5rem'
        />
      </div>
    </div>
  )
}

export default Avatar
