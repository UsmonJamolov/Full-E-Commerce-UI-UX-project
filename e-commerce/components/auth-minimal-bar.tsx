'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

import UserBox from '@/components/shared/user-box'

export default function AuthMinimalBar() {
	const { data: session, status } = useSession()
	const user = session?.currentUser

	return (
		<div className='border-b bg-white/95 backdrop-blur'>
			<div className='mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-3 sm:px-4'>
				<Link
					href='/'
					className='truncate bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 bg-clip-text text-xl font-extrabold tracking-[0.08em] text-transparent sm:text-2xl'
				>
					600 плюс
				</Link>
				<div className='flex min-h-10 shrink-0 items-center'>
					{status === 'authenticated' && user?._id ? <UserBox user={user} /> : null}
				</div>
			</div>
		</div>
	)
}
