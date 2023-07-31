'use client'

import Modal from '@/components/modal/Modal'
import { useState } from 'react'

interface SettingModalProps {
  onClose: () => void
  isOpen: boolean
}

const SettingModal: React.FC<SettingModalProps> = ({ onClose, isOpen }) => {
  return (
    <Modal isOpenModal={isOpen} onClose={onClose}>
      <div>User</div>
    </Modal>
  )
}

export default SettingModal
