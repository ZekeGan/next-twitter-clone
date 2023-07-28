import React from 'react'
import LeftSideBar from '@/components/layout/LeftSideBar'
import RightSideBar from '@/components/layout/RightSideBar'
import Content from '@/components/layout/content/Content'

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex'>
      <LeftSideBar />
      <Content pageText='通知'>
        {children}
      </Content>
      <RightSideBar />
    </div>
  )
}

export default layout