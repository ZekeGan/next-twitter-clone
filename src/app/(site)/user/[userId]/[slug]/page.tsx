import getCurrentUser from '@/actions/getCurrentUser'
import { getUserAllTweets } from '@/actions/getUserAllTweets'
import { getUserRepliedTweets } from '@/actions/getUserRepliedTweets'
import TweetBox from '@/components/layout/TweetBox/TweetBox'
import UserInfo from './_component/UserInfo'
import UserTabs from './_component/UserTabs'
import getAnotherUser from '@/actions/getAnotherUser'
import { User } from '@prisma/client'
import Content from '@/components/layout/Content'
import { getUserLikeTweets } from '@/actions/getUserLikeTweets'
import TweetResponse from '@/components/layout/TweetBox/TweetResponse'

const UserContent = async ({
  params: { userId, slug },
}: {
  params: { userId: string; slug: string }
}) => {
  try {
    const currentUser = await getCurrentUser()
    const anotherUser = await getAnotherUser(userId)
    if (!currentUser || !anotherUser) throw new Error('找不到使用者')

    return (
      <Content pageText='個人資料' backUrl={'/home/recommend'}>
        <UserInfo
          data={anotherUser!}
          currentUser={currentUser}
          isCurrentUser={currentUser.id === anotherUser.id}
        />
        <UserTabs userId={anotherUser.userId} />
        <Tweets slug={slug} user={anotherUser} />
      </Content>
    )
  } catch (err: any) {
    return (
      <div className='text-white'>
        <div>找不到使用者</div>
        <div>{err}</div>
      </div>
    )
  }
}

const Tweets = async ({ slug, user }: { slug: string; user: User }) => {
  if (slug === 'tweet') {
    const tweets = await getUserAllTweets(user.id)
    return tweets.map((tweet) => (
      <TweetBox key={tweet.id} data={tweet} currentUser={user} />
    ))
  }

  if (slug === 'replies') {
    const tweets = await getUserRepliedTweets(user.id)
    return tweets.map((tweet) => (
      <TweetBox key={tweet.id} data={tweet} currentUser={user}>
        {tweet.responseFrom && <TweetResponse tweet={tweet.responseFrom} />}
      </TweetBox>
    ))
  }

  if (slug === 'likes') {
    const tweets = await getUserLikeTweets(user.id)
    return tweets.map((tweet) => (
      <TweetBox key={tweet.id} data={tweet} currentUser={user} />
    ))
  }
}

export default UserContent
