'use client'

import Avatar from '@/components/Avatar'
import Button from '@/components/input/Button'
import Input from '@/components/input/Input'
import Textarea from '@/components/input/Textarea'
import Modal from '@/components/modal/Modal'
import { User } from '@prisma/client'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { IoClose, IoCameraOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { CldUploadButton } from 'next-cloudinary'
import { useRouter } from 'next/navigation'
import Loading from '@/components/loading/Loading'

interface SettingModalProps {
  onClose: () => void
  isOpen: boolean
  data: User
}

const SettingModal: React.FC<SettingModalProps> = ({ onClose, isOpen, data }) => {
  const router = useRouter()
  const [newackgroundUrl, setNewBackgroundUrl] = useState(data.profileBackground)
  const [newImageUrl, setNewImageUrl] = useState(data.image)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, watch } = useForm<FieldValues>({
    defaultValues: {
      name: data.name || '',
      message: data.profileMessage || '',
      website: data.website || '',
      location: data.geolocation || '',
    },
  })

  const onSubmit = (data: FieldValues) => {
    setIsLoading(true)
    axios
      .post('/api/setProfile', {
        ...data,
        background: newackgroundUrl,
        image: newImageUrl,
      })
      .then(() => {
        router.refresh()
        onClose()
      })
      .catch((err) => toast.error(err))
      .finally(() => setIsLoading(false))
  }

  const handleUploadBackground = (result: any) => {
    setNewBackgroundUrl(result?.info?.secure_url)
  }

  const handleUploadImage = (result: any) => {
    setNewImageUrl(result?.info?.secure_url)
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <Modal isOpenModal={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex items-center justify-between p-4'>
            <div className='flex items-center space-x-3'>
              <IoClose
                size={20}
                className='cursor-pointer text-white'
                onClick={onClose}
              />
              <span className=' font-bold text-white'>編輯個人資料</span>
            </div>
            <div className='w-20 flex justify-end'>
              <Button md type='submit'>
                <span className='text-sm px-2 py-1'>儲存</span>
              </Button>
            </div>
          </div>
          <div className=' h-[50%]'>
            <div className=' relative'>
              <div className='w-full h-48 bg-gray-500 relative flex items-center justify-center overflow-hidden'>
                {newackgroundUrl && (
                  <Image
                    src={newackgroundUrl}
                    alt='profileBackground'
                    fill
                    priority
                    style={{ objectFit: 'cover', width: '100%' }}
                  />
                )}
                <div className='flex justify-center items-center space-x-5 z-40'>
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUploadBackground}
                    uploadPreset='twitter-clone'
                  >
                    <div className='p-3 rounded-full bg-black bg-opacity-30 cursor-pointer hover:bg-opacity-50 transition'>
                      <IoCameraOutline size={30} className='text-white' />
                    </div>
                  </CldUploadButton>
                  {newackgroundUrl && (
                    <div
                      onClick={() => setNewBackgroundUrl('')}
                      className='p-3 rounded-full bg-black bg-opacity-30 cursor-pointer hover:bg-opacity-50 transition'
                    >
                      <IoClose size={30} className='text-white' />
                    </div>
                  )}
                </div>
              </div>
              <div className='absolute bottom-0 left-7 translate-y-1/2'>
                <div className='relative'>
                  {newImageUrl ? (
                    <Avatar image={newImageUrl} lg border />
                  ) : (
                    <Avatar image={data.image} lg border />
                  )}
                  <div>
                    <CldUploadButton
                      options={{ maxFiles: 1 }}
                      onUpload={handleUploadImage}
                      uploadPreset='twitter-clone'
                      className='
                      p-3 
                      absolute 
                      left-1/2 
                      top-1/2 
                      -translate-x-1/2 
                      -translate-y-1/2 
                      rounded-full 
                      bg-black 
                      bg-opacity-30 
                      cursor-pointer 
                      hover:bg-opacity-50 
                      transition'
                    >
                      <IoCameraOutline className=' text-white' size='30' />
                    </CldUploadButton>
                  </div>
                </div>
              </div>
            </div>
            <div className='p-4 space-y-7 pt-20 pb-10'>
              <Input label='名稱' id='name' register={register} value={watch('name')} />
              <Textarea
                register={register}
                id='message'
                label='自我介紹'
                value={watch('message')}
                border
              />
              <Input
                label='位置'
                id='location'
                register={register}
                value={watch('location')}
              />
              <Input
                label='網站'
                id='website'
                register={register}
                value={watch('website')}
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default SettingModal
