'use client'

import { useRouter } from 'next/navigation'

interface GoBackProps {
  children: React.ReactNode
  href: string
}

const GoBack: React.FC<GoBackProps> = ({ children, href }) => {
  const router = useRouter()
  return <div onClick={() => router.back()} className='cursor-pointer'>{children}</div>
}

export default GoBack
