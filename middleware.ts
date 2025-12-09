import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Supported locales
export const locales = ['en', 'fa', 'es', 'fr', 'de', 'ar'] as const
export const defaultLocale = 'en' as const

export type Locale = typeof locales[number]

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Get locale from Accept-Language header or use default
    const locale = getLocale(request) || defaultLocale

    // Redirect to /locale/pathname
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }
}

function getLocale(request: NextRequest): Locale | null {
  // Try to get locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    // Parse Accept-Language header
    const languages = acceptLanguage
      .split(',')
      .map((lang) => {
        const [locale, q = 'q=1'] = lang.trim().split(';')
        const quality = parseFloat(q.replace('q=', ''))
        return { locale: locale.toLowerCase().split('-')[0], quality }
      })
      .sort((a, b) => b.quality - a.quality)

    // Find first supported locale
    for (const { locale } of languages) {
      if (locales.includes(locale as Locale)) {
        return locale as Locale
      }
    }
  }

  return null
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico|logo.png|robots.txt).*)',
  ],
}
