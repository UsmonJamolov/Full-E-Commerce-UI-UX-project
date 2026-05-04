import './globals.css'

import { cookies } from 'next/headers'
import { getServerSession } from 'next-auth'

import { getProducts } from '@/actions/user.action'
import { I18nProvider } from '@/components/providers/i18n-provider'
import SessionProvider from '@/components/providers/session.provider'
import SiteChrome from '@/components/site-chrome'
import { Toaster } from '@/components/ui/sonner'
import { authOptions } from '@/lib/auth-options'
import { getPublicFooterSettings } from '@/lib/footer-public'
import { getPublicHeaderSettings } from '@/lib/header-public'
import { getDictionary, parseLocale } from '@/lib/i18n/dictionaries'
import { ChildProps } from '@/types'

const RootLayout = async ({ children }: ChildProps) => {
  const [session, cookieStore, headerSettings, footerSettings, productsRes] = await Promise.all([
    getServerSession(authOptions),
    cookies(),
    getPublicHeaderSettings(),
    getPublicFooterSettings(),
    getProducts({
      searchQuery: '',
      filter: 'newest',
      category: '',
      targetGroup: '',
      page: '1',
      pageSize: '40',
    }),
  ])
  const locale = parseLocale(cookieStore.get('locale')?.value)
  const dictionary = getDictionary(locale)
  const searchItems = productsRes?.data?.products || []

  return (
    <html lang={locale}>
      <body className='antialised'>
        <I18nProvider locale={locale} dictionary={dictionary}>
          <SessionProvider session={session}>
            <SiteChrome
              locale={locale}
              dictionary={dictionary}
              locationLabel={headerSettings.locationLabel}
              searchItems={searchItems}
              currentUser={session?.currentUser}
              footerSettings={footerSettings}
            >
              {children}
            </SiteChrome>
            <Toaster />
          </SessionProvider>
        </I18nProvider>
      </body>
    </html>
  )
}

export default RootLayout
