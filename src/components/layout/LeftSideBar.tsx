import React from 'react'
import NavList from './NavList'
import getCurrentUser from '@/actions/getCurrentUser'
import LeftSideBarBox from './LeftSideBarBox'

const LeftSideBar = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return <div className='text-white'>Error 404</div>

  return (
    <div
      className=' 
        col-start-1
        fixed
        w-[6rem]
        lg:w-[23rem]
        flex
        justify-center
        lg:justify-end
        px-5 
        py-3
        h-screen   
        border-r-[1px] 
        border-gray-600'
    >
      <div className='flex justify-end lg:items-center lg:w-[15rem]'>
        <div className='flex justify-between flex-col h-full lg:w-full'>
          <NavList currentUser={currentUser!} />
          <LeftSideBarBox currentUser={currentUser} />
        </div>
      </div>
    </div>
  )
}

export default LeftSideBar
