'use client'
import { useRouter } from 'next/navigation'

import { User } from '@prisma/client'
import Avatar from '@/components/Avatar'

const FollowBox = ({ data }: { data: User }) => {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(`/user/${data.userId}/tweet`)}
      className='grid grid-cols-[3rem_auto] p-3 hover:bg-gray-600 hover:bg-opacity-30 cursor-pointer trnasition'
    >
      <Avatar image={data.image} />
      <div>
        <div className='text-white'>{data.name}</div>
        <div className='text-gray-600'>@{data.userId}</div>
        {data.profileMessage && <div className='text-white'>{data.profileMessage}</div>}
      </div>
    </div>
  )
}

export default FollowBox
