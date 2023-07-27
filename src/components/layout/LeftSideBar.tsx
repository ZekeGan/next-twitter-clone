import React from 'react'
import UserBox from './UserBox'
import NavList from './NavList'
import getCurrentUser from '@/actions/getCurrentUser'

const LeftSideBar = async () => {
  const currentUser = await getCurrentUser()
  return (
    <div
      className=' 
        flex
        justify-center
        lg:justify-end
        px-5 
        py-3
        h-screen   
        border-r-[1px] 
        border-gray-600'
    >
      <div className='flex justify-end lg:items-center lg:w-80'>
        <div className='flex justify-between flex-col h-full lg:w-52'>
          <NavList currentUser={currentUser!} />
          <UserBox
            userId={currentUser?.userId || 'UserNotFound'}
            isProfile
            name={currentUser?.name! || 'UserNotFound'}
          />
        </div>
      </div>
    </div>
  )
}

export default LeftSideBar
