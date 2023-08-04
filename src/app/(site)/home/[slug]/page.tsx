import React from 'react'

import TweetBox from '@/components/layout/TweetBox/TweetBox'
import getCurrentUser from '@/actions/getCurrentUser'
import TweetResponse from '@/components/layout/TweetBox/TweetResponse'
import getHomeFollowingTweets from '@/actions/getHomeFollowingTweets'
import getHomeRecommendTweets from '@/actions/getHomeRecommendTweets'

const Following = async ({ params: { slug } }: { params: { slug: string } }) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return <div className='text-white'>使用者不存在</div>

  if (slug === 'following') {
    const followingTweets = await getHomeFollowingTweets()
    return followingTweets.map((tweet) => (
      <TweetBox key={tweet.id} data={tweet} currentUser={currentUser}>
        {tweet.responseFrom && <TweetResponse tweet={tweet.responseFrom} />}
      </TweetBox>
    ))
  }

  if (slug === 'recommend') {
    const recommendTweets = await getHomeRecommendTweets()
    return recommendTweets.map((tweet) => (
      <TweetBox key={tweet.id} data={tweet} currentUser={currentUser}>
        {tweet.responseFrom && <TweetResponse tweet={tweet.responseFrom} />}
      </TweetBox>
    ))
  }

  return null
}

export default Following
