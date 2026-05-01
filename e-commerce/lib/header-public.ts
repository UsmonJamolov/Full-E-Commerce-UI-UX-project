/** Bosh sahifa / layout uchun header sozlamalari (joylashuv) */
export async function getPublicHeaderSettings(): Promise<{ locationLabel: string }> {
	const base = process.env.NEXT_PUBLIC_SERVER_URL
	const fallback = { locationLabel: 'Tashkent' }
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
