'use client'
import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { IoLocationOutline, IoCalendarOutline, IoLink } from 'react-icons/io5'
import { format } from 'date-fns'
import axios from 'axios'

import { User } from '@prisma/client'
import SettingModal from './SettingModal'
import useFollowUser from '@/hooks/useFollowUser'
import Avatar from '@/components/Avatar'
import Button from '@/components/input/Button'
import Loading from '@/components/loading/Loading'
import TError from '@/components/toast/TError'
import TSuccess from '@/components/toast/TSuccess'

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
  const { handleFollow, setIsLoading, isLoading } = useFollowUser()

  const isFollowing = useMemo(
    () => data.followBy.some((user) => user.id === currentUser.id),
    [currentUser, data],
  )

  const handleUnfollow = () => {
    setIsLoading(true)
    axios
      .put('/api/following/unfollow', { targetUserId: data.id })
      .then(() => {
        TSuccess(`已退 ${data.name} 追蹤`)
        router.refresh()
      })
      .catch((err) => {
        TError('哪裡發生錯誤了，請再試一次')
        console.error(err)
      })
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
                  <Button onClick={() => handleFollow(data.id)}>
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
                <a href={data.website} className='text-sky-500 text-sm hover:underline'>
                  {data.website}
                </a>
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
            <a
              href={`/user/${data.userId}/follow/following`}
              className='space-x-1 border-b-[1px] border-transparent hover:border-gray-400'
            >
              <span className='text-white font-bold text-sm'>
                {data.following.length}
              </span>
              <span className='text-gray-500 text-sm'>個跟隨中</span>
            </a>
            <a
              href={`/user/${data.userId}/follow/followers`}
              className='space-x-1 border-b-[1px] border-transparent hover:border-gray-400'
            >
              <span className='text-white font-bold text-sm'>{data.followBy.length}</span>
              <span className='text-gray-500 text-sm'>位跟隨者</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserInfo
