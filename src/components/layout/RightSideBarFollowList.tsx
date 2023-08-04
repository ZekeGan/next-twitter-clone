'use client'

import { User } from '@prisma/client'
import UserBox from './UserBox'
import Button from '../input/Button'
import { useRouter } from 'next/navigation'
import Loading from '../loading/Loading'
import useFollowUser from '@/hooks/useFollowUser'

interface RightSideBarFollowListProps {
  users: User[]
}
const RightSideBarFollowList: React.FC<RightSideBarFollowListProps> = ({ users }) => {
  const router = useRouter()
  const { isLoading, handleFollow } = useFollowUser()

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
