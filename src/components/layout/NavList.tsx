'use client'
import React from 'react'
import NavButton from './NavButton'
import Button from '@/components/input/Button'
import { RiQuillPenFill } from 'react-icons/ri'
import { User } from '@prisma/client'
import useLeftSideBarRoutes from '@/hooks/useLeftSideBarRoutes'

interface NavListProps {
  currentUser: User
}

const NavList: React.FC<NavListProps> = ({ currentUser }) => {
  const routes = useLeftSideBarRoutes(currentUser?.userId || '')

  return (
    <div className='mb-5 flex flex-col'>
      <div className='mb-5'>
        {routes.map((route) => (
          <NavButton key={route.label} {...route} />
        ))}
      </div>
      <div className='p-1'>
        <Button primary lg>
          <RiQuillPenFill className='text-white lg:hidden' size={20} />
          <span className='hidden lg:block text-white'>推文</span>
        </Button>
      </div>
    </div>
  )
}

export default NavList
