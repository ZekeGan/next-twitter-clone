import React from 'react'
import LeftSideBar from '@/components/layout/LeftSideBar'
import RightSideBar from '@/components/layout/RightSideBar'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex'>
      <LeftSideBar />
      {children}
      <RightSideBar />
    </div>
  )
}

export default layout
