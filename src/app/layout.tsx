import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Factorem - Manufacturing Solutions',
  description: 'AI-powered quoting and supplier matching',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}