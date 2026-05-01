'use server'

import { axiosClient } from '@/http/axios'
import { authOptions } from '@/lib/auth-options'
import { generateToken } from '@/lib/generate-token'
import { actionClient } from '@/lib/safe-action'
import {
	categoryNameSchema,
	categoryUpdateSchema,
	adminDeleteReviewSchema,
	adminUpdateReviewSchema,
	idSchema,
	purchaseItemSchema,
	purchaseItemStatusSchema,
	updatePurchaseItemSchema,
	productSchema,
	buyNowSettingsSchema,
	footerSettingsSchema,
	headerSettingsSchema,
	newArrivalSettingsSchema,
	searchParamsSchema,
	updateProductSchema,
	uploadSchema,
} from '@/lib/validation'
import { ReturnActionType } from '@/types'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

type AdminCategory = { _id: string; name: string; isDefault?: boolean }
type AdminReviewItem = {
	productId: string
	productTitle: string
	reviewId: string
	userName: string
	rating: number
	comment: string
	adminReply: string
	createdAt: string
}

export const getAdminCategories = actionClient.action(async () => {
	const empty = { categories: [] as AdminCategory[] }
	try {
		const session = await getServerSession(authOptions)
		if (!session?.currentUser?._id) {
			return JSON.parse(JSON.stringify(empty)) as { categories: AdminCategory[] }
		}
		const token = await generateToken(session.currentUser._id)
		const { data } = await axiosClient.get('/api/admin/categories', {
			headers: { Authorization: `Bearer ${token}` },
		})
		return JSON.parse(JSON.stringify(data)) as { categories: AdminCategory[] }
	} catch {
		return JSON.parse(JSON.stringify(empty)) as { categories: AdminCategory[] }
	}
})

export const createAdminCategory = actionClient
	.schema(categoryNameSchema)
	.action(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.post(
			'/api/admin/categories',
			parsedInput,
			{ headers: { Authorization: `Bearer ${token}` } },
		)
		revalidatePath('/admin/products')
		return JSON.parse(JSON.stringify(data))
	})

export const updateAdminCategory = actionClient
	.schema(categoryUpdateSchema)
	.action(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.put(
			`/api/admin/categories/${parsedInput.id}`,
			{ name: parsedInput.name },
			{ headers: { Authorization: `Bearer ${token}` } },
		)
		revalidatePath('/admin/products')
		return JSON.parse(JSON.stringify(data))
	})

export const deleteAdminCategory = actionClient.schema(idSchema).action(async ({ parsedInput }) => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.delete(`/api/admin/categories/${parsedInput.id}`, {
		headers: { Authorization: `Bearer ${token}` },
	})
	revalidatePath('/admin/products')
	return JSON.parse(JSON.stringify(data))
})

type PurchaseItemsResponse = { items: Array<{ _id: string; name: string; status: 'pending' | 'approved'; createdAt: string; updatedAt: string }> }

export const getPurchaseItems = actionClient
	.schema(purchaseItemStatusSchema)
	.action<PurchaseItemsResponse>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.get('/api/admin/purchase-items', {
			headers: { Authorization: `Bearer ${token}` },
			params: parsedInput,
		})
		return JSON.parse(JSON.stringify(data))
	})

export const createPurchaseItem = actionClient
	.schema(purchaseItemSchema)
	.action(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.post('/api/admin/purchase-items', parsedInput, {
			headers: { Authorization: `Bearer ${token}` },
		})
		revalidatePath('/admin/orders')
		return JSON.parse(JSON.stringify(data))
	})

export const approvePurchaseItem = actionClient.schema(idSchema).action(async ({ parsedInput }) => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.patch(
		`/api/admin/purchase-items/${parsedInput.id}/approve`,
		{},
		{ headers: { Authorization: `Bearer ${token}` } },
	)
	revalidatePath('/admin/orders')
	revalidatePath('/admin/approved-purchases')
	return JSON.parse(JSON.stringify(data))
})

export const updatePurchaseItem = actionClient
	.schema(updatePurchaseItemSchema)
	.action(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.put(
			`/api/admin/purchase-items/${parsedInput.id}`,
			{ name: parsedInput.name },
			{ headers: { Authorization: `Bearer ${token}` } },
		)
		revalidatePath('/admin/orders')
		revalidatePath('/admin/approved-purchases')
		return JSON.parse(JSON.stringify(data))
	})

export const deletePurchaseItem = actionClient.schema(idSchema).action(async ({ parsedInput }) => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.delete(`/api/admin/purchase-items/${parsedInput.id}`, {
		headers: { Authorization: `Bearer ${token}` },
	})
	revalidatePath('/admin/orders')
	revalidatePath('/admin/approved-purchases')
	return JSON.parse(JSON.stringify(data))
})

export const getAdminReviews = actionClient.action(async () => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.get('/api/admin/product-reviews', {
		headers: { Authorization: `Bearer ${token}` },
	})
	return JSON.parse(JSON.stringify(data)) as { reviews: AdminReviewItem[] }
})

export const updateAdminReview = actionClient.schema(adminUpdateReviewSchema).action(async ({ parsedInput }) => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.put(
		`/api/admin/product-reviews/${parsedInput.productId}/${parsedInput.reviewId}`,
		{
			comment: parsedInput.comment,
			rating: parsedInput.rating,
			adminReply: parsedInput.adminReply || '',
		},
		{ headers: { Authorization: `Bearer ${token}` } },
	)
	revalidatePath('/admin/comments')
	revalidatePath(`/product/${parsedInput.productId}`)
	return JSON.parse(JSON.stringify(data))
})

export const deleteAdminReview = actionClient.schema(adminDeleteReviewSchema).action(async ({ parsedInput }) => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.delete(
		`/api/admin/product-reviews/${parsedInput.productId}/${parsedInput.reviewId}`,
		{ headers: { Authorization: `Bearer ${token}` } },
	)
	revalidatePath('/admin/comments')
	revalidatePath(`/product/${parsedInput.productId}`)
	return JSON.parse(JSON.stringify(data))
})

export const getProducts = actionClient.schema(searchParamsSchema).action<ReturnActionType>(async ({parsedInput}) => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.get('/api/admin/products', {
		headers: { Authorization: `Bearer ${token}` },
		params: parsedInput,
	})
	return JSON.parse(JSON.stringify(data))
})

type UploadResponse = {
  url: string
  key: string
}

export const uploadFile = actionClient
  .schema(uploadSchema)
  .action<UploadResponse>(async ({ parsedInput }) => {
    try {
      const session = await getServerSession(authOptions)
      const token = await generateToken(session?.currentUser?._id)

      const { data: presigned } = await axiosClient.post(
        "/api/files/upload-url",
        {
          fileName: parsedInput.fileName,
          fileType: parsedInput.fileType,
          fileSize: parsedInput.fileSize,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      await axiosClient.put(presigned.uploadUrl, parsedInput.file, {
        headers: {
          "Content-Type": parsedInput.fileType,
        },
      })

      return {
        url: presigned.fileUrl,
        key: presigned.key,
      }
    } catch (err) {
      return {
        url: "",
        key: "",
      }
    }
  })

export const createProduct = actionClient.schema(productSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.post(
		'/api/admin/create-product',
		{ ...parsedInput, price: parseFloat(parsedInput.price) },
		{ headers: { Authorization: `Bearer ${token}` } }
	)
	console.log("CREATE PRODUCT INPUT:", data)
	
	revalidatePath('/admin/products')
	return JSON.parse(JSON.stringify(data))
})

export const updateProduct = actionClient.schema(updateProductSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.put(
		`/api/admin/update-product/${parsedInput.id}`,
		{ ...parsedInput, price: parseFloat(parsedInput.price) },
		{ headers: { Authorization: `Bearer ${token}` } }
	)
	revalidatePath('/admin/products')
	return JSON.parse(JSON.stringify(data))
})

export const deleteProduct = actionClient.schema(idSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.delete(`/api/admin/delete-product/${parsedInput.id}`, {
		headers: { Authorization: `Bearer ${token}` },
	})
	revalidatePath('/admin/products')
	return JSON.parse(JSON.stringify(data))
})

export const getBuyNowSettingsAdmin = actionClient.action(async () => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.get('/api/admin/buy-now-settings', {
		headers: { Authorization: `Bearer ${token}` },
	})
	return JSON.parse(JSON.stringify(data)) as {
		targetDate: string
		image?: string
		imageKey?: string
		isTimerVisible?: boolean
		isTimerPaused?: boolean
		pausedRemainingSeconds?: number
	}
})

export const updateBuyNowSettingsAdmin = actionClient
	.schema(buyNowSettingsSchema)
	.action(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.put('/api/admin/buy-now-settings', parsedInput, {
			headers: { Authorization: `Bearer ${token}` },
		})
		revalidatePath('/admin/buy-now')
		revalidatePath('/admin/header-settings')
		revalidatePath('/')
		return JSON.parse(JSON.stringify(data))
	})

export type NewArrivalCard = { title: string; desc: string; image: string; imageKey?: string }

export const getNewArrivalSettingsAdmin = actionClient.action(async () => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.get('/api/admin/new-arrival', {
		headers: { Authorization: `Bearer ${token}` },
	})
	return JSON.parse(JSON.stringify(data)) as { cards: NewArrivalCard[]; failure?: string }
})

export const updateNewArrivalSettingsAdmin = actionClient
	.schema(newArrivalSettingsSchema)
	.action(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.put('/api/admin/new-arrival', parsedInput, {
			headers: { Authorization: `Bearer ${token}` },
		})
		revalidatePath('/admin/new-arrival')
		revalidatePath('/')
		return JSON.parse(JSON.stringify(data))
	})

export const getHeaderSettingsAdmin = actionClient.action(async () => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.get('/api/admin/header-settings', {
		headers: { Authorization: `Bearer ${token}` },
	})
	return JSON.parse(JSON.stringify(data)) as { locationLabel?: string }
})

export const updateHeaderSettingsAdmin = actionClient
	.schema(headerSettingsSchema)
	.action(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.put('/api/admin/header-settings', parsedInput, {
			headers: { Authorization: `Bearer ${token}` },
		})
		revalidatePath('/admin/header-settings')
		revalidatePath('/admin/buy-now')
		revalidatePath('/', 'layout')
		return JSON.parse(JSON.stringify(data))
	})

export const getFooterSettingsAdmin = actionClient.action(async () => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.get('/api/admin/footer-settings', {
		headers: { Authorization: `Bearer ${token}` },
	})
	return JSON.parse(JSON.stringify(data)) as {
		phonePrimary?: string
		phoneSecondary?: string
		supportHours?: string
		email?: string
		telegramUrl?: string
		maxMessengerUrl?: string
		brandBlurb?: string
	}
})

export const updateFooterSettingsAdmin = actionClient
	.schema(footerSettingsSchema)
	.action(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.put('/api/admin/footer-settings', parsedInput, {
			headers: { Authorization: `Bearer ${token}` },
		})
		revalidatePath('/admin/buy-now')
		revalidatePath('/', 'layout')
		return JSON.parse(JSON.stringify(data))
	})
