import React from 'react'
import LeftSideBar from '@/components/layout/LeftSideBar'
import RightSideBar from '@/components/layout/RightSideBar'
import Content from '@/components/layout/Content'
import TweetInput from './_component/TweetInput'
import HomeTabs from './_component/HomeTabs'
import Modal from '@/components/modal/Modal'

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='flex'>
        <LeftSideBar />
        <Content pageText='主頁'>
          <HomeTabs />
          <TweetInput />
          {children}
        </Content>
        <RightSideBar />
      </div>
    </>
  )
}

export default layout
