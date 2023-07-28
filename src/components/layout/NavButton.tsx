import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'
import clsx from 'clsx'

interface NavButtonProps {
  href: string
  onClick?: () => void
  icon: IconType
  label: string
  showLabel: boolean
  active: boolean
}

const NavButton: React.FC<NavButtonProps> = ({
  href,
  onClick,
  icon: Icon,
  label,
  showLabel,
  active,
}) => {
  return (
    <Link href={href} onClick={onClick} className='flex space-x-2 '>
      <div className='hover:bg-gray-700 flex item-center space-x-4 p-3 rounded-full transition'>
        <Icon size={30} color='white' />
        {showLabel && (
          <span
            className={clsx(
              `hidden lg:block text-center text-lg text-white`,
              active ? 'font-bold' : 'font-light',
            )}
          >
            {label}
          </span>
        )}
      </div>
    </Link>
  )
}

export default NavButton
