'use client'
import React, { useState } from 'react'
import NavButton from './NavButton'
import Button from '@/components/input/Button'
import { RiQuillPenFill } from 'react-icons/ri'
import { Notification, Tweet, User } from '@prisma/client'
import useLeftSideBarRoutes from '@/hooks/useLeftSideBarRoutes'
import LeftSideBarNewPostModal from './LeftNewTweetModal'

interface NavListProps {
  currentUser: User
  seenNum: number
}

const NavList: React.FC<NavListProps> = ({ currentUser, seenNum }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const routes = useLeftSideBarRoutes(currentUser.userId!, seenNum)

  return (
    <>
      <LeftSideBarNewPostModal
        isOpenModal={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        data={currentUser}
      />
      <div className='mb-5 flex flex-col'>
        <div className='mb-5'>
          {routes.map((route) => (
            <NavButton key={route.label} {...route} />
          ))}
        </div>
        <div className='p-1 flex justify-center'>
          <Button primary lg onClick={() => setIsOpenModal(true)}>
            <RiQuillPenFill className='text-white lg:hidden' size={20} />
            <span className='hidden lg:block text-white'>推文</span>
          </Button>
        </div>
      </div>
    </>
  )
}

export default NavList
