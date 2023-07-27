import React from 'react'
import LeftSideBar from '@/components/layout/LeftSideBar'
import RightSideBar from '@/components/layout/RightSideBar'
import Content from '@/components/layout/content/Content'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex'>
      <LeftSideBar />
      <Content pageText='個人資料' isBack>
        {children}
      </Content>
      <RightSideBar />
    </div>
  )
}

export default layout
