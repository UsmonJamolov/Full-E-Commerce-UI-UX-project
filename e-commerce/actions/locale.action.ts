'use server'

import { parseLocale } from '@/lib/i18n/dictionaries'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function setLocale(raw: string) {
	const locale = parseLocale(raw)
	const store = await cookies()
	store.set('locale', locale, {
		path: '/',
		maxAge: 60 * 60 * 24 * 365,
		sameSite: 'lax',
	})
	revalidatePath('/', 'layout')
}
