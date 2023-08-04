import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FieldValues, useForm } from 'react-hook-form'
import axios from 'axios'

import { Tweet } from '@prisma/client'
import TError from '@/components/toast/TError'

const usePostNewTweet = (callback?: () => void) => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: { textarea: '' },
  })

  const onSubmit = (data: FieldValues) => {
    setIsLoading(true)
    axios
      .post('/api/postTweet', data)
      .then((tweet) => {
        console.log(tweet)
        newPostNotification(tweet.data)
        router.refresh()
        reset({ textarea: '' })
        if (callback) callback()
      })
      .catch((err) => TError(err))
      .finally(() => setIsLoading(false))
  }

  const newPostNotification = (tweet: Tweet) => {
    axios
      .post('/api/newPostNotification', { tweetId: tweet.id })
      .then(() => {
        router.refresh()
        reset({ textarea: '' })
      })
      .catch((err) => TError(err))
  }

  const formSubmit = handleSubmit(onSubmit)

  return {
    form: {
      register,
      formSubmit,
    },
    isLoading,
    setIsLoading,
  }
}

export default usePostNewTweet
