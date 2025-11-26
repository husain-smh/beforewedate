import type { Metadata, Viewport } from 'next'
import '../styles/globals.css'
import '../index.css'

export const metadata: Metadata = {
  title: 'before we date',
  description: 'Explore relationship scenarios and compare answers',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="antialiased h-full">
        {children}
      </body>
    </html>
  )
}

