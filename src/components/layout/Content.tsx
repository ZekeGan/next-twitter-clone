'use client'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import React from 'react'
import clsx from 'clsx'

interface ContentProps {
  children: React.ReactNode
  subChildren?: React.ReactNode
  pageText: string
  backUrl?: string
  borderUnderline?: boolean
}

const Content: React.FC<ContentProps> = ({
  children,
  subChildren,
  pageText,
  backUrl,
  borderUnderline,
}) => {
  const router = useRouter()

  return (
    <div
      className={clsx(
        `col-start-2 
        grid
        border-r-[1px] 
      border-gray-600 ]
        min-h-screen 
        w-[40rem]`,
        !!subChildren ? 'grid-rows-[7rem_auto]' : 'grid-rows-[4rem_auto]',
      )}
    >
      <div className='w-full row-start-1 '>
        <div
          className={clsx(
            ` 
            fixed 
            flex 
            flex-col 
            justify-between
            bg-twi-900 
            backdrop-blur-sm
            w-[40rem]
            bg-opacity-50 
            border-r-[1px] 
            border-gray-600 
            z-10`,
            borderUnderline && 'border-b-[1px] border-gray-500',
          )}
        >
          <div className='flex items-center mb-3 px-3 py-2 space-x-2'>
            {!!backUrl && (
              <div onClick={() => router.push(backUrl)} className='cursor-pointer'>
                <BiLeftArrowAlt size={30} className='text-white' />
              </div>
            )}
            <h1 className='text-white text-xl font-bold'>{pageText}</h1>
          </div>
          <div>{subChildren}</div>
        </div>
      </div>

      <div className=' row-start-2'>{children}</div>
    </div>
  )
}

export default Content
