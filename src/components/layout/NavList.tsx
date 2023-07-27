'use client'
import React from 'react'
import NavButton from './NavButton'
import useRoutes from '@/hooks/useRoutes'
import Button from '@/components/input/Button'
import { RiQuillPenFill } from 'react-icons/ri'
import { User } from '@prisma/client'

interface NavListProps {
  currentUser: User
}

const NavList: React.FC<NavListProps> = ({ currentUser }) => {
  const routes = useRoutes(currentUser.userId || '')

  return (
    <div className='mb-5 flex flex-col'>
      <div className='mb-5'>
        {routes.map((route) => (
          <NavButton key={route.label} {...route} />
        ))}
      </div>
      <Button primary lg>
        <RiQuillPenFill className='text-white lg:hidden' size={20} />
        <span className='hidden lg:block text-white'>推文</span>
      </Button>
    </div>
  )
}

export default NavList
