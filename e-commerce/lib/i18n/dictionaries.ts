export type Locale = 'en' | 'ru' | 'uz'

export type HomeSliderSlide = {
	title: string
	text: string
	alt: string
	image: string
	link: string
}

export const locales: Locale[] = ['en', 'ru', 'uz']

export function parseLocale(value: string | undefined): Locale {
	if (value === 'ru' || value === 'uz' || value === 'en') return value
	return 'en'
}

export type Dictionary = {
	header: {
		saleLine: string
		shopNow: string
		featured: string
		newArrival: string
		home: string
		contacts: string
		about: string
		signIn: string
		locationAria: string
		menu: string
	}
	home: {
		sidebarCategories: string[]
		flashSalesTitle: string
		bestSellingTitle: string
		kidsFootwearTitle: string
		sliderSlides: HomeSliderSlide[]
		ourProducts: string
		exploreProductsTitle: string
		categoriesLabel: string
		browseByCategory: string
		noProducts: string
		viewAllProducts: string
		buyNowTag: string
		buyNowTitle: string
		buyNowCta: string
		shopNow: string
		days: string
		hours: string
		minutes: string
		seconds: string
		sliderCta: string
	}
	about: {
		title: string
		lead: string
		body: string
	}
	contacts: {
		title: string
		lead: string
		phone: string
		email: string
		address: string
	}
	footer: {
		homeAria: string
		playAlt: string
		appStoreAlt: string
		brandBlurb: string
		company: string
		useful: string
		contact: string
		about: string
		contacts: string
		shop: string
		partner: string
		promotions: string
		gifts: string
		faq: string
		delivery: string
		payment: string
		returns: string
		sizes: string
		bestsellers: string
		supportHours: string
		storeAddresses: string
		chat: string
		telegram: string
		maxMessenger: string
		copyright: string
		privacy: string
		terms: string
		sitemap: string
		disclaimer: string
	}
}

const en: Dictionary = {
	header: {
		saleLine: 'Summer Sale — OFF 50%!',
		shopNow: 'ShopNow',
		featured: 'Featured',
		newArrival: 'New Arrival',
		home: 'Home',
		contacts: 'Contacts',
		about: 'About Us',
		signIn: 'Sign in',
		locationAria: 'Store location',
		menu: 'Menu',
	},
	home: {
		sidebarCategories: [
			"Women's fashion",
			"Men's fashion",
			"Children's fashion",
			'Umbrellas',
			'Bags',
			'Backpacks',
			'Clothes',
		],
		flashSalesTitle: "Men's footwear",
		bestSellingTitle: "Women's footwear",
		kidsFootwearTitle: "Children's footwear",
		sliderSlides: [
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
		],
		ourProducts: 'Our Products',
		exploreProductsTitle: 'Explore Our Products',
		categoriesLabel: 'Categories',
		browseByCategory: 'Browse By Category',
		noProducts: 'No products',
		viewAllProducts: 'View All Products',
		buyNowTag: "Today's choice",
		buyNowTitle: 'Quality and affordable product',
		buyNowCta: 'Buy Now!',
		shopNow: 'Shop Now',
		days: 'Days',
		hours: 'Hours',
		minutes: 'Minutes',
		seconds: 'Seconds',
		sliderCta: 'Buy now',
	},
	about: {
		title: 'About Us',
		lead: 'Exclusive online store offers quality products at fair prices.',
		body: 'Our goal is to provide reliable service, fast delivery, and a modern shopping experience.',
	},
	contacts: {
		title: 'Contacts',
		lead: 'Use the following details to contact us.',
		phone: 'Phone',
		email: 'Email',
		address: 'Address',
	},
	footer: {
		homeAria: 'Exclusive home',
		playAlt: 'Get it on Google Play',
		appStoreAlt: 'Download on the App Store',
		brandBlurb:
			'Exclusive — quality fashion & footwear. Join thousands of happy customers shopping with us every day.',
		company: 'Company',
		useful: 'Useful information',
		contact: 'Contact us',
		about: 'About us',
		contacts: 'Contacts',
		shop: 'Shop',
		partner: 'Become a partner',
		promotions: 'Promotions',
		gifts: 'Gift ideas',
		faq: 'FAQ',
		delivery: 'Delivery',
		payment: 'Payment',
		returns: 'Returns',
		sizes: 'Size guide',
		bestsellers: 'Bestsellers',
		supportHours: 'Daily support: 10:00 – 22:00',
		storeAddresses: 'Store addresses',
		chat: 'Chat',
		telegram: 'Telegram',
		maxMessenger: 'Max',
		copyright: 'Exclusive online store. All rights reserved.',
		privacy: 'Privacy Policy',
		terms: 'Terms of use',
		sitemap: 'Sitemap',
		disclaimer: 'Prices and availability are subject to change. Product images are for illustration only.',
	},
}

const ru: Dictionary = {
	header: {
		saleLine: 'Летняя распродажа — скидка 50%!',
		shopNow: 'Купить сейчас',
		featured: 'Рекомендуем',
		newArrival: 'Новинки',
		home: 'Главная',
		contacts: 'Контакты',
		about: 'О нас',
		signIn: 'Войти',
		locationAria: 'Адрес магазина',
		menu: 'Меню',
	},
	home: {
		sidebarCategories: [
			'Женская мода',
			'Мужская мода',
			'Детская мода',
			'Зонты',
			'Сумки',
			'Рюкзаки',
			'Одежда',
		],
		flashSalesTitle: 'Мужская обувь',
		bestSellingTitle: 'Женская обувь',
		kidsFootwearTitle: 'Детская обувь',
		sliderSlides: [
			{
				title: 'Кроссовки, лоферы, ботинки',
				text: 'Мужская и женская обувь от 900 рублей.',
				alt: 'Кроссовки, лоферы, ботинки',
				image: '/images/kv banner.png',
				link: '/explore-products',
			},
			{
				title: 'Автоматические и полуавтоматические зонты',
				text: 'От 700 рублей.',
				alt: 'Зонты',
				image: '/images/zontik banner.png',
				link: '/explore-products',
			},
			{
				title: 'Детская обувь',
				text: 'От 600 рублей.',
				alt: 'Детская обувь',
				image: '/images/dets-kros banner.png',
				link: '/shoes-products?targetGroup=Bola',
			},
			{
				title: 'Сумки и рюкзаки',
				text: 'Сумки и рюкзаки по 800 рублей.',
				alt: 'Сумки и рюкзаки',
				image: '/images/sumka, ryukzaklar.png',
				link: '/explore-products',
			},
		],
		ourProducts: 'Наши товары',
		exploreProductsTitle: 'Изучите наши товары',
		categoriesLabel: 'Категории',
		browseByCategory: 'Выберите категорию',
		noProducts: 'Товаров нет',
		viewAllProducts: 'Смотреть все товары',
		buyNowTag: 'Выбор дня',
		buyNowTitle: 'Качественный и доступный товар',
		buyNowCta: 'Купить сейчас!',
		shopNow: 'Купить сейчас',
		days: 'Дней',
		hours: 'Часов',
		minutes: 'Минут',
		seconds: 'Секунд',
		sliderCta: 'Купить сейчас',
	},
	about: {
		title: 'О нас',
		lead: 'Интернет-магазин Exclusive предлагает качественные товары по доступным ценам.',
		body: 'Наша цель - предоставить надежный сервис, быструю доставку и современный опыт покупок.',
	},
	contacts: {
		title: 'Контакты',
		lead: 'Для связи с нами используйте следующие данные.',
		phone: 'Телефон',
		email: 'Email',
		address: 'Адрес',
	},
	footer: {
		homeAria: 'Exclusive — главная',
		playAlt: 'Google Play',
		appStoreAlt: 'App Store',
		brandBlurb:
			'Exclusive — качественная мода и обувь. Тысячи довольных покупателей каждый день.',
		company: 'Компания',
		useful: 'Полезная информация',
		contact: 'Связаться с нами',
		about: 'О нас',
		contacts: 'Контакты',
		shop: 'Магазин',
		partner: 'Стать партнёром',
		promotions: 'Акции',
		gifts: 'Подарочные идеи',
		faq: 'Частые вопросы',
		delivery: 'Доставка',
		payment: 'Оплата',
		returns: 'Возврат',
		sizes: 'Размеры',
		bestsellers: 'Хиты продаж',
		supportHours: 'Поддержка: 10:00 – 22:00',
		storeAddresses: 'Адреса магазинов',
		chat: 'Чат',
		telegram: 'Telegram',
		maxMessenger: 'Max',
		copyright: 'Интернет-магазин Exclusive. Все права защищены.',
		privacy: 'Политика конфиденциальности',
		terms: 'Оферта',
		sitemap: 'Карта сайта',
		disclaimer:
			'Цены и наличие могут меняться. Изображения товаров носят иллюстративный характер.',
	},
}

const uz: Dictionary = {
	header: {
		saleLine: 'Yozgi chegirma — 50% gacha!',
		shopNow: 'Xarid qilish',
		featured: 'Tavsiya etiladi',
		newArrival: 'Yangi kelganlar',
		home: 'Bosh sahifa',
		contacts: 'Aloqa',
		about: 'Biz haqimizda',
		signIn: 'Kirish',
		locationAria: 'Do‘kon manzili',
		menu: 'Menyu',
	},
	home: {
		sidebarCategories: [
			'Ayollar modasi',
			'Erkaklar modasi',
			'Bolalar modasi',
			'Soyabonlar',
			'Sumkalar',
			'Ryukzaklar',
			'Kiyimlar',
		],
		flashSalesTitle: 'Erkaklar oyoq kiyimi',
		bestSellingTitle: 'Ayollar oyoq kiyimi',
		kidsFootwearTitle: 'Bolalar oyoq kiyimi',
		sliderSlides: [
			{
				title: 'Krossovkalar, loferlar, etiklar',
				text: 'Erkak va ayollar oyoq kiyimi 900 rubl dan.',
				alt: 'Krossovkalar, loferlar, etiklar',
				image: '/images/kv banner.png',
				link: '/explore-products',
			},
			{
				title: 'Avtomatik va yarim avtomatik soyabonlar',
				text: '700 rubl dan.',
				alt: 'Soyabonlar',
				image: '/images/zontik banner.png',
				link: '/explore-products',
			},
			{
				title: 'Bolalar oyoq kiyimi',
				text: '600 rubl dan.',
				alt: 'Bolalar oyoq kiyimi',
				image: '/images/dets-kros banner.png',
				link: '/shoes-products?targetGroup=Bola',
			},
			{
				title: 'Sumkalar va ryukzaklar',
				text: 'Sumkalar va ryukzaklar 800 rubl dan.',
				alt: 'Sumkalar va ryukzaklar',
				image: '/images/sumka, ryukzaklar.png',
				link: '/explore-products',
			},
		],
		ourProducts: 'Mahsulotlarimiz',
		exploreProductsTitle: 'Mahsulotlarni ko`rib chiqing',
		categoriesLabel: 'Kategoriyalar',
		browseByCategory: 'Kategoriya bo`yicha tanlang',
		noProducts: 'Mahsulotlar yo`q',
		viewAllProducts: 'Barcha mahsulotlar',
		buyNowTag: "Bugungi so`z",
		buyNowTitle: 'Sifatli va arzon mahsulot',
		buyNowCta: 'Buy Now!',
		shopNow: 'Xarid qilish',
		days: 'Kun',
		hours: 'Soat',
		minutes: 'Daqiqa',
		seconds: 'Soniya',
		sliderCta: 'Xarid qilish',
	},
	about: {
		title: 'Biz haqimizda',
		lead: "Exclusive onlayn do`koni sifatli mahsulotlarni qulay narxlarda taqdim etadi.",
		body: 'Maqsadimiz foydalanuvchilarga ishonchli servis, tez yetkazib berish va zamonaviy xarid tajribasini taqdim etishdir.',
	},
	contacts: {
		title: 'Aloqa',
		lead: "Biz bilan bog`lanish uchun quyidagi ma`lumotlardan foydalaning.",
		phone: 'Telefon',
		email: 'Email',
		address: 'Manzil',
	},
	footer: {
		homeAria: 'Exclusive — bosh sahifa',
		playAlt: 'Google Play',
		appStoreAlt: 'App Store',
		brandBlurb:
			'Exclusive — sifatli moda va poyabzal. Har kuni minglab mamnun mijozlar.',
		company: 'Kompaniya',
		useful: 'Foydali ma’lumot',
		contact: 'Bog‘lanish',
		about: 'Biz haqimizda',
		contacts: 'Aloqa',
		shop: 'Do‘kon',
		partner: 'Hamkor bo‘lish',
		promotions: 'Aksiyalar',
		gifts: 'Sovg‘a g‘oyalari',
		faq: 'Savol-javob',
		delivery: 'Yetkazib berish',
		payment: "To'lov",
		returns: 'Qaytarish',
		sizes: "O'lcham bo'yicha",
		bestsellers: 'Ommabop mahsulotlar',
		supportHours: 'Qo‘llab-quvvatlash: 10:00 – 22:00',
		storeAddresses: 'Do‘kon manzillari',
		chat: 'Chat',
		telegram: 'Telegram',
		maxMessenger: 'Max',
		copyright: 'Exclusive internet-do‘koni. Barcha huquqlar himoyalangan.',
		privacy: 'Maxfiylik siyosati',
		terms: 'Foydalanish shartlari',
		sitemap: 'Sayt xaritasi',
		disclaimer:
			'Narxlar va mavjudlik o‘zgarishi mumkin. Mahsulot rasmlari namoyish xarakterida.',
	},
}

const map: Record<Locale, Dictionary> = { en, ru, uz }

export function getDictionary(locale: Locale): Dictionary {
	return map[locale] ?? en
}
