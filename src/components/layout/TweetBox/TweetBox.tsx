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
import TweetCommentModal from './TweetCommentModal'

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
  const [isOpenModal, setIsOpenModal] = useState(false)
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
      <TweetCommentModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        data={data}
        user={data.author}
        currentUser={currentUser}
      />
      <Loading isLoading={isLoading} />
      <div
        onClick={() => router.push(`/user/${data.author.userId}/status/${data.id}`)}
        className='
        grid 
        grid-cols-[3rem_auto]
        p-3
        w-[40rem]
        border-b-[1px] 
        border-gray-600 
        hover:bg-white 
        hover:bg-opacity-5 
        transition 
        cursor-pointer'
      >
        <Link
          href={`/user/${data.author.userId}/tweet`}
          onClick={(e) => e.stopPropagation()}
        >
          <Avatar image={data?.author?.image} />
        </Link>
        <article>
          <div className='flex flex-col'>
            <AuthorInfo author={data.author} tweetCreatedAt={data.createdAt} isUserId />
            <p className='text-white mb-2 overflow-hidden'>{data.content}</p>

            {children}

            <div className='flex justify-between mt-2'>
              <ActionButton
                type='blue'
                icon={FaRegComment}
                num={data.comments.length}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsOpenModal(true)
                }}
                isCurrentUserActive={isUserActiveSocialButton.comment}
              />
              <div />
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
