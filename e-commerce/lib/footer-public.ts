export type PublicFooterSettings = {
	phonePrimary: string
	phoneSecondary: string
	supportHours: string
	email: string
	telegramUrl: string
	maxMessengerUrl: string
	brandBlurb: string
}

const fallback: PublicFooterSettings = {
	phonePrimary: '+79210975576',
	phoneSecondary: '+79650015442',
	supportHours: '10:00 – 22:00',
	email: 'exclusive@gmail.com',
	telegramUrl: 'https://t.me/',
	maxMessengerUrl: 'https://max.ru/',
	brandBlurb: 'Exclusive — quality fashion & footwear. Join thousands of happy customers shopping with us every day.',
}

export async function getPublicFooterSettings(): Promise<PublicFooterSettings> {
	const base = process.env.NEXT_PUBLIC_SERVER_URL
	if (!base) return fallback
	try {
		const res = await fetch(`${base}/api/user/footer-settings`, { cache: 'no-store' })
		if (!res.ok) return fallback
		const data = await res.json()
		return {
			phonePrimary: String(data?.phonePrimary || fallback.phonePrimary),
			phoneSecondary: String(data?.phoneSecondary || fallback.phoneSecondary),
			supportHours: String(data?.supportHours || fallback.supportHours),
			email: String(data?.email || fallback.email),
			telegramUrl: String(data?.telegramUrl || fallback.telegramUrl),
			maxMessengerUrl: String(data?.maxMessengerUrl || fallback.maxMessengerUrl),
			brandBlurb: String(data?.brandBlurb || fallback.brandBlurb),
		}
	} catch {
		return fallback
	}
}
