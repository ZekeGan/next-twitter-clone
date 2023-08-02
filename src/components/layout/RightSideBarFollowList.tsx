'use client'

import { User } from '@prisma/client'
import UserBox from './UserBox'
import Button from '../input/Button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../loading/Loading'

interface RightSideBarFollowListProps {
  users: User[]
}
const RightSideBarFollowList: React.FC<RightSideBarFollowListProps> = ({ users }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleFollow = (id: string) => {
    setIsLoading(true)
    axios
      .post('/api/following/follow', { targetUserId: id })
      .then(() => {
        router.refresh()
      })
      .catch((err) => toast.error(err))
      .finally(() => setIsLoading(false))
  }
  return (
    <>
      <Loading isLoading={isLoading} />
      <div className='py-2 bg-twi-700 rounded-xl min-w-fit sticky top-5'>
        <h1 className='text-white text-lg font-bold px-3'>跟隨誰</h1>
        {users.map((user) => (
          <UserBox
            key={user.userId!}
            name={user.name!}
            userId={user.userId!}
            image={user.image!}
            onClick={() => router.push(`/user/${user.userId}/tweet`)}
          >
            <div className=' ml-10'>
              <Button onClick={() => handleFollow(user.id)}>
                <span className='px-2 text-sm'>跟隨</span>
              </Button>
            </div>
          </UserBox>
        ))}
      </div>
    </>
  )
}

export default RightSideBarFollowList
