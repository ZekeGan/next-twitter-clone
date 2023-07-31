'use client'

import clsx from 'clsx'
import { useState } from 'react'

interface ModalProps {
  children: React.ReactNode
  isOpenModal: boolean
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ children, isOpenModal, onClose }) => {
  if (!isOpenModal) return null
  return (
    <div
      onClick={onClose}
      className={clsx(
        'fixed inset-0 bg-black bg-opacity-20 h-screen w-screen z-40 flex justify-center items-center',
      )}
    >
      <div className=' min-w-fit bg-sky-500'>
        <div>Bar</div>
        <div>Content{children}</div>
      </div>
    </div>
  )
}

export default Modal
