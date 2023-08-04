import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/auth',
  },
})

export const config = {
  matcher: [
    '/home',
    '/home/:path*',
    '/user',
    '/user/:path*',
    '/notification',
    '/notification/:path*',
  ],
}
