import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface AvatarProps {
  image?: string | null
  lg?: boolean
  border?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ image, lg, border }) => {
  return (
    <div className='relative'>
      <div
        className={clsx(
          `relative flex items-center rounded-full overflow-hidden `,
          lg ? ' h-32 w-32' : 'h-10 w-10',
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
