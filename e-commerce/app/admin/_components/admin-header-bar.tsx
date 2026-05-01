'use client'

import UserBox from '@/components/shared/user-box'
import { cn } from '@/lib/utils'
import { SafeUser } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {
	user: SafeUser | null
}

export default function AdminHeaderBar({ user }: Props) {
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 6)
		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	return (
		<header
			className={cn(
				'sticky top-0 z-50 w-full border-b transition-[background-color,box-shadow,backdrop-filter] duration-300',
				scrolled
					? 'border-black/10 bg-white/92 shadow-sm backdrop-blur-md backdrop-saturate-150 supports-[backdrop-filter]:bg-white/88'
					: 'border-transparent bg-white',
			)}
		>
			<div className='mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4'>
				<Link href='/' className='text-xl font-bold'>
					600 плюс Админ
				</Link>
				{user?._id ? (
					<UserBox user={user} />
				) : (
					<Link href='/sign-in' className='text-sm font-medium text-muted-foreground hover:text-foreground'>
						Войти
					</Link>
				)}
			</div>
		</header>
	)
}
