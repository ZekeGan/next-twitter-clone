'use client'
import clsx from 'clsx'
import React, { useState } from 'react'
import { IconType } from 'react-icons'

interface ActionBottonProps {
  icon: IconType
  num?: number
  onClick: () => void
}

const ActionButton: React.FC<ActionBottonProps> = ({ icon: Icon, num, onClick }) => {
  const [isMouseOver, setIsMouseOver] = useState(false)
  return (
    <div
      onClick={() => onClick()}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      className='flex space-x-3 items-center cursor-pointer'
    >
      <div
        className={clsx(
          `p-2 rounded-full`,
          isMouseOver && 'bg-sky-800 transition bg-opacity-30',
        )}
      >
        <Icon
          className={clsx(`text-gray-500 transition`, isMouseOver && 'text-sky-500')}
          size={20}
        />
      </div>
      <span className={clsx(`text-gray-500 text-sm`, isMouseOver && 'text-sky-500')}>
        {num}
      </span>
    </div>
  )
}

export default ActionButton
