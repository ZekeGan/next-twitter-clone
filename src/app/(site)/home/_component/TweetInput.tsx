'use client'
import React, { useState } from 'react'
import Avatar from '@/components/Avatar'
import { FieldValues, useForm } from 'react-hook-form'
import Button from '@/components/input/Button'
import clsx from 'clsx'
import Textarea from '@/components/input/Textarea'

const TweetInput = () => {
  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: { textarea: '' },
  })
  const onSubmit = (data: FieldValues) => {
    console.log(data)
  }

  return (
    <div className='flex p-3 border-b-[1px] border-gray-600'>
      <div className='mr-2'>
        <Avatar />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-2'>
        <Textarea register={register} id='textarea' placeholder='有什麼新鮮事？！' />

        <div className='w-full flex justify-end'>
          <div className='w-20'>
            <Button primary lg type='submit'>
              <span className='text-white text-sm px-2'>推文</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default TweetInput
