'use client'
import React from 'react'

import Avatar from '@/components/Avatar'
import Button from '@/components/input/Button'
import Textarea from '@/components/input/Textarea'
import { User } from '@prisma/client'
import Loading from '@/components/loading/Loading'
import usePostNewTweet from '@/hooks/usePostNewTweet'

interface TweetInputProps {
  data: User
}

const TweetInput: React.FC<TweetInputProps> = ({ data }) => {
  const {
    form: { register, formSubmit },
    isLoading,
  } = usePostNewTweet()

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className='flex p-3 border-b-[1px] border-gray-600 overflow-hidden'>
        <div className='mr-2'>
          <Avatar image={data.image} />
        </div>
        <form onSubmit={formSubmit} className='w-full space-y-2'>
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
