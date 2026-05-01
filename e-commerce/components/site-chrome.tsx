'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import AuthMinimalBar from '@/components/auth-minimal-bar'
import Footer from '@/components/footer'
import Header from '@/components/header'
import type { PublicFooterSettings } from '@/lib/footer-public'
import type { Dictionary, Locale } from '@/lib/i18n/dictionaries'
import type { IProduct, SafeUser } from '@/types'
import { cn } from '@/lib/utils'

type Props = {
	children: ReactNode
	locale: Locale
	dictionary: Dictionary
	locationLabel: string
	searchItems: IProduct[]
	currentUser?: SafeUser | null
	footerSettings: PublicFooterSettings
}

function isAuthPath(pathname: string | null) {
	if (!pathname) return false
	return pathname === '/sign-in' || pathname === '/sign-up'
}

export default function SiteChrome({
	children,
	locale,
	dictionary,
	locationLabel,
	searchItems,
	currentUser,
	footerSettings,
}: Props) {
	const pathname = usePathname()
	const authPage = isAuthPath(pathname)

	return (
		<>
			<div className='site-global-header sticky top-0 relative z-50'>
				{authPage ? (
					<AuthMinimalBar />
				) : (
					<Header
						locale={locale}
						locationLabel={locationLabel}
						searchItems={searchItems}
						currentUser={currentUser}
					/>
				)}
			</div>
			<div className='site-main-wrapper flex w-full min-w-0 flex-col items-stretch'>
				<main
					className={cn(
						'site-main-content mx-auto w-full min-w-0 px-3 sm:px-4',
						!authPage && 'max-w-6xl',
					)}
				>
					{children}
				</main>
			</div>
			{!authPage && (
				<div className='site-global-footer'>
					<Footer dictionary={dictionary} settings={footerSettings} />
				</div>
			)}
		</>
	)
}
