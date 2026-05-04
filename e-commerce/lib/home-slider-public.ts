import { getDictionary, type HomeSliderSlide, type Locale } from '@/lib/i18n/dictionaries'

function isValidSlides(slides: unknown): slides is HomeSliderSlide[] {
	if (!Array.isArray(slides) || slides.length !== 4) return false
	return slides.every(
		s =>
			s &&
			typeof s === 'object' &&
			typeof (s as HomeSliderSlide).title === 'string' &&
			(s as HomeSliderSlide).title.trim().length > 0 &&
			typeof (s as HomeSliderSlide).text === 'string' &&
			(s as HomeSliderSlide).text.trim().length > 0 &&
			typeof (s as HomeSliderSlide).image === 'string' &&
			(s as HomeSliderSlide).image.trim().length > 0 &&
			typeof (s as HomeSliderSlide).link === 'string' &&
			(s as HomeSliderSlide).link.trim().length > 0,
	)
}

/** Главный слайдер: из админки или словарь текущей локали. */
export async function getPublicHomeSliderSlides(locale: Locale): Promise<HomeSliderSlide[]> {
	const fallback = getDictionary(locale).home.sliderSlides
	const base = process.env.NEXT_PUBLIC_SERVER_URL
	if (!base) return fallback
	try {
		const res = await fetch(`${base}/api/user/home-slider-settings`, { cache: 'no-store' })
		if (!res.ok) return fallback
		const data = await res.json()
		if (!isValidSlides(data?.slides)) return fallback
		return data.slides.map((s: HomeSliderSlide) => ({
			title: s.title.trim(),
			text: s.text.trim(),
			alt: (typeof s.alt === 'string' && s.alt.trim()) || s.title.trim(),
			image: s.image.trim(),
			link: s.link.trim(),
		}))
	} catch {
		return fallback
	}
}
