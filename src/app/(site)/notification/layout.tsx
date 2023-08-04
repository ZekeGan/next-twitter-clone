import React from 'react'
import LeftSideBar from '@/components/layout/LeftSideBar/LeftSideBar'
import RightSideBar from '@/components/layout/RightSideBar'
import Content from '@/components/layout/Content'

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid grid-cols-[6rem_40rem_auto] lg:grid-cols-[23rem_40rem_auto]'>
      <LeftSideBar />
      <Content pageText='通知' backUrl='/home/recommend'>
        <div className='border-b-[1px] border-gray-500' />
        {children}
      </Content>
      <RightSideBar />
    </div>
  )
}

export default layout
