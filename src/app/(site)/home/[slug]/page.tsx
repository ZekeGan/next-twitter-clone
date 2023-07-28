import getHomeTweets from '@/actions/getHomeTweets'
import React from 'react'
import TweetBox from '@/components/layout/content/TweetBox'

const Following = async ({ params: { slug } }: { params: { slug: string } }) => {
  const tweets = await getHomeTweets(slug)

  return tweets.map((tweet) => <TweetBox key={tweet.id} data={tweet} />)
}

export default Following
