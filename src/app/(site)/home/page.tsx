import { redirect } from 'next/navigation'
import React from 'react'

const Home = async () => {
  redirect('/home/recommend')
  return <div>Home</div>
}

export default Home
