import { useParams } from 'next/navigation'
import { useMemo } from 'react'

const useFollowTabsRouters = (userId: string) => {
  const params = useParams()
  const routes = useMemo(() => {
    if (!userId) return []
    return [
      {
        label: '跟隨者',
        href: `/user/${userId}/follow/followers`,
        isActive: params?.tabType === 'followers',
      },
      {
        label: '正在跟隨',
        href: `/user/${userId}/follow/following`,
        isActive: params?.tabType === 'following',
      },
    ]
  }, [params?.tabType, userId])
  return routes
}

export default useFollowTabsRouters
