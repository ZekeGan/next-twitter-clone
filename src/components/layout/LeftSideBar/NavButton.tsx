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
  informNum?: number
}

const NavButton: React.FC<NavButtonProps> = ({
  href,
  onClick,
  icon: Icon,
  label,
  showLabel,
  active,
  informNum,
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className='flex space-x-2 justify-center lg:justify-start '
    >
      <div className='hover:bg-gray-700 flex item-center space-x-4 p-3 rounded-full transition'>
        <div className='relative'>
          <Icon size={30} color='white' />
          {!!informNum && (
            <div
              className='
                w-4 
                h-4 
                flex 
                justify-center 
                items-center 
                text-xs 
                text-white 
                font-semibold 
                bg-sky-500 
                rounded-full 
                absolute 
                right-0 
                top-0'
            >
              {informNum}
            </div>
          )}
        </div>
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
