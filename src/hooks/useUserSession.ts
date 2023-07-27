'use client'
import { useSession } from 'next-auth/react'

const useUserSession = () => {
  const session = useSession()
  console.log(session)

  return session?.status === 'authenticated' ? session.data.user : null
}

export default useUserSession
