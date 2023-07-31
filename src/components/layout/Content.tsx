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
}

const Content: React.FC<ContentProps> = ({ children,subChildren, pageText, backUrl }) => {
  const router = useRouter()

  return (
    <div 
      className={clsx(`
        grid 
        grid-rows-[3rem_auto]
        border-r-[1px] 
        border-gray-600 
        w-[40rem] 
        ml-24 
        lg:ml-80 
        min-h-screen`,
        !!subChildren ? 'grid-rows-[5rem_auto]' : 'grid-rows-[3rem_auto]' 
      )}
    >
      <div className=' row-start-1 fixed min-h-[3rem] flex flex-col bg-twi-900 backdrop-blur-sm bg-opacity-50 w-[40rem]'>
       <div className='flex items-center mb-3 px-3 py-2 space-x-2'>
        {!!backUrl && (
          <div onClick={() => router.push(backUrl)} className='cursor-pointer'>
            <BiLeftArrowAlt size={30} className='text-white' />
          </div>
        )}
        <h1 className='text-white text-xl font-bold'>{pageText}</h1>
        </div> 
        {subChildren}
      </div>

      <div className=' row-start-2'>
        {children}
      </div>

    </div>
  )
}

export default Content
