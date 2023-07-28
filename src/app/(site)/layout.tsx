import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ToastContext from '@/context/ToastContext'
import AuthContext from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Twitter Clone',
  description: 'Twitter Clone Project',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthContext>
          <ToastContext />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
