'use client'

import Tabs from '@/components/Tabs'
import useFollowTabsRouters from '@/hooks/useFollowTabsRouters'

const FollowerTabs = ({ userId }: { userId: string }) => {
  const routes = useFollowTabsRouters(userId)
  return <Tabs routes={routes} />
}

export default FollowerTabs
