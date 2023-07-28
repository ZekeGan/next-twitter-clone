import React from 'react'
import Content from '@/components/layout/content/Content'
import getSingleTweet from '@/actions/getSingleTweet'
import TweetBox from '@/components/layout/content/TweetBox'
import Avatar from '@/components/Avatar'
import CommentInput from './_component/CommentInput'

const TweetPage = async ({ params }: { params: { userId: string; tweetId: string } }) => {
  const tweet = await getSingleTweet(params.tweetId)

  if (!tweet) {
    return (
      <Content pageText='推文' isBack>
        <div className='text-white'>未找到推文</div>
      </Content>
    )
  }

  return (
    <Content pageText='推文' isBack>
      <div className='p-3 border-b-[1px] border-gray-500'>
        <div className='flex'>
          <Avatar image={tweet.author.image} />
          <div>
            <div className='text-white'>{tweet.author.name}</div>
            <div className='text-gray-500'>@{tweet.author.userId}</div>
          </div>
        </div>
        <p className='text-white'>{tweet.content}</p>
        <div className='text-gray-500 border-b-[1px] border-gray-500'>
          下午12:10 · 2023年7月25日·79.1萬次查看
        </div>
        <div className='flex border-b-[1px] border-gray-500'>
          <div>
            <span className='text-white'>198</span>
            <span className='text-gray-500'>則轉推</span>
          </div>
          <div>
            <span className='text-white'>20</span>
            <span className='text-gray-500'>引用</span>
          </div>
          <div>
            <span className='text-white'>5565</span>
            <span className='text-gray-500'>個喜歡</span>
          </div>
        </div>
        <CommentInput tweet={tweet} />
      </div>
      {tweet.comments.map((comment) => (
        <TweetBox key={comment.id} data={comment} />
      ))}
    </Content>
  )
}

export default TweetPage
