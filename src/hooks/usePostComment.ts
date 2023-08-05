import TError from '@/components/toast/TError'
import { Tweet } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

const usePostComment = (tweet: Tweet, callback?: () => void) => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: { comment: '' },
  })

  const onSubmit = (data: FieldValues) => {
    setIsLoading(true)
    axios
      .post('/api/postComment', { ...data, responseFrom: tweet.id })
      .then(() => {
        if (callback) callback()
        reset({ comment: '' })
        router.refresh()
      })
      .catch((err) => {
        TError('哪裡發生錯誤，請再試一次')
        console.error(err)
      })
      .finally(() => setIsLoading(false))
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

export default usePostComment
