import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import TError from '@/components/toast/TError'

const useFollowUser = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleFollow = (id: string) => {
    setIsLoading(true)
    axios
      .post('/api/following/follow', { targetUserId: id })
      .then(() => {
        axios.post('/api/following/followNotification', { id: id })
        router.refresh()
      })
      .catch((err) => {
        TError('哪裡發生錯誤了，請再試一次')
        console.error(err)
      })
      .finally(() => setIsLoading(false))
  }

  return {
    handleFollow,
    isLoading,
    setIsLoading,
  }
}

export default useFollowUser
