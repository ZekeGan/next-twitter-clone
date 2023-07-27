'use client'

import clsx from 'clsx'
import React from 'react'

interface ButtonProps {
  type?: 'button' | 'submit'
  onClick?: () => void
  children: React.ReactNode
  secondary?: boolean
  disabled?: boolean
  primary?: boolean
  lg?: boolean
}

const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  children,
  secondary,
  disabled,
  primary,
  lg,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `lg:w-full 
        flex 
        justify-center 
        items-center  
        rounded-full 
        font-bold  
        transition 
        bg-gray-200 
        hover:bg-gray-300`,
        primary && ' bg-sky-600 hover:bg-sky-700',
        lg ? 'p-2' : 'p-1',
        secondary &&
          'bg-transparent ring-1 ring-gray-400 text-gray-200 hover:bg-gray-700',
      )}
    >
      {children}
    </button>
  )
}

export default Button
