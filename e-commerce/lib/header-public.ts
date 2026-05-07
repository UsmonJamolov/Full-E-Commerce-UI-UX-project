import type { Locale } from '@/lib/i18n/dictionaries'

const locationFallbackByLocale: Record<Locale, string> = {
	en: 'Tashkent',
	ru: 'Ташкент',
	uz: 'Toshkent',
}

/** Bosh sahifa / layout uchun header sozlamalari (joylashuv) */
export async function getPublicHeaderSettings(locale: Locale): Promise<{ locationLabel: string }> {
	const base = process.env.NEXT_PUBLIC_SERVER_URL
	const fallback = { locationLabel: locationFallbackByLocale[locale] }
	if (!base) return fallback
	try {
		const res = await fetch(`${base}/api/user/header-settings`, { cache: 'no-store' })
		if (!res.ok) return fallback
		const data = await res.json()
		const locationLabel =
			typeof data?.locationLabel === 'string' && data.locationLabel.trim()
				? data.locationLabel.trim()
				: fallback.locationLabel
		return { locationLabel }
	} catch {
		return fallback
	}
}
