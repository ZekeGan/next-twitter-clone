import React from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi'
import GoBack from './GoBack'

interface ContentProps {
  children: React.ReactNode
  pageText: string
  isBack?: boolean
}

const Content: React.FC<ContentProps> = ({ children, pageText, isBack = false }) => {
  return (
    <div className=' border-r-[1px] border-gray-600 w-[40rem]'>
      <div className=' flex items-center mb-3 px-3 py-2 space-x-2'>
        {isBack && (
          <GoBack href='/home/recomment'>
            <BiLeftArrowAlt size={30} className='text-white' />
          </GoBack>
        )}
        <h1 className='text-white text-xl font-bold'>{pageText}</h1>
      </div>

      {children}
    </div>
  )
}

export default Content
