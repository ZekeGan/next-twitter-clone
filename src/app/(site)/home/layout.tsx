import React from 'react'

import LeftSideBar from '@/components/layout/LeftSideBar/LeftSideBar'
import RightSideBar from '@/components/layout/RightSideBar'
import Content from '@/components/layout/Content'
import getCurrentUser from '@/actions/getCurrentUser'
import TweetInput from './_component/TweetInput'
import HomeTabs from './_component/HomeTabs'

const layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return <div className='text-white'>找不到使用者</div>

  return (
    <>
      <div className='grid grid-cols-[6rem_40rem_auto] lg:grid-cols-[23rem_40rem_auto]'>
        <LeftSideBar />
        <Content pageText='主頁' subChildren={<HomeTabs />}>
          <TweetInput data={currentUser} />
          {children}
        </Content>
        <RightSideBar />
      </div>
    </>
  )
}

export default layout
