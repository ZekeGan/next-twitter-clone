'use client'

import React, { useState } from 'react'
import LeftUserBoxModal from './LeftUserBoxModal'
import UserBox from '../UserBox'
import { User } from '@prisma/client'
import { FiMoreHorizontal } from 'react-icons/fi'

interface LeftSideBarBoxProps {
  currentUser: User
}

const LeftUserBox: React.FC<LeftSideBarBoxProps> = ({ currentUser }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  return (
    <>
      <LeftUserBoxModal
        isOpenModal={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        userId={currentUser.userId!}
      />
      <UserBox
        onClick={() => setIsOpenModal(true)}
        userId={currentUser.userId!}
        isProfile
        name={currentUser.name!}
        image={currentUser.image!}
      >
        <FiMoreHorizontal size={20} className='text-white hidden lg:block' />
      </UserBox>
    </>
  )
}

export default LeftUserBox
