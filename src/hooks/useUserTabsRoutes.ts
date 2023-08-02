import { useParams } from 'next/navigation'
import { useMemo } from 'react'

const useUserTabsRoutes = (userId: string | null) => {
  const params = useParams()
  const routes = useMemo(() => {
    if (!userId) return []
    return [
      {
        label: '推文',
        href: `/user/${userId}/tweet`,
        isActive: params?.slug === 'tweet',
      },
      {
        label: '回覆',
        href: `/user/${userId}/replies`,
        isActive: params?.slug === 'replies',
      },
      {
        label: '喜歡的內容',
        href: `/user/${userId}/likes`,
        isActive: params?.slug === 'likes',
      },
    ]
  }, [params?.slug, userId])
  return routes
}

export default useUserTabsRoutes
