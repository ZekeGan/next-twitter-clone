'use client'

import Modal from '@/components/modal/Modal'
import { Tweet, User } from '@prisma/client'
import AuthorInfo from './AuthorInfo'
import Avatar from '@/components/Avatar'
import { IoClose } from 'react-icons/io5'
import Textarea from '@/components/input/Textarea'
import usePostComment from '@/hooks/usePostComment'
import Loading from '@/components/loading/Loading'
import Button from '@/components/input/Button'

interface TweetCommentModalProps {
  data: Tweet
  currentUser: User
  user: User
  onClose: () => void
  isOpen: boolean
}

const TweetCommentModal: React.FC<TweetCommentModalProps> = ({
  onClose,
  isOpen,
  data,
  user,
  currentUser,
}) => {
  const {
    form: { register, formSubmit },
    isLoading,
  } = usePostComment(data, onClose)
  return (
    <>
      <Loading isLoading={isLoading} />
      <Modal isOpenModal={isOpen} onClose={onClose}>
        <div className='p-3'>
          <IoClose
            size={20}
            className='cursor-pointer text-white mb-3'
            onClick={onClose}
          />
          <div className='grid grid-cols-[3rem_auto] mb-5 gap-2'>
            <div className=' flex flex-col justify-center items-center space-y-1'>
              <Avatar image={user.image} />
              <div className=' w-[2px] bg-gray-600 rounded-full grow' />
            </div>
            <div>
              <AuthorInfo author={user} tweetCreatedAt={data.createdAt} />
              <div className='text-white'>{data.content}</div>
            </div>
          </div>
          <div className='grid grid-cols-[3rem_auto] gap-2'>
            <div className='flex justify-center'>
              <Avatar image={currentUser.image} />
            </div>
            <form onSubmit={formSubmit} className='space-y-2'>
              <Textarea
                register={register}
                id='comment'
                placeholder='輸入您的回覆！'
                isUnderline
              />
              <div className='flex justify-end'>
                <div className='w-20'>
                  <Button primary type='submit'>
                    回覆
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

export default TweetCommentModal
