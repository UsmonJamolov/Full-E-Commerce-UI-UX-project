import { getDictionary, type Locale } from '@/lib/i18n/dictionaries'

export type PublicArrivalCard = {
	title: string
	desc: string
	image: string
}

/** Standart novinki rasmlari (admin shu yo‘llarni saqlasa — til avtomatik moslanadi). */
export const NEW_ARRIVAL_FALLBACK_IMAGES = [
	'/images/ps5.png',
	'/images/woman-collection.png',
	'/images/amazon-echo.png',
	'/images/gucci-perfume.png',
] as const

export function buildNewArrivalFallbackCards(locale: Locale): PublicArrivalCard[] {
	const d = getDictionary(locale)
	return d.home.newArrivalFallback.map((c, i) => ({
		title: c.title,
		desc: c.desc,
		image: NEW_ARRIVAL_FALLBACK_IMAGES[i]!,
	}))
}

/** Admin kartalaridagi standart rasmlar uchun sarlavha/matnni joriy tilga almashtirish. */
function localizeDefaultCards(cards: PublicArrivalCard[], locale: Locale): PublicArrivalCard[] {
	const fb = buildNewArrivalFallbackCards(locale)
	return cards.map(card => {
		const path = card.image.split('?')[0] ?? card.image
		const idx = NEW_ARRIVAL_FALLBACK_IMAGES.findIndex(img => img === path)
		if (idx === -1) return card
		return { ...card, title: fb[idx]!.title, desc: fb[idx]!.desc }
	})
}

/** Bosh sahifa (RSC) uchun — admin `revalidatePath('/')` dan keyin yangi maʼlumot qaytadi */
export async function getPublicNewArrivalCards(locale: Locale): Promise<PublicArrivalCard[]> {
	const fallback = buildNewArrivalFallbackCards(locale)
	const base = process.env.NEXT_PUBLIC_SERVER_URL
	if (!base) return fallback
	try {
		const res = await fetch(`${base}/api/user/new-arrival`, { cache: 'no-store' })
		if (!res.ok) return fallback
		const data = await res.json()
		if (Array.isArray(data?.cards) && data.cards.length === 4) {
			const raw = data.cards.map((c: { title?: string; desc?: string; image?: string }) => ({
				title: String(c.title || ''),
				desc: String(c.desc || ''),
				image: String(c.image || ''),
			}))
			return localizeDefaultCards(raw, locale)
		}
	} catch {
		/* */
	}
	return fallback
}
