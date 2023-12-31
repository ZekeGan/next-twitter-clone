'use client'

import { useState, Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'

interface ModalProps {
  children: React.ReactNode
  isOpenModal: boolean
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ children, isOpenModal, onClose }) => {
  return (
    <Transition appear show={isOpenModal} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-white bg-opacity-10' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className='
                  w-full 
                  max-w-lg 
                  transform 
                  overflow-hidden 
                  rounded-2xl 
                  bg-twi-900 
                  text-left 
                  align-middle 
                  shadow-xl 
                  transition-all'
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
