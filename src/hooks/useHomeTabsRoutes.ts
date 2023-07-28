import { useParams } from 'next/navigation'
import React, { useMemo } from 'react'

const useHomeTabsRoutes = () => {
  const params = useParams()
  const routes = useMemo(
    () => [
      {
        label: '為你推薦',
        href: '/home/recommend',
        isActive: params?.slug === 'recommend',
      },
      {
        label: '正在跟隨',
        href: '/home/following',
        isActive: params?.slug === 'following',
      },
    ],
    [params],
  )
  return routes
}

export default useHomeTabsRoutes
