'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import type { SafeUser } from '@/types'

import UserBox from './user-box'

type Props = {
	currentUser?: SafeUser | null
	signInLabel: string
}

/** Birinchi SSR/hydrate bosqichida Radix `DropdownMenu` (UserBox) chiqmasin — `useId` mos kelishi uchun. */
export default function HeaderUserAction({ currentUser, signInLabel }: Props) {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return (
			<div
				className='h-9 min-w-[5.5rem] shrink-0 rounded-md border border-transparent sm:min-w-[6.5rem]'
				aria-hidden
			/>
		)
	}

	if (!currentUser?._id) {
		return (
			<Button asChild variant='outline' size='sm'>
				<Link href='/sign-in'>{signInLabel}</Link>
			</Button>
		)
	}

	return <UserBox user={currentUser} />
}
