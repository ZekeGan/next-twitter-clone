import getNotFollowUsers from '@/actions/getNotFollowUsers'
import RightSideBarFollowList from './RightSideBarFollowList'

const RightSideBar = async () => {
  const users = await getNotFollowUsers()

  return (
    <div className='hidden lg:block p-5 col-start-3'>
      <RightSideBarFollowList users={users} />
    </div>
  )
}

export default RightSideBar
