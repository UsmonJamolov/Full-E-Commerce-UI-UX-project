export type PublicArrivalCard = {
	title: string
	desc: string
	image: string
}

export const NEW_ARRIVAL_FALLBACK_CARDS: PublicArrivalCard[] = [
	{
		title: 'PlayStation 5',
		desc: 'Black and White version of the PS5 coming out on sale.',
		image: '/images/ps5.png',
	},
	{
		title: "Women's Collections",
		desc: 'Featured woman collections that give you another vibe.',
		image: '/images/woman-collection.png',
	},
	{
		title: 'Speakers',
		desc: 'Amazon wireless speakers',
		image: '/images/amazon-echo.png',
	},
	{
		title: 'Perfume',
		desc: 'GUCCI INTENSE OUD EDP',
		image: '/images/gucci-perfume.png',
	},
]

/** Bosh sahifa (RSC) uchun — admin `revalidatePath('/')` dan keyin yangi maʼlumot qaytadi */
export async function getPublicNewArrivalCards(): Promise<PublicArrivalCard[]> {
	const base = process.env.NEXT_PUBLIC_SERVER_URL
	if (!base) return NEW_ARRIVAL_FALLBACK_CARDS
	try {
		const res = await fetch(`${base}/api/user/new-arrival`, { cache: 'no-store' })
		if (!res.ok) return NEW_ARRIVAL_FALLBACK_CARDS
		const data = await res.json()
		if (Array.isArray(data?.cards) && data.cards.length === 4) {
			return data.cards.map((c: { title?: string; desc?: string; image?: string }) => ({
				title: String(c.title || ''),
				desc: String(c.desc || ''),
				image: String(c.image || ''),
			}))
		}
	} catch {
		/* */
	}
	return NEW_ARRIVAL_FALLBACK_CARDS
}
