'use client'
import React, { useState } from 'react'
import Avatar from '@/components/Avatar'
import { FieldValues, useForm } from 'react-hook-form'
import Button from '@/components/input/Button'
import Textarea from '@/components/input/Textarea'
import axios from 'axios'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import Loading from '@/components/loading/Loading'
import { toast } from 'react-toastify'

interface TweetInputProps {
  data: User
}

const TweetInput: React.FC<TweetInputProps> = ({ data }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: { textarea: '' },
  })
  const onSubmit = (data: FieldValues) => {
    setIsLoading(true)
    axios
      .post('/api/postTweet', data)
      .then(() => {
        newPostNotification(data)
        router.refresh()
        reset({ textarea: '' })
      })
      .catch((err) => toast.error(err))
      .finally(() => setIsLoading(false))
  }

  const newPostNotification = (data: FieldValues) => {
    axios
      .post('/api/newPostNotification', data)
      .then(() => {
        router.refresh()
        reset({ textarea: '' })
      })
      .catch((err) => toast.error(err))
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className='flex p-3 border-b-[1px] border-gray-600 overflow-hidden'>
        <div className='mr-2'>
          <Avatar image={data.image} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-2'>
          <Textarea
            register={register}
            id='textarea'
            placeholder='有什麼新鮮事？！'
            isUnderline
          />

          <div className='w-full flex justify-end'>
            <div className='w-20'>
              <Button primary lg type='submit'>
                <span className='text-white text-sm px-2'>推文</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default TweetInput
