import getFollowers from '@/actions/getFollowers'
import getFollowing from '@/actions/getFollowing'
import FollowBox from './_component/FollowBox'

const UserFollowing = async ({
  params: { userId, tabType },
}: {
  params: { userId: string; tabType: string }
}) => {
  try {
    if (tabType === 'followers') {
      const followers = await getFollowers(userId)
      if (!followers) throw new Error('找不到資料')
      return followers.map((follower) => <FollowBox key={follower.id} data={follower} />)
    }

    if (tabType === 'following') {
      const following = await getFollowing(userId)
      if (!following) throw new Error('找不到資料')
      return following.map((following) => (
        <FollowBox key={following.id} data={following} />
      ))
    }

    throw new Error('找不到資料')
  } catch (err: any) {
    console.error(err)
    return <div className='text-white'>頁面顯示錯誤</div>
  }
}

export default UserFollowing
