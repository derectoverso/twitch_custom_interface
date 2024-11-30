// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ReactQueryProvider } from '@/lib/query-provider'
import Navigation from '@/components/Navigation'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Twitch Dashboard',
  description: 'Multi-stream Twitch dashboard',
  icons: {
    icon: '/twitch_icon.png',
    shortcut: '/twitch_icon.png',
    apple: '/twitch_icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1A1A1A]`}>
        <Navigation />
        <main className="pt-[50px]">
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </main>
      </body>
    </html>
  )
}