'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import Avatar from '@/components/Avatar'
import Button from '@/components/input/Button'
import { IoLocationOutline, IoCalendarOutline, IoLink } from 'react-icons/io5'
import { User } from '@prisma/client'
import { format } from 'date-fns'
import SettingModal from './SettingModal'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '@/components/loading/Loading'
import { useRouter } from 'next/navigation'

interface UserInfoProps {
  data: User & {
    following: User[]
    followBy: User[]
  }
  currentUser: User
  isCurrentUser: boolean
}

const UserInfo: React.FC<UserInfoProps> = ({ data, isCurrentUser, currentUser }) => {
  const router = useRouter()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  console.log(data.followBy)

  const isFollowing = useMemo(
    () => data.followBy.some((user) => user.id === currentUser.id),
    [currentUser, data],
  )

  const handleFollow = () => {
    setIsLoading(true)
    axios
      .post('/api/following/follow', { targetUserId: data.id })
      .then(() => {
        router.refresh()
      })
      .catch((err) => toast.error(err))
      .finally(() => setIsLoading(false))
  }

  const handleUnfollow = () => {
    setIsLoading(true)
    axios
      .put('/api/following/unfollow', { targetUserId: data.id })
      .then(() => {
        router.refresh()
      })
      .catch((err) => toast.error(err))
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <SettingModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        data={data}
      />

      <div>
        <div className='relative'>
          <div className='w-full h-48 bg-gray-500 relative flex items-center justify-center overflow-hidden'>
            {data.profileBackground && (
              <Image
                src={data.profileBackground}
                alt='profileBackground'
                fill
                priority
                style={{ objectFit: 'cover', width: '100%' }}
              />
            )}
          </div>
          <div className='absolute bottom-0 left-7 translate-y-1/2'>
            <Avatar image={data.image} lg border />
          </div>
        </div>
        <div className='flex flex-col py-5 px-4 space-y-3'>
          <div className=' h-12'>
            <div className='flex justify-end'>
              <div className='w-30'>
                {isCurrentUser ? (
                  <Button secondary onClick={() => setIsOpenModal(true)}>
                    <span className='px-2'>編輯個人資料</span>
                  </Button>
                ) : isFollowing ? (
                  <Button secondary onClick={handleUnfollow}>
                    <span className='px-2'>跟隨中</span>
                  </Button>
                ) : (
                  <Button onClick={handleFollow}>
                    <span className='px-2'>跟隨</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className='text-white font-bold text-xl'>{data.name}</div>
            <div className='text-gray-500 text-sm'>@{data.userId}</div>
          </div>

          <div>
            <p className='text-white'>{data.profileMessage}</p>
          </div>

          <div className='flex space-x-4'>
            {data.geolocation && (
              <div className='flex space-x-1'>
                <IoLocationOutline size={20} className='text-gray-500' />
                <span className='text-gray-500 text-sm'>{data.geolocation}</span>
              </div>
            )}

            {data.website && (
              <div className='flex space-x-1'>
                <IoLink size={20} className='text-gray-500' />
                <Link
                  href={data.website}
                  className='text-sky-500 text-sm hover:underline'
                >
                  {data.website}
                </Link>
              </div>
            )}

            <div className='flex space-x-1'>
              <IoCalendarOutline size={20} className='text-gray-500' />
              <span className='text-gray-500 text-sm'>
                {format(new Date(data.createdAt), 'yyyy年MM月dd日')}
              </span>
            </div>
          </div>

          <div className='flex space-x-3'>
            <div className='space-x-1'>
              <span className='text-white font-bold text-sm'>
                {data.following.length}
              </span>
              <span className='text-gray-500 text-sm'>個跟隨中</span>
            </div>
            <div className='space-x-1'>
              <span className='text-white font-bold text-sm'>{data.followBy.length}</span>
              <span className='text-gray-500 text-sm'>位跟隨者</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserInfo
