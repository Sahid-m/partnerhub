import Providers from '@/lib/providers';
import type { Metadata } from 'next';
import { ThemeProvider } from "next-themes";
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Partner Hub',
  description: 'A platform to find good developers or partners for your programming projects and hackathons based on proof of work',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  )
}
