const homeSliderSettingsModel = require('../models/home-slider-settings.model')

const DEFAULT_SLIDES = [
	{
		title: 'Sneakers, loafers, boots',
		text: "Men's and women's footwear from 900 ₽.",
		alt: 'Sneakers, loafers, boots',
		image: '/images/kv banner.png',
		link: '/explore-products',
	},
	{
		title: 'Automatic and semi-automatic umbrellas',
		text: 'From 700 ₽.',
		alt: 'Umbrellas',
		image: '/images/zontik banner.png',
		link: '/explore-products',
	},
	{
		title: "Children's footwear",
		text: 'From 600 ₽.',
		alt: "Children's footwear",
		image: '/images/dets-kros banner.png',
		link: '/shoes-products?targetGroup=Bola',
	},
	{
		title: 'Bags and backpacks',
		text: 'Bags and backpacks from 800 ₽.',
		alt: 'Bags and backpacks',
		image: '/images/sumka, ryukzaklar.png',
		link: '/explore-products',
	},
]

function normalizeSlide(s) {
	if (!s || typeof s !== 'object') return null
	const title = typeof s.title === 'string' ? s.title.trim().slice(0, 200) : ''
	const text = typeof s.text === 'string' ? s.text.trim().slice(0, 400) : ''
	const alt = typeof s.alt === 'string' ? s.alt.trim().slice(0, 200) : ''
	const image = typeof s.image === 'string' ? s.image.trim().slice(0, 2000) : ''
	const link = typeof s.link === 'string' ? s.link.trim().slice(0, 500) : ''
	if (!title || !text || !image || !link) return null
	return { title, text, alt: alt || title, image, link }
}

function slidesOrDefault(doc) {
	const raw = doc?.slides
	if (!Array.isArray(raw) || raw.length !== 4) return DEFAULT_SLIDES
	const out = raw.map(normalizeSlide)
	if (out.some(s => !s)) return DEFAULT_SLIDES
	return out
}

class HomeSliderSettingsController {
	async getSettings(req, res, next) {
		try {
			let doc = await homeSliderSettingsModel.findOne({ key: 'main' })
			if (!doc) {
				doc = await homeSliderSettingsModel.create({ key: 'main', slides: DEFAULT_SLIDES })
			}
			return res.json({ slides: slidesOrDefault(doc) })
		} catch (error) {
			next(error)
		}
	}

	async updateSettings(req, res, next) {
		try {
			const { slides } = req.body
			if (!Array.isArray(slides) || slides.length !== 4) {
				return res.status(400).json({ failure: 'Нужно ровно 4 слайда' })
			}
			const normalized = slides.map(normalizeSlide)
			if (normalized.some(s => !s)) {
				return res.status(400).json({ failure: 'Заполните заголовок, текст, ссылку и изображение для каждого слайда' })
			}

			let doc = await homeSliderSettingsModel.findOne({ key: 'main' })
			if (!doc) {
				doc = await homeSliderSettingsModel.create({ key: 'main', slides: normalized })
			} else {
				doc.slides = normalized
				await doc.save()
			}

			return res.json({ status: 200, slides: slidesOrDefault(doc) })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new HomeSliderSettingsController()
