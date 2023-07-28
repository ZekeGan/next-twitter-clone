import React from 'react'
import Image from 'next/image'
import Avatar from '@/components/Avatar'
import Button from '@/components/input/Button'
import { IoLocationOutline, IoCalendarOutline } from 'react-icons/io5'

const UserInfo = () => {
  return (
    <div>
      <div className='relative'>
        <div className='w-full h-48 bg-sky-500 relative flex items-center justify-center overflow-hidden'>
          <Image
            src={'/image/profileBackground.jpg'}
            alt='profileBackground'
            fill
            priority
            style={{ objectFit: 'cover', width: '100%' }}
          />
        </div>
        <div className='absolute bottom-0 left-7 translate-y-1/2'>
          <Avatar image={''} lg border />
        </div>
      </div>
      <div className='flex flex-col py-5 px-4 space-y-3'>
        <div className=' h-16'>
          <div className='flex justify-end'>
            <div className='w-30'>
              <Button secondary>
                <span className='px-2'>編輯個人資料</span>
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className='text-white font-bold text-xl'>Zeke</div>
          <div className='text-gray-500 text-sm'>@Zeke_gan</div>
        </div>

        <div>
          <p className='text-white'>I am Junior Frontend Engineer</p>
        </div>

        <div className='flex space-x-3'>
          <div className='flex space-x-1'>
            <IoLocationOutline size={20} className='text-gray-500' />
            <span className='text-gray-500 text-sm'>Taiwan</span>
          </div>
          <div className='flex space-x-1'>
            <IoCalendarOutline size={20} className='text-gray-500' />
            <span className='text-gray-500 text-sm'>2022/10/10</span>
          </div>
        </div>

        <div className='flex space-x-3'>
          <div className='space-x-1'>
            <span className='text-white font-bold text-sm'>15</span>
            <span className='text-gray-500 text-sm'>個跟隨中</span>
          </div>
          <div className='space-x-1'>
            <span className='text-white font-bold text-sm'>15</span>
            <span className='text-gray-500 text-sm'>位跟隨者</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
