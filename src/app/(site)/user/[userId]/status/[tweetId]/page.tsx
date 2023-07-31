import { format } from 'date-fns'

import Content from '@/components/layout/Content'
import getSingleTweet from '@/actions/getSingleTweet'
import TweetBox from '@/components/layout/TweetBox/TweetBox'
import Avatar from '@/components/Avatar'
import getCurrentUser from '@/actions/getCurrentUser'
import CommentInput from './_component/CommentInput'

const TweetPage = async ({ params }: { params: { userId: string; tweetId: string } }) => {
  const tweet = await getSingleTweet(params.tweetId)
  const currentUser = await getCurrentUser()

  if (!tweet || !currentUser) {
    return (
      <Content pageText='推文' backUrl='/home/recommend'>
        <div className='text-white'>未找到推文</div>
      </Content>
    )
  }

  return (
    <Content pageText='推文' backUrl={'/home/recommend'}>
      <div className='p-3 border-b-[1px] border-gray-500'>
        <div className='flex space-x-3 pb-3'>
          <Avatar image={tweet.author.image} />
          <div>
            <div className='text-white font-bold'>{tweet.author.name}</div>
            <div className='text-gray-500 text-sm'>@{tweet.author.userId}</div>
          </div>
        </div>

        <p className='text-white'>{tweet.content}</p>

        <div className='text-gray-500 border-b-[1px] border-gray-500 text-sm py-3'>
          {format(new Date(tweet.createdAt), 'ahh:mm．yyyy年M月d日')
            .replace('PM', '下午')
            .replace('AM', '上午')}
        </div>

        <div className='flex border-b-[1px] border-gray-500 space-x-4 py-3'>
          <div className='space-x-1'>
            <span className='text-white text-sm'>{tweet.retweetFrom.length}</span>
            <span className='text-gray-500 text-sm'>則轉推</span>
          </div>
          <div className='space-x-1'>
            <span className='text-white text-sm'>{tweet.likeFrom.length}</span>
            <span className='text-gray-500 text-sm'>個喜歡</span>
          </div>
        </div>

        <CommentInput tweet={tweet} />
      </div>
      {tweet.comments.map((comment) => (
        <TweetBox key={comment.id} data={comment} currentUser={currentUser} />
      ))}
    </Content>
  )
}

export default TweetPage
