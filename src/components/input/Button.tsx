'use client'

import clsx from 'clsx'
import React from 'react'

interface ButtonProps {
  type?: 'button' | 'submit'
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void
  children: React.ReactNode
  secondary?: boolean
  disabled?: boolean
  primary?: boolean
  warning?: boolean
  lg?: boolean
  md?: boolean
}

const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  children,
  secondary,
  disabled,
  primary,
  warning,
  lg,
  md,
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
        hover:bg-gray-300
        p-1`,
        lg && 'p-3',
        md && 'px-2 py-1',
        primary && ' bg-sky-600 hover:bg-sky-700 text-white',
        secondary &&
          'bg-transparent ring-1 ring-gray-400 text-gray-200 hover:bg-gray-700',
        warning && 'bg-red-600 hover:bg-red-700 text-white',
      )}
    >
      {children}
    </button>
  )
}

export default Button
