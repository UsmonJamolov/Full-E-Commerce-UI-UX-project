import * as z from "zod";

export const loginSchema = z.object({
  phone: z.string().min(9, "Telefon raqam noto‘g‘ri"),
  password: z.string().min(4, "Parol kamida 4 ta bo‘lsin"),
});

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

export const registerSchema = z.object({
  name: z.string().min(2, "Ism kamida 2 ta harf bo‘lishi kerak"),
  phone: z.string().min(9, "Telefon raqam noto‘g‘ri"),
  password: z.string().min(6, "Parol kamida 6 ta bo‘lishi kerak"),
});

export const fullNameSchema = z.object({
	fullName: z.string().min(3, { message: 'Full name must be at least 3 characters' }),
})

export const sendOtpSchema = z.object({
  name: z.string().optional(),
  phone: z.string().min(9, "Telefon raqam noto‘g‘ri"),
  password: z.string().optional(),
  type: z.enum(["register", "login"]),
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
		oldPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
		newPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
		confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		message: 'Passwords do not match',
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

export const footerSettingsSchema = z.object({
	phonePrimary: z.string().min(7).max(30),
	phoneSecondary: z.string().min(7).max(30),
	supportHours: z.string().min(3).max(80),
	email: z.string().email().max(120),
	telegramUrl: z.string().url().max(240),
	maxMessengerUrl: z.string().url().max(240),
	brandBlurb: z.string().min(10).max(500),
})