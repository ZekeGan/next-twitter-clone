import { redirect } from 'next/navigation'

import getCurrentUser from '@/actions/getCurrentUser'
import Content from '@/components/layout/Content'
import FollowerTabs from './_component/FollowerTabs'

const layout = async ({
  children,
  params: { userId },
}: {
  children: React.ReactNode
  params: { userId: string }
}) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) redirect('/auth')

  return (
    <Content backUrl='/home/recommend' pageText={currentUser.name!}>
      <FollowerTabs userId={userId} />
      {children}
    </Content>
  )
}

export default layout
