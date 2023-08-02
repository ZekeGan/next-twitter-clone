import React from 'react'
import LeftSideBar from '@/components/layout/LeftSideBar'
import RightSideBar from '@/components/layout/RightSideBar'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid grid-cols-[6rem_40rem_auto] lg:grid-cols-[23rem_40rem_auto]'>
      <LeftSideBar />
      {children}
      <RightSideBar />
    </div>
  )
}

export default layout
