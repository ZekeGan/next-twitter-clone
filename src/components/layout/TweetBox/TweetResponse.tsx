'use client'
import { useRouter } from 'next/navigation'

import { Tweet, User } from '@prisma/client'
import Avatar from '@/components/Avatar'
import AuthorInfo from './AuthorInfo'

interface TweetResponseProps {
  tweet: Tweet & {
    author: User
  }
}

const TweetResponse: React.FC<TweetResponseProps> = ({ tweet }) => {
  const router = useRouter()
  const handleGoto = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    router.push(`/user/${tweet.author.userId}/status/${tweet.id}`)
  }
  return (
    <div
      onClick={handleGoto}
      className='
        border-[1px] 
        border-gray-600 
        rounded-lg 
        p-2 
        space-y-2 
        hover:bg-gray-500 
        hover:bg-opacity-20
        transition'
    >
      <div className='flex items-center space-x-1'>
        <AuthorInfo author={tweet.author} tweetCreatedAt={tweet.createdAt}>
          <Avatar image={tweet.author.image} sm />
        </AuthorInfo>
      </div>
      <p className=' text-white'>{tweet.content}</p>
    </div>
  )
}

export default TweetResponse
