import { redirect } from 'next/navigation'

const Home = async () => {
  redirect('/home/recommend')
}

export default Home
