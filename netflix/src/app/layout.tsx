import './globals.css';
import type { Metadata } from 'next';
import { Roboto_Slab } from 'next/font/google';

const robotoSlab = Roboto_Slab({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Netflix',
  description: 'A Netflix clone built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={robotoSlab.className}>{children}</body>
    </html>
  )
}
