import { Barcode, Banknote, Heart, MessageSquare, PlusSquare, Settings2, ShoppingCart, Timer, User } from 'lucide-react'

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
	{ name: 'Products', icon: Barcode, route: '/admin/products' },
	{ name: "Qo'shimchalar", icon: PlusSquare, route: '/admin/additions' },
	{ name: 'Buy now', icon: Timer, route: '/admin/buy-now' },
	{ name: 'Yangi sotib olinadigan tovarlar', icon: ShoppingCart, route: '/admin/orders' },
	{ name: 'Sotib olishga tasdiqlanganlar', icon: Banknote, route: '/admin/approved-purchases' },
	{ name: 'Kommentariyalar', icon: MessageSquare, route: '/admin/comments' },
]