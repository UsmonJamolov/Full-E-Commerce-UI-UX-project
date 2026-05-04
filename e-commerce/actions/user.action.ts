'use server'

import { axiosClient } from '@/http/axios'
import { authOptions } from '@/lib/auth-options'
import { generateToken } from '@/lib/generate-token'
import { actionClient } from '@/lib/safe-action'
import { idSchema, passwordSchema, productReviewSchema, searchParamsSchema, updateUserSchema } from '@/lib/validation'
import { IProduct, ReturnActionType } from '@/types'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export const getProducts = actionClient.schema(searchParamsSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	try {
		const { data } = await axiosClient.get('/api/user/products', {
			params: parsedInput,
		})
		return JSON.parse(JSON.stringify(data))
	} catch {
		const params = new URLSearchParams()
		for (const [key, value] of Object.entries(parsedInput || {})) {
			if (typeof value === 'string') params.set(key, value)
		}
		const bases = [
			'http://localhost:8080',
			'http://127.0.0.1:8080',
			'http://localhost:5000',
			'http://127.0.0.1:5000',
		]
		for (const base of bases) {
			try {
				const res = await fetch(`${base}/api/user/products?${params.toString()}`, { cache: 'no-store' })
				if (!res.ok) continue
				const data = await res.json()
				return JSON.parse(JSON.stringify(data)) as ReturnActionType
			} catch {
				/* try next base */
			}
		}
		return JSON.parse(JSON.stringify({ products: [], isNext: false })) as ReturnActionType
	}
})

export const getProduct = actionClient.schema(idSchema).action<IProduct>(async ({ parsedInput }) => {
	try {
		const { data } = await axiosClient.get(`/api/user/product/${parsedInput.id}`)
		return JSON.parse(JSON.stringify(data))
	} catch {
		return JSON.parse(JSON.stringify({})) as IProduct
	}
})

export const getStatistics = actionClient.action<ReturnActionType>(async () => {
	const empty = { statistics: { totalFavourites: 0 }, message: '', failure: '' }
	const session = await getServerSession(authOptions)
	if (!session?.currentUser?._id) {
		return JSON.parse(JSON.stringify(empty)) as ReturnActionType
	}
	try {
		const token = await generateToken(session.currentUser._id)
		const { data } = await axiosClient.get('/api/user/statistics', {
			headers: { Authorization: `Bearer ${token}` },
		})
		const payload = JSON.parse(JSON.stringify(data)) as {
			statistics?: { totalFavorites?: number; totalFavourites?: number }
			failure?: string
			message?: string
		}
		const raw = payload.statistics
		const totalFavourites = raw?.totalFavorites ?? raw?.totalFavourites ?? 0
		return JSON.parse(
			JSON.stringify({
				...payload,
				statistics: { totalFavourites },
			})
		) as ReturnActionType
	} catch {
		return JSON.parse(JSON.stringify(empty)) as ReturnActionType
	}
})

export const getFavorurites = actionClient.schema(searchParamsSchema).action<ReturnActionType>(async ({parsedInput}) => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.get('/api/user/favorites', {
		headers: { Authorization: `Bearer ${token}` },
		params: parsedInput,
	})
	return JSON.parse(JSON.stringify(data))
})

export const addFavorite = actionClient.schema(idSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const session = await getServerSession(authOptions)
	if (!session?.currentUser) return { failure: 'You must be logged in to add a favorite' }
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.post(
		'/api/user/add-favorite',
		{ productId: parsedInput.id },
		{ headers: { Authorization: `Bearer ${token}` } }
	)
	revalidatePath('/', 'layout')
	revalidatePath('/dashboard/watch-list')
	return JSON.parse(JSON.stringify(data))
})

export const updateUser = actionClient.schema(updateUserSchema).action<ReturnActionType>(async ({parsedInput}) => {
	const session = await getServerSession(authOptions)
	if (!session?.currentUser) return {failure: 'You must be logged in to update your profile'}
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.put('/api/user/update-profile', parsedInput, {
		headers: { Authorization: `Bearer ${token}` },
	})
	revalidatePath('/dashboard')
	return JSON.parse(JSON.stringify(data))
})

export const updatePassword = actionClient.schema(passwordSchema).action<ReturnActionType>(async ({parsedInput}) => {
	const session = await getServerSession(authOptions)
	if (!session?.currentUser) return {failure: 'You must be loggen in to update your password'}
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.put('/api/user/update-password', parsedInput, {
		headers: { Authorization: `Bearer ${token}` },
	})
	return JSON.parse(JSON.stringify(data))
})

export const deleteFavorite = actionClient.schema(idSchema).action<ReturnActionType>(async ({parsedInput}) => {
	const session = await getServerSession(authOptions)
	if (!session?.currentUser) return {failure: 'You must be logged in to delete a favorite'}
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.delete(`/api/user/delete-favorite/${parsedInput.id}`, {
		headers: { Authorization: `Bearer ${token}` },
	})
	revalidatePath('/', 'layout')
	revalidatePath('/dashboard/watch-list')
	return JSON.parse(JSON.stringify(data))
})

export const addProductReview = actionClient.schema(productReviewSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const session = await getServerSession(authOptions)
	if (!session?.currentUser) return { failure: 'You must be logged in to leave a review' }
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.post(
		`/api/user/product/${parsedInput.id}/review`,
		{ rating: parsedInput.rating, comment: parsedInput.comment },
		{ headers: { Authorization: `Bearer ${token}` } },
	)
	revalidatePath(`/product/${parsedInput.id}`)
	return JSON.parse(JSON.stringify(data))
})

export const getBuyNowSettings = actionClient.action(async () => {
	try {
		const { data } = await axiosClient.get('/api/user/buy-now-settings')
		return JSON.parse(JSON.stringify(data)) as { targetDate: string; image?: string; imageKey?: string }
	} catch {
		return {
			targetDate: new Date(Date.now() + (5 * 86400 + 23 * 3600 + 59 * 60 + 35) * 1000).toISOString(),
			image: '/images/krosovkalar1.png',
			imageKey: '',
		}
	}
})