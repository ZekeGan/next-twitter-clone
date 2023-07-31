'use client'
import clsx from 'clsx'
import React, { useMemo, useState } from 'react'
import { IconType } from 'react-icons'

type ActionButtonType = 'blue' | 'red' | 'green'

interface ActionBottonProps {
  type: ActionButtonType
  icon: IconType
  num?: number
  isCurrentUserActive: boolean
  activeClassName?: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

interface ActiveClassNameProps {
  iconClassName: string
  textClassName: string
  bgClassName: string
}

const ActionButton: React.FC<ActionBottonProps> = ({
  icon: Icon,
  num,
  onClick,
  type,
  isCurrentUserActive,
}) => {
  const [isMouseOver, setIsMouseOver] = useState(false)

  const typeClassName: Record<string, ActiveClassNameProps> = useMemo(
    () => ({
      blue: {
        iconClassName: 'text-sky-500',
        textClassName: 'text-sky-500',
        bgClassName: 'bg-sky-800 bg-opacity-30',
      },
      red: {
        iconClassName: 'text-pink-500',
        textClassName: 'text-pink-500',
        bgClassName: 'bg-pink-800 bg-opacity-30',
      },
      green: {
        iconClassName: 'text-green-500',
        textClassName: 'text-green-500',
        bgClassName: 'bg-green-800 bg-opacity-30',
      },
    }),
    [type],
  )

  return (
    <button
      type='button'
      onClick={onClick}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      className='flex space-x-3 items-center cursor-pointer'
    >
      <div
        className={clsx(
          `p-2 rounded-full transition`,
          isMouseOver && typeClassName[type].bgClassName,
        )}
      >
        <Icon
          className={clsx(
            `text-gray-500 transition `,
            isCurrentUserActive
              ? typeClassName[type].iconClassName
              : isMouseOver && typeClassName[type].iconClassName,
          )}
          size={20}
        />
      </div>
      <span
        className={clsx(
          `text-gray-500 text-sm`,
          isCurrentUserActive
            ? typeClassName[type].textClassName
            : isMouseOver && typeClassName[type].textClassName,
        )}
      >
        {num}
      </span>
    </button>
  )
}

export default ActionButton
