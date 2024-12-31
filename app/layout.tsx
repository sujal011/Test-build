import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import './globals.css'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Flavour with Fusion',
  description: 'Your personal recipe and meal planning assistant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

