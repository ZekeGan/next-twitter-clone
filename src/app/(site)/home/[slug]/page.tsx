import getHomeTweets from '@/actions/getHomeTweets'
import React from 'react'
import TweetBox from '@/components/layout/TweetBox/TweetBox'
import getCurrentUser from '@/actions/getCurrentUser'
import Avatar from '@/components/Avatar'
import TweetResponse from '@/components/layout/TweetBox/TweetResponse'

const Following = async ({ params: { slug } }: { params: { slug: string } }) => {
  const tweets = await getHomeTweets(slug)
  const currentUser = await getCurrentUser()

  if (!tweets || !currentUser) return <div className='text-white'>Error</div>

  return tweets.map((tweet) => (
    <TweetBox key={tweet.id} data={tweet} currentUser={currentUser}>
      {tweet.responseFrom && <TweetResponse tweet={tweet.responseFrom} />}
    </TweetBox>
  ))
}

export default Following
