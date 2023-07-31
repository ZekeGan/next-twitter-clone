'use client'
import Tabs from '@/components/Tabs'
import useUserTabsRoutes from '@/hooks/useUserTabsRoutes'
import React from 'react'

const UserTabs = ({ userId }: { userId: string | null }) => {
  const routes = useUserTabsRoutes(userId)
  return <Tabs routes={routes} />
}

export default UserTabs
