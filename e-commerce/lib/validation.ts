import * as z from "zod";

/** Ro‘yxatdan o‘tish / OTP / yangi parol — server `passwordPolicy.js` bilan bir xil qoidalar. */
export const registerPasswordSchema = z.string().min(8, 'Parol kamida 8 ta belgi bo‘lsin')
	.max(72, 'Parol 72 tadan oshmasin')
	.regex(/[A-Za-zА-Яа-яЁё]/, 'Parolda kamida bitta harf bo‘lsin')
	.regex(/\d/, 'Parolda kamida bitta raqam bo‘lsin')

export const loginSchema = z
	.object({
		login: z.string().trim().min(1, 'Telefon yoki email kiriting'),
		password: z.string().min(1, 'Parolni kiriting'),
	})
	.superRefine((data, ctx) => {
		const v = data.login.trim()
		if (v.includes('@')) {
			if (!z.string().email().safeParse(v).success) {
				ctx.addIssue({ code: 'custom', message: 'Email noto‘g‘ri', path: ['login'] })
			}
		} else if (v.replace(/\D/g, '').length < 9) {
			ctx.addIssue({ code: 'custom', message: 'Telefon raqam noto‘g‘ri', path: ['login'] })
		}
	})

export const verifyOtpSchema = z.object({
  phone: z
    .string()
    .min(9, 'Telefon raqam kiriting')
    .max(20, 'Telefon raqam noto‘g‘ri'),

  otp: z
    .string()
    .min(6, 'OTP noto‘g‘ri')
    .max(6, 'OTP noto‘g‘ri'),
})

export const otpSchema = z.object({
	otp: z.string().length(6, { message: 'OTP must be 6 characters' }),
})

export const registerEmailSchema = z
	.string()
	.min(1, 'Email kiriting')
	.email('Email noto‘g‘ri')
	.transform(s => s.trim().toLowerCase())

/** Email yoki telefon + parol (OTPsiz). */
export const registerSchema = z
	.object({
		name: z.string().min(2, "Ism kamida 2 ta harf bo‘lishi kerak"),
		login: z.string().trim().min(1, 'Email yoki telefon kiriting'),
		password: registerPasswordSchema,
		confirmPassword: z.string().min(1, 'Parolni tasdiqlang'),
	})
	.superRefine((data, ctx) => {
		const v = data.login.trim()
		if (v.includes('@')) {
			if (!z.string().email().safeParse(v).success) {
				ctx.addIssue({ code: 'custom', message: 'Email noto‘g‘ri', path: ['login'] })
			}
		} else if (v.replace(/\D/g, '').length < 9) {
			ctx.addIssue({ code: 'custom', message: 'Telefon raqam noto‘g‘ri', path: ['login'] })
		}
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Parollar mos emas',
		path: ['confirmPassword'],
	})

export const fullNameSchema = z.object({
	fullName: z.string().min(3, { message: 'Full name must be at least 3 characters' }),
})

export const sendOtpSchema = z
	.object({
		name: z.string().optional(),
		phone: z.string().min(9, "Telefon raqam noto‘g‘ri"),
		password: z.string().optional(),
		email: z.string().optional(),
		type: z.enum(['register', 'login']),
	})
	.superRefine((data, ctx) => {
		if (data.type === 'register') {
			const name = data.name?.trim() ?? ''
			if (name.length < 2) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Ism kamida 2 ta harf bo‘lishi kerak",
					path: ['name'],
				})
			}
		}
	})

export const phoneSchema = z.object({
  phone: z
    .string()
    .min(9, 'Telefon raqam kiriting')
    .max(20, 'Telefon raqam noto‘g‘ri'),
})

export const productSchema = z.object({
	title: z.string().min(3, { message: 'Name must be at least 3 characters' }),
	price: z.string(),
	description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
	category: z.string(),
	targetGroup: z.enum(['Erkak', 'Ayol', 'Bola']),
	image: z.string(),
	imageKey: z.string(),
	isNew: z.boolean().optional(),
})

export const uploadSchema = z.object({
  file: z.any(),
  fileName: z.string(),
  fileType: z.string(),
  fileSize: z.number(),
})

export const updateProductSchema = z.object({ id: z.string() }).merge(productSchema)

export const idSchema = z.object({ id: z.string() })

export const categoryNameSchema = z.object({
	name: z.string().min(1, 'Nom kiriting').max(80).trim(),
})

export const categoryUpdateSchema = z.object({
	id: z.string(),
	name: z.string().min(1, 'Nom kiriting').max(80).trim(),
})

export const purchaseItemSchema = z.object({
	name: z.string().min(2, 'Tovar nomi kamida 2 harf bo‘lsin').max(120),
})

export const purchaseItemStatusSchema = z.object({
	status: z.enum(['pending', 'approved']).optional(),
})

export const updatePurchaseItemSchema = z.object({
	id: z.string(),
	name: z.string().min(2, 'Tovar nomi kamida 2 harf bo‘lsin').max(120),
})

export const productReviewSchema = z.object({
	id: z.string(),
	rating: z.number().min(1).max(5),
	comment: z.string().min(2, 'Izoh juda qisqa').max(500),
})

export const adminUpdateReviewSchema = z.object({
	productId: z.string(),
	reviewId: z.string(),
	comment: z.string().min(2).max(500),
	rating: z.number().min(1).max(5),
	adminReply: z.string().max(500).optional(),
})

export const adminDeleteReviewSchema = z.object({
	productId: z.string(),
	reviewId: z.string(),
})

export const passwordSchema = z
	.object({
		oldPassword: z.string().min(1, { message: 'Joriy parolni kiriting' }),
		newPassword: registerPasswordSchema,
		confirmPassword: z.string().min(1, { message: 'Parolni tasdiqlang' }),
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		message: 'Parollar mos emas',
		path: ['confirmPassword'],
	})

export const searchParamsSchema = z.object({
	searchQuery: z.string().optional(),
	filter: z.string().optional(),
	category: z.string().optional(),
	targetGroup: z.string().optional(),
	page: z.string().default('1'),
	pageSize: z.string().default('6'),
})

export const updateUserSchema = z.object({
	fullName: z.string().optional(),
	/** Bo‘sh qator — emailni olib tashlash */
	email: z.union([z.literal(''), z.string().trim().email('Email noto‘g‘ri')]).optional(),
	avatar: z.string().optional(),
	avatarKey: z.string().optional(),
	isDeleted: z.boolean().optional(),
	deletedAt: z.date().optional(),
})

export const updateStatusSchema = z.object({ status: z.string() }).merge(idSchema)

export const buyNowSettingsSchema = z.object({
	targetDate: z.string().optional(),
	image: z.string().optional(),
	imageKey: z.string().optional(),
	isTimerVisible: z.boolean().optional(),
	isTimerPaused: z.boolean().optional(),
})

export const newArrivalCardSchema = z.object({
	title: z.string().min(1, 'Sarlavha kiriting').max(120),
	desc: z.string().min(1, 'Tavsif kiriting').max(400),
	image: z.string().min(1, 'Rasm URL yoki yuklash kerak'),
	imageKey: z.string().optional(),
})

export const newArrivalSettingsSchema = z.object({
	cards: z.array(newArrivalCardSchema).length(4),
})

export const headerSettingsSchema = z.object({
	locationLabel: z.string().min(1, 'Joylashuv kiriting').max(120),
})

export const homeSliderSlideSchema = z.object({
	title: z.string().min(1, 'Заголовок').max(200),
	text: z.string().min(1, 'Текст').max(400),
	alt: z.string().max(200).optional(),
	image: z.string().min(1, 'Изображение').max(2000),
	link: z.string().min(1, 'Ссылка').max(500),
})

export const homeSliderSettingsSchema = z.object({
	slides: z.array(homeSliderSlideSchema).length(4),
})

export const footerSettingsSchema = z.object({
	phonePrimary: z.string().min(7).max(30),
	phoneSecondary: z.string().min(7).max(30),
	supportHours: z.string().min(3).max(80),
	email: z.string().email().max(120),
	telegramUrl: z.string().url().max(240),
	maxMessengerUrl: z.string().url().max(240),
	brandBlurb: z.string().min(10).max(500),
})