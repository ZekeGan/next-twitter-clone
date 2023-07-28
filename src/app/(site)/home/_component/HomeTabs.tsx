'use client'
import Tabs from '@/components/Tabs'
import useHomeTabsRoutes from '@/hooks/useHomeTabsRoutes'
import React from 'react'

const HomeTabs = () => {
  const routes = useHomeTabsRoutes()
  return <Tabs routes={routes} />
}

export default HomeTabs
