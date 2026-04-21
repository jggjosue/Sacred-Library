import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define which routes are protected
const isProtectedRoute = createRouteMatcher([
  '/profile(.*)',
  '/studio(.*)',
  '/favorites(.*)',
  '/downloads(.*)'
])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  // If the user is not signed in and tries to access a protected route
  if (!userId && isProtectedRoute(req)) {
    // Redirect them to the home page
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
