'use client'
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Avatar from '@/components/Avatar'
import Button from '@/components/input/Button'
import Textarea from '@/components/input/Textarea'
import { Tweet, User } from '@prisma/client'
import useUserSession from '@/hooks/useUserSession'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Loading from '@/components/loading/Loading'

interface CommentInputProps {
  tweet: Tweet & {
    author: User
    comments: Tweet[]
  }
}

const CommentInput: React.FC<CommentInputProps> = ({ tweet }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const currentUser = useUserSession()
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: { comment: '' },
  })

  const onSubmit = (data: FieldValues) => {
    setIsLoading(true)
    axios
      .post('/api/postComment', { ...data, responseFrom: tweet.id })
      .then(() => {
        reset({ comment: '' })
        router.refresh()
      })
      .finally(() => setIsLoading(false))
  }
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
        <form onSubmit={handleSubmit(onSubmit)} className='col-start-2 row-start-2'>
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
