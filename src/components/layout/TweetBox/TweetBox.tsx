'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { FaRegComment, FaRetweet } from 'react-icons/fa'
import { LuHeart } from 'react-icons/lu'

import { Tweet, User } from '@prisma/client'
import AuthorInfo from './AuthorInfo'
import ActionButton from '@/components/layout/TweetBox/ActionButton'
import Avatar from '@/components/Avatar'
import Loading from '@/components/loading/Loading'
import TError from '@/components/toast/TError'

interface TweetBoxProps {
  data: Tweet & {
    author: User
    comments: Tweet[]
    retweetFrom: User[]
    likeFrom: User[]
  }
  currentUser: User
  children?: React.ReactNode
}

const TweetBox: React.FC<TweetBoxProps> = ({ data, currentUser, children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const isUserActiveSocialButton: Record<string, boolean> = {
    comment: data.comments.some((comment) => comment.authorId === currentUser.id),
    retweet: data.retweetFrom.some((retweet) => retweet.id === currentUser.id),
    like: data.likeFrom.some((user) => user.id === currentUser.id),
  }

  const handleButton = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.stopPropagation()
    setIsLoading(true)
    axios
      .post(href, { tweetId: data.id })
      .then(() => {
        router.refresh()
      })
      .catch((err) => TError(err))
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <div
        onClick={() => router.push(`/user/${data.author.userId}/status/${data.id}`)}
        className='
        px-3 
        py-2 
        border-b-[1px] 
        border-gray-600 
        hover:bg-white 
        hover:bg-opacity-5 
        transition 
        cursor-pointer'
      >
        <article className='flex space-x-3'>
          <Link
            href={`/user/${data.author.userId}/tweet`}
            onClick={(e) => e.stopPropagation()}
          >
            <Avatar image={data?.author?.image} />
          </Link>
          <div className='w-full'>
            <AuthorInfo author={data.author} tweetCreatedAt={data.createdAt} />
            <p className='text-white mb-2'>{data.content}</p>

            {children}

            <div className='flex justify-between mt-2'>
              <ActionButton
                type='blue'
                icon={FaRegComment}
                num={data.comments.length}
                onClick={() => {}}
                isCurrentUserActive={isUserActiveSocialButton.comment}
              />
              <ActionButton
                type='green'
                icon={FaRetweet}
                num={data.retweetFrom.length}
                onClick={(e) => handleButton(e, '/api/retweetTweet')}
                isCurrentUserActive={isUserActiveSocialButton.retweet}
              />
              <ActionButton
                type='red'
                icon={LuHeart}
                num={data.likeFromIds.length}
                onClick={(e) => handleButton(e, '/api/likeTweet')}
                isCurrentUserActive={isUserActiveSocialButton.like}
              />
              <div />
            </div>
          </div>
        </article>
      </div>
    </>
  )
}

export default TweetBox
