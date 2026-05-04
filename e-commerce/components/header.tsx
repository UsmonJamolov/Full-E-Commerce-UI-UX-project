import Link from 'next/link'
import { Heart, MapPin } from 'lucide-react'

import { getDictionary, type Locale } from '@/lib/i18n/dictionaries'
import type { IProduct, SafeUser } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import HeaderSearchPanel from './shared/header-search-panel'
import HeaderMobileNav from './shared/header-mobile-nav'
import HeaderUserAction from './shared/header-user-action'
import LanguageSwitcher from './shared/language-switcher'

type Props = {
  locale: Locale
  searchItems: IProduct[]
  locationLabel: string
  currentUser?: SafeUser | null
}

export default function Header({ locale, searchItems, locationLabel, currentUser }: Props) {
  const dict = getDictionary(locale)
  const favorites = currentUser?.favorites
  const wishlistCount = Array.isArray(favorites)
    ? new Set(
        favorites
          .map(favorite =>
            typeof favorite === 'string' ? favorite : (favorite as Partial<IProduct>)?._id
          )
          .filter((favoriteId): favoriteId is string => Boolean(favoriteId))
      ).size
    : 0

  return (
    <>
      <div className='bg-black text-white'>
        <div className='mx-auto flex min-h-10 max-w-6xl items-center justify-end gap-2 px-3 py-2 text-[11px] leading-snug sm:h-10 sm:px-4 sm:py-0 sm:text-xs'>
          <LanguageSwitcher current={locale} />
        </div>
      </div>

      <div className='border-b bg-white/95 backdrop-blur'>
        <div className='mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-3 sm:px-4'>
          <div className='flex min-w-0 items-center gap-2 md:gap-8'>
            <HeaderMobileNav
              menuTitle={dict.header.menu}
              locationLabel={locationLabel}
              locationAria={dict.header.locationAria}
              links={[]}
            />
            <Link
              href='/'
              className='truncate bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 bg-clip-text text-xl font-extrabold tracking-[0.08em] text-transparent sm:text-2xl md:text-3xl md:tracking-[0.12em]'
            >
              600 плюс
            </Link>
          </div>

          <div className='flex shrink-0 items-center gap-1 sm:gap-2 md:gap-3'>
            <div className='hidden max-w-[140px] items-center gap-1 truncate rounded-full border px-2.5 py-1 text-xs text-muted-foreground sm:inline-flex md:max-w-none'>
              <MapPin className='h-3.5 w-3.5 shrink-0' aria-hidden />
              <span className='truncate' aria-label={dict.header.locationAria}>
                {locationLabel}
              </span>
            </div>

            <div className='relative'>
              <Button asChild variant='ghost' size='icon'>
                <Link href='/dashboard/watch-list'>
                  <Heart className='h-5 w-5' />
                </Link>
              </Button>
              {wishlistCount > 0 && (
                <Badge className='absolute -right-1 -top-1 text-[10px]'>
                  {wishlistCount}
                </Badge>
              )}
            </div>

            <HeaderSearchPanel items={searchItems} searchPanel={dict.searchPanel} locale={locale} />

            <HeaderUserAction currentUser={currentUser} signInLabel={dict.header.signIn} />
          </div>
        </div>
      </div>
    </>
  )
}
