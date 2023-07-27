import Button from '@/components/input/Button'
import React from 'react'
import { IconType } from 'react-icons'

interface SocialAuthButtonProps {
  icon: IconType
  text: string
  onClick: () => void
}

const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  icon: Icon,
  text,
  onClick,
}) => {
  return (
    <Button onClick={onClick} lg>
      <div className='flex'>
        <Icon size={20} />
        <span className=' hidden ml-3 sm:block'>{text}</span>
      </div>
    </Button>
  )
}

export default SocialAuthButton
