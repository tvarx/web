import type { Metadata } from 'next'
import './globals.css'

// Using system fonts temporarily for reliable Docker builds
// Google Fonts can be added via CSS @import in globals.css for runtime loading

export const metadata: Metadata = {
  title: 'TvarX — The Intelligence of Movement',
  description: 'A personalized training plan, powered by AI, designed for your goals.',
  keywords: ['fitness', 'AI training', 'personalized workout', 'exercise plan', 'fitness app'],
  authors: [{ name: 'TvarX' }],
  creator: 'TvarX',
  publisher: 'TvarX',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tvarx.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'TvarX',
    title: 'TvarX — The Intelligence of Movement',
    description: 'A personalized training plan, powered by AI, designed for your goals.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'TvarX Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TvarX — The Intelligence of Movement',
    description: 'A personalized training plan, powered by AI, designed for your goals.',
    images: ['/logo.png'],
    creator: '@tvarx',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}

