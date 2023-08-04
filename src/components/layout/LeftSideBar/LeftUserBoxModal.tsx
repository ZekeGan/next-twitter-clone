'use client'
import { useState } from 'react'
import axios from 'axios'
import { FieldValues, useForm } from 'react-hook-form'
import { IoClose } from 'react-icons/io5'
import { useRouter } from 'next/navigation'

import Button from '@/components/input/Button'
import Modal from '@/components/modal/Modal'
import Input from '@/components/input/Input'
import Loading from '@/components/loading/Loading'
import TError from '@/components/toast/TError'

interface LeftUserBoxModalProps {
  isOpenModal: boolean
  onClose: () => void
  userId: string
}

const LeftUserBoxModal: React.FC<LeftUserBoxModalProps> = ({
  isOpenModal,
  onClose,
  userId,
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { register, watch, handleSubmit } = useForm<FieldValues>({
    defaultValues: { userId: userId },
  })

  const onSubmit = (data: FieldValues) => {
    console.log(data)
    setIsLoading(true)
    axios
      .post('/api/updateUserId', { ...data })
      .then(() => {
        router.refresh()
        onClose()
      })
      .catch((err) => {
        TError('哪裡發生錯誤，請再試一次')
        console.error(err)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <Modal isOpenModal={isOpenModal} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex items-center justify-between p-4'>
            <div className='flex items-center space-x-3'>
              <IoClose
                size={20}
                className='cursor-pointer text-white'
                onClick={onClose}
              />
              <span className=' font-bold text-white'>編輯使用者名稱</span>
            </div>
            <div className='w-20 flex justify-end'>
              <Button md type='submit'>
                <span className='text-sm px-2 py-1'>儲存</span>
              </Button>
            </div>
          </div>

          <div className='p-4'>
            <Input
              register={register}
              label='使用者名稱'
              id='userId'
              value={watch('userId')}
            />
          </div>
        </form>
      </Modal>
    </>
  )
}

export default LeftUserBoxModal
