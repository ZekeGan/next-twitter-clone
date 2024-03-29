'use client'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useSession, signIn, SignInResponse } from 'next-auth/react'
import { BsGoogle, BsGithub } from 'react-icons/bs'
import Input from '@/components/input/Input'
import Button from '@/components/input/Button'
import SocialAuthButton from './SocialAuthButton'
import Loading from '@/components/loading/Loading'
import TError from '@/components/toast/TError'
import TSuccess from '@/components/toast/TSuccess'

type Varient = 'Login' | 'Register'

const AuthForm = () => {
  const router = useRouter()
  const session = useSession()
  const [varient, setVarient] = useState<Varient>('Login')
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, watch } = useForm<FieldValues>({
    defaultValues: { email: '', password: '', name: '' },
  })

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.push('/home/recommend')
    }
  }, [session, router])

  const toggleChange = useCallback(() => {
    if (varient === 'Login') setVarient('Register')
    else setVarient('Login')
  }, [varient])

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true)
    if (varient === 'Register') {
      axios
        .post('/api/register', data)
        .then(() => {
          TSuccess('歡迎加入推特')
          router.push('/')
        })
        .catch((err) => {
          TError('電子郵件已有人使用')
          console.error(err)
        })
        .finally(() => setIsLoading(false))
    }

    if (varient === 'Login') {
      signIn('credentials', { ...data, redirect: false })
        .then((callback) => loginSuccess(callback!))
        .finally(() => setIsLoading(false))
    }
  }
  const handleSocialAuth = (action: string) => {
    setIsLoading(true)
    signIn(action, { redirect: false })
      .then((callback) => loginSuccess(callback!))
      .finally(() => setIsLoading(false))
  }

  const loginSuccess = (callback: SignInResponse) => {
    if (!callback?.url && callback?.error) {
      TError(callback.error)
    }
    if (callback?.url && !callback?.error) {
      TSuccess('歡迎回來推特')
      router.push('/home')
    }
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className='py-6 sm:px-32 '>
        <h1 className=' text-white font-semibold text-4xl'>
          {varient === 'Login' ? '登入' : '註冊'} Twitter
        </h1>

        {varient === 'Login' && (
          <>
            <div className='space-y-4 mt-5 flex flex-col'>
              {/* <SocialAuthButton
                icon={BsGoogle}
                text='使用Google登入'
                onClick={() => handleSocialAuth('google')}
              /> */}
              <SocialAuthButton
                icon={BsGithub}
                text='使用Github登入'
                onClick={() => handleSocialAuth('github')}
              />
            </div>
            {/* Divide */}
            <div className='relative p-2'>
              <div className='absolute inset-0 flex items-center '>
                <div className=' border-b border-gray-400 w-full' />
              </div>
              <div className='relative flex justify-center'>
                <div className=' bg-twi-900 text-white p-2'>或</div>
              </div>
            </div>
          </>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
          <div className='space-y-4'>
            {varient === 'Register' && (
              <Input
                id='name'
                label='使用者名稱'
                value={watch('name')}
                register={register}
                disabled={isLoading}
              />
            )}
            <Input
              id='email'
              label='電子郵件'
              value={watch('email')}
              register={register}
              disabled={isLoading}
            />
            <Input
              id='password'
              label='密碼'
              value={watch('password')}
              type='password'
              register={register}
              disabled={isLoading}
            />
          </div>

          <div className='space-y-4 mt-5 flex flex-col'>
            <Button lg>
              <span>{varient === 'Login' ? '登入' : '註冊'}</span>
            </Button>
          </div>
        </form>

        <div className='flex items-center mt-5'>
          <span className='text-gray-400 text-sm'>
            {varient === 'Login' ? '還沒註冊帳戶嗎？' : '已經有帳戶？'}
          </span>
          <span
            className='text-sky-600 ml-2 cursor-pointer hover:text-sky-700'
            onClick={toggleChange}
          >
            {varient === 'Login' ? '註冊' : '登入'}
          </span>
        </div>
      </div>
    </>
  )
}

export default AuthForm
