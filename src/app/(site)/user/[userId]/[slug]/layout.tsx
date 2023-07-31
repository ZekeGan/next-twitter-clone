import SettingModal from './_component/SettingModal'
import UserInfo from './_component/UserInfo'
import UserTabs from './_component/UserTabs'
import getCurrentUser from '@/actions/getCurrentUser'
import Content from '@/components/layout/Content'

const User = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return <div className='text-white'>找不到使用者</div>

  return (
    <Content pageText='個人資料' backUrl={'/home/recommend'}>
      <UserInfo data={currentUser!} />
      <UserTabs userId={currentUser.userId} />
      {children}
    </Content>
  )
}

export default User
