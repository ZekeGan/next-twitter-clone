import Image from 'next/image'
import React from 'react'

const Avatar = () => {
  return (
    <div className='relative'>
      <div className='relative flex items-center h-10 w-10 rounded-full overflow-hidden'>
        <Image
          src={'/image/placeholder.jpg'}
          alt='avatar'
          fill
          sizes='(min-width: 768px) 2.5rem 2.5rem'
        />
      </div>
    </div>
  )
}

export default Avatar
