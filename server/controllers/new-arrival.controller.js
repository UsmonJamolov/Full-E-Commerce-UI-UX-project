const newArrivalModel = require('../models/new-arrival.model')

const DEFAULT_CARDS = [
	{
		title: 'PlayStation 5',
		desc: 'Black and White version of the PS5 coming out on sale.',
		image: '/images/ps5.png',
		imageKey: '',
	},
	{
		title: "Women's Collections",
		desc: 'Featured woman collections that give you another vibe.',
		image: '/images/woman-collection.png',
		imageKey: '',
	},
	{
		title: 'Speakers',
		desc: 'Amazon wireless speakers',
		image: '/images/amazon-echo.png',
		imageKey: '',
	},
	{
		title: 'Perfume',
		desc: 'GUCCI INTENSE OUD EDP',
		image: '/images/gucci-perfume.png',
		imageKey: '',
	},
]

function normalizeCards(cards) {
	if (!Array.isArray(cards) || cards.length === 0) return [...DEFAULT_CARDS]
	const next = cards.slice(0, 4).map((c, i) => ({
		title: String(c.title || DEFAULT_CARDS[i].title).trim(),
		desc: String(c.desc || DEFAULT_CARDS[i].desc).trim(),
		image: typeof c.image === 'string' && c.image ? c.image : DEFAULT_CARDS[i].image,
		imageKey: typeof c.imageKey === 'string' ? c.imageKey : '',
	}))
	while (next.length < 4) {
		next.push({ ...DEFAULT_CARDS[next.length] })
	}
	return next
}

class NewArrivalController {
	async getSettings(req, res, next) {
		try {
			let doc = await newArrivalModel.findOne({ key: 'main' })
			if (!doc) {
				doc = await newArrivalModel.create({ key: 'main', cards: DEFAULT_CARDS })
			}
			if (!doc.cards || doc.cards.length !== 4) {
				doc.cards = normalizeCards(doc.cards)
				doc.markModified('cards')
				await doc.save()
			}
			return res.json({
				cards: doc.cards.map(c => ({
					title: c.title,
					desc: c.desc,
					image: c.image,
					imageKey: c.imageKey || '',
				})),
			})
		} catch (error) {
			next(error)
		}
	}

	async updateSettings(req, res, next) {
		try {
			const { cards } = req.body
			if (!Array.isArray(cards) || cards.length !== 4) {
				return res.json({ failure: "Aynan 4 ta kart kerak" })
			}
			let doc = await newArrivalModel.findOne({ key: 'main' })
			if (!doc) {
				doc = await newArrivalModel.create({ key: 'main', cards: normalizeCards(cards) })
			} else {
				doc.cards = normalizeCards(cards)
				doc.markModified('cards')
				await doc.save()
			}
			return res.json({
				status: 200,
				cards: doc.cards.map(c => ({
					title: c.title,
					desc: c.desc,
					image: c.image,
					imageKey: c.imageKey || '',
				})),
			})
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new NewArrivalController()
