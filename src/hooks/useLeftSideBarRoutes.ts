'use client'

import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import {
  BiSolidHomeCircle,
  BiSolidBell,
  BiSolidUser,
  BiSolidArrowToLeft,
} from 'react-icons/bi'
import { BsTwitter } from 'react-icons/bs'

const useLeftSideBarRoutes = (userId: string, newNotification?: number) => {
  const pathname = usePathname().split('/')[1]

  const routes = useMemo(
    () => [
      {
        label: '#',
        href: '/home',
        icon: BsTwitter,
        active: false,
        showLabel: false,
      },
      {
        label: '首頁',
        href: '/home',
        icon: BiSolidHomeCircle,
        active: pathname === 'home',
        showLabel: true,
      },
      {
        label: '通知',
        href: '/notification',
        icon: BiSolidBell,
        active: pathname === 'notification',
        showLabel: true,
        informNum: newNotification,
      },
      {
        label: '個人資料',
        href: `/user/${userId}/tweet`,
        icon: BiSolidUser,
        active: pathname === 'user',
        showLabel: true,
      },
      {
        label: '登出',
        href: '#',
        icon: BiSolidArrowToLeft,
        active: pathname === 'user',
        onClick: () => signOut(),
        showLabel: true,
      },
    ],
    [pathname, userId],
  )
  return routes
}

export default useLeftSideBarRoutes
