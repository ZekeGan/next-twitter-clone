'use client'

import { IoClose } from 'react-icons/io5'
import Button from '../input/Button'
import Modal from '../modal/Modal'
import Input from '../input/Input'
import { FieldValues, useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Loading from '../loading/Loading'

interface UserBoxModalProps {
  isOpenModal: boolean
  onClose: () => void
  userId: string
}

const LeftSideBarModal: React.FC<UserBoxModalProps> = ({
  isOpenModal,
  onClose,
  userId,
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { userId: userId } })

  const onSubmit = (data: FieldValues) => {
    console.log(data)

    setIsLoading(true)
    axios
      .post('/api/updateUserId', { ...data })
      .then(() => {
        router.refresh()
        onClose()
      })
      .catch((err) => toast.error(err))
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

export default LeftSideBarModal
