'use client'

import React, { useState } from 'react'
import LeftSideBarModal from './LeftSideBarModal'
import UserBox from './UserBox'
import { User } from '@prisma/client'

interface LeftSideBarBoxProps {
  currentUser: User
}

const LeftSideBarBox: React.FC<LeftSideBarBoxProps> = ({ currentUser }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  return (
    <>
      <LeftSideBarModal
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
      />
    </>
  )
}

export default LeftSideBarBox
