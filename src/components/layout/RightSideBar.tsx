'use server'
import getAllUsers from '@/actions/getAllUsers'
import Button from '@/components/input/Button'
import UserBox from './UserBox'

const RightSideBar = async () => {
  const users = await getAllUsers()
  return (
    <div className='hidden lg:block p-5'>
      <div className='py-2 bg-twi-700 rounded-xl w-72'>
        <h1 className='text-white text-lg font-bold px-3'>跟隨誰</h1>
        {users.map((user) => (
          <UserBox
            key={user.userId}
            name={user.name || 'UserNotFound'}
            userId={user.userId || 'UserNotFound'}
          >
            <div className=' w-14'>
              <Button>
                <span className='px-2 text-sm'>跟隨</span>
              </Button>
            </div>
          </UserBox>
        ))}
      </div>
    </div>
  )
}

export default RightSideBar
