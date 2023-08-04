'use client'
import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
interface TabsProps {
  routes: {
    label: string
    href: string
    isActive: boolean
  }[]
}

const Tabs: React.FC<TabsProps> = ({ routes }) => {
  return (
    <div className='flex w-full justify-between border-b-[1px] border-gray-600'>
      {routes.map((tab) => (
        <Link
          href={tab.href}
          key={tab.href}
          className='w-full flex items-center justify-center hover:bg-gray-700 text-white'
        >
          <div className='flex flex-col'>
            <div
              className={clsx(
                'py-3 text-gray-400',
                tab.isActive && 'font-bold text-white',
              )}
            >
              {tab.label}
            </div>
            <div className={clsx(tab.isActive && 'w-full h-1 rounded-full bg-sky-500')} />
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Tabs
