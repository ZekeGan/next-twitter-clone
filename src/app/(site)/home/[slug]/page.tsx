import getHomeTweets from '@/actions/getHomeTweets'
import React from 'react'
import TweetBox from '../../../../components/layout/content/TweetBox'

const Following = async ({ params: { slug } }: { params: { slug: string } }) => {
  const res = await getHomeTweets(slug)
  return (
    <div>
      <TweetBox />
    </div>
  )
}

export default Following
