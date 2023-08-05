'use client'

import Button from '@/components/input/Button'
import Modal from '@/components/modal/Modal'

interface SettingCheckModalProps {
  onClose: () => void
  checkClose: () => void
  isOpen: boolean
}

const SettingCheckModal: React.FC<SettingCheckModalProps> = ({
  onClose,
  checkClose,
  isOpen,
}) => {
  const handleClose = () => {
    checkClose()
    onClose()
  }
  return (
    <Modal isOpenModal={isOpen} onClose={onClose}>
      <div className='p-5 flex flex-col space-y-4'>
        <div className='text-white text-lg font-semibold'>要捨棄變更嗎？</div>
        <div className='text-gray-500'>此動作無法復原，你將失去你的變更。</div>
        <Button warning onClick={handleClose}>
          <div className='px-10 py-2'>捨棄</div>
        </Button>
        <Button secondary onClick={onClose}>
          <div className='px-10 py-2'>取消</div>
        </Button>
      </div>
    </Modal>
  )
}

export default SettingCheckModal
