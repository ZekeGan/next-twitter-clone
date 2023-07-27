'use client'
import Avatar from '@/components/Avatar'
import React from 'react'
import { FaRegComment, FaRetweet, FaHeart } from 'react-icons/fa'
import { FiMoreHorizontal } from 'react-icons/fi'
import { LuHeart, LuUpload } from 'react-icons/lu'
import ActionButton from '@/components/layout/ActionButton'

const TweetBox = () => {
  return (
    <div className='px-3 py-2 border-b-[1px] border-gray-600'>
      <article className='flex space-x-3'>
        <Avatar />
        <div className='w-full'>
          <div className='flex justify-between'>
            <div className='space-x-2 mb-1'>
              <span className='font-semibold text-white'>Zeke</span>
              <span className=' text-gray-500'>
                <span>@Zeke_Gan</span>
                <i className='text-gray-500'>. 2小時</i>
              </span>
            </div>
            <ActionButton icon={FiMoreHorizontal} onClick={() => {}} />
          </div>

          <p className='text-white mb-3'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </p>
          <div className='flex justify-between'>
            <ActionButton icon={FaRegComment} num={20} onClick={() => {}} />
            <ActionButton icon={FaRetweet} num={20} onClick={() => {}} />
            <ActionButton icon={LuHeart} num={20} onClick={() => {}} />
            <ActionButton icon={LuUpload} onClick={() => {}} />
          </div>
        </div>
      </article>
    </div>
  )
}

export default TweetBox
