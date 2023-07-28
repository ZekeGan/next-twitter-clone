import React from 'react'
import UserInfo from '../_component/UserInfo'
import UserTabs from '../_component/UserTabs'
import getCurrentUser from '@/actions/getCurrentUser'
import Content from '@/components/layout/content/Content'

const User = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser()
  return (
    <Content pageText='個人資料' isBack>
      <UserInfo />
      <UserTabs userId={currentUser?.userId || ''} />
      {children}
    </Content>
  )
}

export default User
