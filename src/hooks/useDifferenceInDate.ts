'use client'

import { differenceInHours, differenceInMinutes, format } from 'date-fns'
import { useMemo } from 'react'

const useDifferenceInDate = (createdAt: Date) => {
  const differenceInTime: string = useMemo(() => {
    const currentDate = new Date()
    let time = differenceInMinutes(currentDate, createdAt)
    if (time < 60) return `${time}分鐘`
    time = differenceInHours(currentDate, createdAt)
    if (time < 24) return `${time}小時`
    return format(new Date(createdAt), 'MM月dd日')
  }, [createdAt])

  return differenceInTime
}

export default useDifferenceInDate
