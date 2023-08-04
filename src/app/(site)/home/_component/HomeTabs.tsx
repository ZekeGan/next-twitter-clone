'use client'
import React from 'react'

import Tabs from '@/components/Tabs'
import useHomeTabsRoutes from '@/hooks/useHomeTabsRoutes'

const HomeTabs = () => {
  const routes = useHomeTabsRoutes()
  return <Tabs routes={routes} />
}

export default HomeTabs
