import { BsTwitter } from 'react-icons/bs'
import AuthForm from './_component/AuthForm'

export default function Auth() {
  return (
    <div
      className='
        min-h-screen 
        min-w-full 
        sm:flex 
        sm:items-center 
        sm:justify-center'
    >
      <div
        className=' 
        bg-twi-900
        p-5  
        min-w-max
        h-screen
        sm:h-max
        sm:rounded-xl 
        sm:max-w-2xl'
      >
        {/* bar */}
        <div className='flex justify-center w-full'>
          <BsTwitter className='text-center text-white text-xl' size={30} />
        </div>
        <AuthForm />
      </div>
    </div>
  )
}

function T() {
  return (
    <div className=' flex flex-col min-h-full justify-center py-12 sm:px-6 lg:px-8 bg-gray-100'>
      <div className=' mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        {/* Start */}
        <div className=' bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
          <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'></div>
        </div>
        {/* End */}
      </div>
    </div>
  )
}
