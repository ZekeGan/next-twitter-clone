'use client'

import Avatar from '@/components/Avatar'
import Button from '@/components/input/Button'
import Textarea from '@/components/input/Textarea'
import Loading from '@/components/loading/Loading'
import Modal from '@/components/modal/Modal'
import usePostNewTweet from '@/hooks/usePostNewTweet'
import { User } from '@prisma/client'
import { IoClose } from 'react-icons/io5'

interface LeftNewTweetModalProps {
  isOpenModal: boolean
  onClose: () => void
  data: User
}

const LeftNewTweetModal: React.FC<LeftNewTweetModalProps> = ({
  isOpenModal,
  onClose,
  data,
}) => {
  const {
    form: { register, formSubmit },
    isLoading,
  } = usePostNewTweet(onClose)

  return (
    <>
      <Loading isLoading={isLoading} />
      <Modal isOpenModal={isOpenModal} onClose={onClose}>
        <div className='p-4'>
          <IoClose size={20} className='cursor-pointer text-white' onClick={onClose} />
          <div className='grid grid-cols-[3rem_auto] mt-3'>
            <Avatar image={data.image} />
            <form onSubmit={formSubmit}>
              <Textarea
                register={register}
                id='textarea'
                placeholder='有什麼新鮮事？！'
              />
              <div className='border-b-[1px] border-gray-600' />
              <div className='flex justify-end mt-3'>
                <div className='w-20'>
                  <Button primary type='submit'>
                    <span className='px-3'>發佈</span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default LeftNewTweetModal
