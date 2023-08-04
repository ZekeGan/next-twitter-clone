'use client'
import React from 'react'

import Tabs from '@/components/Tabs'
import useUserTabsRoutes from '@/hooks/useUserTabsRoutes'

const UserTabs = ({ userId }: { userId: string | null }) => {
  const routes = useUserTabsRoutes(userId)
  return <Tabs routes={routes} />
}

export default UserTabs
