'use client'
import React from 'react'
import Link from 'next/link'

import { Tweet, User } from '@prisma/client'
import useUserSession from '@/hooks/useUserSession'
import Avatar from '@/components/Avatar'
import Button from '@/components/input/Button'
import Textarea from '@/components/input/Textarea'
import Loading from '@/components/loading/Loading'
import usePostComment from '@/hooks/usePostComment'

interface CommentInputProps {
  tweet: Tweet & {
    author: User
    comments: Tweet[]
  }
}

const CommentInput: React.FC<CommentInputProps> = ({ tweet }) => {
  const {
    form: { register, formSubmit },
    isLoading,
  } = usePostComment(tweet)

  const currentUser = useUserSession()

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className='grid grid-rows-[1.5rem_auto] grid-cols-[10%_auto] min-h-[7rem]'>
        <div className='row-start-2'>
          <Avatar image={currentUser?.image} />
        </div>
        <div className='col-start-2 space-x-2'>
          <span className='text-gray-600 text-sm pt-1'>回覆給</span>
          <Link href={`/user/${tweet?.author.name}`} className='text-sky-600 text-sm'>
            @{tweet?.author.userId}
          </Link>
        </div>
        <form onSubmit={formSubmit} className='col-start-2 row-start-2'>
          <Textarea register={register} id={'comment'} placeholder='推你的回覆!' />
          <div className='flex justify-end'>
            <div className='w-20'>
              <Button primary type='submit' md>
                回覆
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default CommentInput
