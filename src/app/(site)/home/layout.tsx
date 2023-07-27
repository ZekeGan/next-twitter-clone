import React from 'react'
import LeftSideBar from '@/components/layout/LeftSideBar'
import RightSideBar from '@/components/layout/RightSideBar'
import Content from '@/components/layout/content/Content'
import TweetInput from './_component/TweetInput'
import Tabs from './_component/Tabs'

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex'>
      <LeftSideBar />
      <Content pageText='主頁'>
        <Tabs />
        <TweetInput />
        {children}
      </Content>
      <RightSideBar />
    </div>
  )
}

export default layout
