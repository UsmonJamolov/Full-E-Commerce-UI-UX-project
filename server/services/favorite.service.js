const favoriteModel = require('../models/favorite.model')
const userModel = require('../models/user.model')

/** Eski user.favorites massividagi IDlarni Favorite collectionga ko‘chiradi va massivni bo‘shatadi. */
async function migrateLegacyFavorites(userId) {
	const user = await userModel.findById(userId).select('favorites')
	if (!user?.favorites?.length) return
	for (const productId of user.favorites) {
		await favoriteModel.updateOne(
			{ user: userId, product: productId },
			{ $setOnInsert: { user: userId, product: productId } },
			{ upsert: true },
		)
	}
	await userModel.updateOne({ _id: userId }, { $set: { favorites: [] } })
}

async function getFavoriteProductIds(userId) {
	await migrateLegacyFavorites(userId)
	return favoriteModel.distinct('product', { user: userId })
}

module.exports = { migrateLegacyFavorites, getFavoriteProductIds }
