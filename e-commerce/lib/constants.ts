import { Barcode, Banknote, Heart, MapPin, MessageSquare, Settings2, ShoppingCart, Sparkles, User } from 'lucide-react'

export const products = [
	{
		_id: '1',
		title: 'Product 1',
		description: 'Description 1',
		image: '/1.webp',
		category: 'Category 1',
		price: 100000,
	},
	{
		_id: '2',
		title: 'Product 2',
		description: 'Description 2',
		image: '/2.webp',
		category: 'Category 2',
		price: 200000,
	},
	{
		_id: '3',
		title: 'Product 3',
		description: 'Description 3',
		image: '/3.webp',
		category: 'Category 3',
		price: 300000,
	},
]

export const categories = ['All', 'Shoes', 'T-Shirts', 'Clothes', 'Books', 'Accessories', 'Universal']

export const dashboardSidebar = [
	{ name: 'Personal Information', route: '/dashboard', icon: User },
	{ name: 'Watch list', route: '/dashboard/watch-list', icon: Heart },
	{ name: 'Settings', route: '/dashboard/settings', icon: Settings2 },
]

export const adminSidebar = [
	{
		name: { ru: 'Товары', en: 'Products', uz: 'Mahsulotlar' },
		icon: Barcode,
		route: '/admin/products',
	},
	{
		name: { ru: 'Новые поступления', en: 'New arrivals', uz: 'Yangi kelganlar' },
		icon: Sparkles,
		route: '/admin/new-arrival',
	},
	{
		name: { ru: 'Настройки хедера и Buy now', en: 'Header & Buy now settings', uz: 'Header va Buy now sozlamalari' },
		icon: MapPin,
		route: '/admin/buy-now',
	},
	{
		name: { ru: 'Новые заявки на закупку', en: 'New purchase requests', uz: 'Yangi xarid so‘rovlari' },
		icon: ShoppingCart,
		route: '/admin/orders',
	},
	{
		name: { ru: 'Подтвержденные закупки', en: 'Approved purchases', uz: 'Tasdiqlangan xaridlar' },
		icon: Banknote,
		route: '/admin/approved-purchases',
	},
	{
		name: { ru: 'Комментарии', en: 'Comments', uz: 'Kommentariyalar' },
		icon: MessageSquare,
		route: '/admin/comments',
	},
]