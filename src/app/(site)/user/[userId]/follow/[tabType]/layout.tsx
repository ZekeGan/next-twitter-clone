import { redirect } from 'next/navigation'

import getCurrentUser from '@/actions/getCurrentUser'
import Content from '@/components/layout/Content'
import FollowerTabs from './_component/FollowerTabs'
import getAnotherUser from '@/actions/getAnotherUser'

const layout = async ({
  children,
  params: { userId },
}: {
  children: React.ReactNode
  params: { userId: string }
}) => {
  const singleUser = await getAnotherUser(userId)
  if (!singleUser) return <div className='text-white'>未找到使用者資料</div>

  return (
    <Content backUrl='/home/recommend' pageText={singleUser.name!}>
      <FollowerTabs userId={userId} />
      {children}
    </Content>
  )
}

export default layout
