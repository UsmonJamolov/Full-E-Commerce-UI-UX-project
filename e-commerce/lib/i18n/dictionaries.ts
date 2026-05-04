export type Locale = 'en' | 'ru' | 'uz'

export type HomeSliderSlide = {
	title: string
	text: string
	alt: string
	image: string
	link: string
}

export type NewArrivalFallbackCard = {
	title: string
	desc: string
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
		userMenuLabel: string
		userMenuAdmin: string
		userMenuDashboard: string
		userMenuLogout: string
		logoutDialogTitle: string
		logoutDialogDescription: string
		logoutDialogCancel: string
		logoutDialogContinue: string
	}
	home: {
		sidebarCategories: string[]
		/** Har bir sidebar qatori uchun havola (tartib `sidebarCategories` bilan bir xil). */
		sidebarCategoryHrefs: string[]
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
		/** Standart novinki kartalari (rasm yo‘llari bilan mos). */
		newArrivalFallback: [
			NewArrivalFallbackCard,
			NewArrivalFallbackCard,
			NewArrivalFallbackCard,
			NewArrivalFallbackCard,
		]
	}
	about: {
		title: string
		lead: string
		body: string
	}
	contacts: {
		heroEyebrow: string
		heroHeading: string
		heroIntro: string
		perk1Title: string
		perk1Body: string
		perk2Title: string
		perk2Body: string
		perk3Title: string
		perk3Body: string
		fieldName: string
		fieldEmail: string
		fieldSubject: string
		fieldMessage: string
		phName: string
		phEmail: string
		phSubject: string
		phMessage: string
		submit: string
		formNote: string
		toastContactSent: string
		toastContactError: string
		toastContactMailFallback: string
		infoEyebrow: string
		infoHeading: string
		lblAddress: string
		lblPhone: string
		lblEmail: string
		lblHours: string
		addressLine: string
		hoursLine: string
		showroomAlt: string
		storeOpenLabel: string
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
		mapTitle: string
		mapAria: string
		mapOpenInMaps: string
		chat: string
		telegram: string
		maxMessenger: string
		copyright: string
		privacy: string
		terms: string
		sitemap: string
		disclaimer: string
	}
	productCard: {
		wishlistAria: string
		quickViewAria: string
		newBadge: string
		addToCart: string
		favoriteAdded: string
		favoriteRemoved: string
		genericError: string
	}
	auth: {
		otp: {
			/** OTP SMS yuborilmaganda (provayder/batafsil server logida). */
			toastSmsSendFailed: string
		},
		signIn: {
			title: string
			subtitle: string
			loginLabel: string
			loginPlaceholder: string
			passwordLabel: string
			passwordPlaceholder: string
			submit: string
			submitting: string
			signUpLink: string
			loading: string
			toastEnterCredentials: string
			toastLoginInvalid: string
			toastWrongPassword: string
			toastUserNotFound: string
			toastSuccess: string
			toastAccountDeleted: string
			toastLoginFailed: string
		},
		signUp: {
			title: string
			subtitle: string
			nameLabel: string
			namePlaceholder: string
			loginLabel: string
			loginPlaceholder: string
			passwordLabel: string
			passwordPlaceholder: string
			confirmLabel: string
			confirmPlaceholder: string
			submit: string
			submitting: string
			signInLink: string
			loading: string
			toastPasswordMismatch: string
			toastSuccess: string
			toastRegisterFailed: string
		}
	}
	filter: {
		searchPlaceholder: string
		filterPlaceholder: string
		newest: string
		oldest: string
		categoryPlaceholder: string
		allCategories: string
	}
	/** Header overlay search — matnlar locale bo‘yicha. */
	searchPanel: {
		placeholder: string
		close: string
		/** Eng ko‘p qidirilgan so‘rovlar (faqat brauzerda jamlangan statistikadan). */
		popularHeading: string
		categoriesHeading: string
		categoryMen: string
		categoryWomen: string
		categoryKids: string
		noResults: string
		viewAllResults: string
	}
	dashboard: {
		sidebarTitle: string
		navPersonal: string
		navWatchList: string
		navSettings: string
		personalInfoPageTitle: string
		fullName: string
		email: string
		emailNotProvided: string
		emailPlaceholder: string
		emailUpdated: string
		avatarUpdated: string
		fullNameUpdated: string
		fullNamePlaceholder: string
		submit: string
		genericError: string
		watchListPageTitle: string
		watchListEmpty: string
		watchListRemoved: string
		settingsDangerZone: string
		settingsDeleteAccount: string
		settingsDeleteDesc: string
		settingsDeleteButton: string
		settingsAlertTitle: string
		settingsAlertDescription: string
		settingsCancel: string
		settingsContinue: string
		settingsAccountDeleted: string
		settingsPasswordUpdated: string
		oldPassword: string
		newPassword: string
		confirmPassword: string
		ordersTitle: string
		ordersCaption: string
		colPrice: string
		colStatus: string
		colProduct: string
		colOrderTime: string
		colUpdatedTime: string
		statusPaid: string
		paymentsTitle: string
		paymentsCaption: string
		paymentsColProduct: string
		paymentsColProvider: string
		paymentsColStatus: string
		paymentsColPrice: string
		paymentsProviderClick: string
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
		userMenuLabel: 'My account',
		userMenuAdmin: 'Admin',
		userMenuDashboard: 'Dashboard',
		userMenuLogout: 'Log out',
		logoutDialogTitle: 'Log out?',
		logoutDialogDescription: 'You will be signed out of the store.',
		logoutDialogCancel: 'Cancel',
		logoutDialogContinue: 'Log out',
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
		sidebarCategoryHrefs: [
			'/women-products',
			'/men-products',
			'/children-products',
			'/umbrellas-products',
			'/bags-products',
			'/backpacks-products',
			'/clothes-products',
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
		newArrivalFallback: [
			{
				title: 'PlayStation 5',
				desc: 'Black and white PS5 edition on sale.',
			},
			{
				title: "Women's collections",
				desc: 'Curated looks for every day.',
			},
			{
				title: 'Speakers',
				desc: 'Wireless speakers for your space.',
			},
			{
				title: 'Perfume',
				desc: 'Signature scents and bestsellers.',
			},
		],
	},
	about: {
		title: 'About Us',
		lead: 'Our online store offers quality products at fair prices.',
		body: 'Our goal is to provide reliable service, fast delivery, and a modern shopping experience.',
	},
	contacts: {
		heroEyebrow: 'Contact us',
		heroHeading: "We'd love to hear from you",
		heroIntro:
			'Have a question or want to say hello? Fill out the form and we will get back to you as soon as possible.',
		perk1Title: 'Quick response',
		perk1Body: 'We aim to reply within 24 hours.',
		perk2Title: 'Friendly support',
		perk2Body: 'Our team is here to help.',
		perk3Title: 'Reliable service',
		perk3Body: 'Your satisfaction is our priority.',
		fieldName: 'Your name',
		fieldEmail: 'Your email',
		fieldSubject: 'Subject',
		fieldMessage: 'Your message',
		phName: 'Enter your name',
		phEmail: 'Enter your email',
		phSubject: 'What is it about?',
		phMessage: 'Write your message…',
		submit: 'Send message',
		formNote:
			'When Telegram support is configured on the server, the message is delivered there; otherwise your email app opens.',
		toastContactSent: 'Message sent. We will get back to you as soon as we can.',
		toastContactError: 'Could not send. Please try again or use your email app.',
		toastContactMailFallback: 'Your email app was opened to send the message.',
		infoEyebrow: 'Get in touch',
		infoHeading: 'Contact information',
		lblAddress: 'Address',
		lblPhone: 'Phone',
		lblEmail: 'Email',
		lblHours: 'Working hours',
		addressLine: 'Business district, Tashkent, Uzbekistan',
		hoursLine: 'Every day, 10:00–22:00 (no days off)',
		showroomAlt: 'Interior of our flagship store — clothing and footwear display.',
		storeOpenLabel: 'Open store',
	},
	footer: {
		homeAria: 'Store home',
		playAlt: 'Get it on Google Play',
		appStoreAlt: 'Download on the App Store',
		brandBlurb:
			'Quality fashion and footwear. Thousands of happy customers shop with us every day.',
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
		mapTitle: 'Map',
		mapAria: 'Approximate store location — Tashkent, Uzbekistan',
		mapOpenInMaps: 'View larger map',
		chat: 'Chat',
		telegram: 'Telegram',
		maxMessenger: 'Max',
		copyright: 'Online store. All rights reserved.',
		privacy: 'Privacy Policy',
		terms: 'Terms of use',
		sitemap: 'Sitemap',
		disclaimer: 'Prices and availability are subject to change. Product images are for illustration only.',
	},
	productCard: {
		wishlistAria: 'Add to wishlist',
		quickViewAria: 'Quick view',
		newBadge: 'New',
		addToCart: 'Add to cart',
		favoriteAdded: 'Added to wishlist',
		favoriteRemoved: 'Removed from wishlist',
		genericError: 'Something went wrong',
	},
	auth: {
		otp: {
			toastSmsSendFailed:
				"We couldn't send the code. Please try again in a few minutes.",
		},
		signIn: {
			title: 'Log in',
			subtitle: 'Sign in with your email or phone number and password',
			loginLabel: 'Email or phone',
			loginPlaceholder: 'Email or phone',
			passwordLabel: 'Password',
			passwordPlaceholder: 'Your password',
			submit: 'Sign in',
			submitting: 'Signing in…',
			signUpLink: 'Sign up',
			loading: 'Loading…',
			toastEnterCredentials: 'Enter email or phone and password',
			toastLoginInvalid: 'Check your email or phone number',
			toastWrongPassword: 'Incorrect password',
			toastUserNotFound: 'No account found for this email or phone',
			toastSuccess: 'Signed in successfully',
			toastAccountDeleted: 'This account has been deleted',
			toastLoginFailed: 'Could not sign in',
		},
		signUp: {
			title: 'Sign up',
			subtitle: 'Create an account with email or phone and a password',
			nameLabel: 'Name',
			namePlaceholder: 'Your name',
			loginLabel: 'Email or phone',
			loginPlaceholder: 'you@example.com or +79991234567',
			passwordLabel: 'Password',
			passwordPlaceholder: 'At least 8 characters, a letter and a number',
			confirmLabel: 'Confirm password',
			confirmPlaceholder: 'Repeat password',
			submit: 'Create account',
			submitting: 'Creating…',
			signInLink: 'Already have an account? Sign in',
			loading: 'Loading…',
			toastPasswordMismatch: 'Passwords do not match',
			toastSuccess: 'Account created. You are signed in.',
			toastRegisterFailed: 'Could not create account',
		},
	},
	filter: {
		searchPlaceholder: 'Search',
		filterPlaceholder: 'Sort',
		newest: 'Newest',
		oldest: 'Oldest',
		categoryPlaceholder: 'Category',
		allCategories: 'All categories',
	},
	searchPanel: {
		placeholder: 'Search the catalog',
		close: 'Close',
		popularHeading: 'Most searched',
		categoriesHeading: 'Audience',
		categoryMen: 'Men',
		categoryWomen: 'Women',
		categoryKids: 'Kids',
		noResults: 'No products found.',
		viewAllResults: 'View all results',
	},
	dashboard: {
		sidebarTitle: 'Dashboard',
		navPersonal: 'Personal information',
		navWatchList: 'Watch list',
		navSettings: 'Settings',
		personalInfoPageTitle: 'Personal information',
		fullName: 'Full name',
		email: 'Email',
		emailNotProvided: 'No email added',
		emailPlaceholder: 'name@example.com',
		emailUpdated: 'Email updated',
		avatarUpdated: 'Profile photo updated',
		fullNameUpdated: 'Full name updated',
		fullNamePlaceholder: 'Your name',
		submit: 'Save',
		genericError: 'Something went wrong',
		watchListPageTitle: 'Watch list',
		watchListEmpty: 'No products found.',
		watchListRemoved: 'Removed from watch list',
		settingsDangerZone: 'Danger zone',
		settingsDeleteAccount: 'Delete account',
		settingsDeleteDesc:
			'Deleting your account will remove your data from our servers. This cannot be undone.',
		settingsDeleteButton: 'Delete account',
		settingsAlertTitle: 'Are you sure?',
		settingsAlertDescription:
			'This will permanently delete your account and remove your data from our servers.',
		settingsCancel: 'Cancel',
		settingsContinue: 'Continue',
		settingsAccountDeleted: 'Account deleted',
		settingsPasswordUpdated: 'Password updated',
		oldPassword: 'Current password',
		newPassword: 'New password',
		confirmPassword: 'Confirm new password',
		ordersTitle: 'Orders',
		ordersCaption: 'Your recent orders.',
		colPrice: 'Price',
		colStatus: 'Status',
		colProduct: 'Product',
		colOrderTime: 'Order time',
		colUpdatedTime: 'Updated',
		statusPaid: 'Paid',
		paymentsTitle: 'Payments',
		paymentsCaption: 'Your recent payments.',
		paymentsColProduct: 'Product',
		paymentsColProvider: 'Provider',
		paymentsColStatus: 'Status',
		paymentsColPrice: 'Price',
		paymentsProviderClick: 'Click',
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
		userMenuLabel: 'Мой аккаунт',
		userMenuAdmin: 'Админка',
		userMenuDashboard: 'Кабинет',
		userMenuLogout: 'Выйти',
		logoutDialogTitle: 'Выйти из аккаунта?',
		logoutDialogDescription: 'Вы выйдете из магазина.',
		logoutDialogCancel: 'Отмена',
		logoutDialogContinue: 'Выйти',
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
		sidebarCategoryHrefs: [
			'/women-products',
			'/men-products',
			'/children-products',
			'/umbrellas-products',
			'/bags-products',
			'/backpacks-products',
			'/clothes-products',
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
		newArrivalFallback: [
			{
				title: 'PlayStation 5',
				desc: 'Игровая приставка и аксессуары.',
			},
			{
				title: 'Женские коллекции',
				desc: 'Подборки на каждый день.',
			},
			{
				title: 'Колонки',
				desc: 'Беспроводная акустика для дома.',
			},
			{
				title: 'Парфюм',
				desc: 'Хиты продаж и новинки ароматов.',
			},
		],
	},
	about: {
		title: 'О нас',
		lead: 'Интернет-магазин предлагает качественные товары по доступным ценам.',
		body: 'Наша цель - предоставить надежный сервис, быструю доставку и современный опыт покупок.',
	},
	contacts: {
		heroEyebrow: 'Контакты',
		heroHeading: 'Мы рады вашему сообщению',
		heroIntro:
			'Есть вопрос или хотите поздороваться? Заполните форму — мы ответим как можно скорее.',
		perk1Title: 'Быстрый ответ',
		perk1Body: 'Стараемся ответить в течение 24 часов.',
		perk2Title: 'Дружелюбная поддержка',
		perk2Body: 'Наша команда всегда на связи.',
		perk3Title: 'Надёжный сервис',
		perk3Body: 'Ваш комфорт для нас в приоритете.',
		fieldName: 'Ваше имя',
		fieldEmail: 'Ваш email',
		fieldSubject: 'Тема',
		fieldMessage: 'Сообщение',
		phName: 'Введите имя',
		phEmail: 'Введите email',
		phSubject: 'О чём речь?',
		phMessage: 'Напишите сообщение…',
		submit: 'Отправить сообщение',
		formNote:
			'Если на сервере настроен Telegram-бот поддержки, сообщение уйдёт туда; иначе откроется почтовая программа.',
		toastContactSent: 'Сообщение отправлено. Скоро ответим.',
		toastContactError: 'Не удалось отправить. Попробуйте ещё раз или отправьте письмо вручную.',
		toastContactMailFallback: 'Открыта почта для отправки сообщения.',
		infoEyebrow: 'Связаться с нами',
		infoHeading: 'Контактная информация',
		lblAddress: 'Адрес',
		lblPhone: 'Телефон',
		lblEmail: 'Email',
		lblHours: 'Часы работы',
		addressLine: 'Деловой район, Ташкент, Узбекистан',
		hoursLine: 'Ежедневно с 10:00 до 22:00, без выходных',
		showroomAlt: 'Интерьер флагманского магазина — зал одежды и обуви.',
		storeOpenLabel: 'Открыть магазин',
	},
	footer: {
		homeAria: 'Главная',
		playAlt: 'Google Play',
		appStoreAlt: 'App Store',
		brandBlurb:
			'Качественная мода и обувь. Тысячи довольных покупателей каждый день.',
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
		mapTitle: 'Карта',
		mapAria: 'Примерное расположение — Ташкент, Узбекистан',
		mapOpenInMaps: 'Открыть карту',
		chat: 'Чат',
		telegram: 'Telegram',
		maxMessenger: 'Max',
		copyright: 'Интернет-магазин. Все права защищены.',
		privacy: 'Политика конфиденциальности',
		terms: 'Оферта',
		sitemap: 'Карта сайта',
		disclaimer:
			'Цены и наличие могут меняться. Изображения товаров носят иллюстративный характер.',
	},
	productCard: {
		wishlistAria: 'В избранное',
		quickViewAria: 'Быстрый просмотр',
		newBadge: 'Новинка',
		addToCart: 'В корзину',
		favoriteAdded: 'Добавлено в избранное',
		favoriteRemoved: 'Удалено из избранного',
		genericError: 'Что-то пошло не так',
	},
	auth: {
		otp: {
			toastSmsSendFailed:
				'Не удалось отправить код. Попробуйте ещё раз через несколько минут.',
		},
		signIn: {
			title: 'Вход',
			subtitle: 'Войдите по email или телефону и паролю',
			loginLabel: 'Email или телефон',
			loginPlaceholder: 'Email или телефон',
			passwordLabel: 'Пароль',
			passwordPlaceholder: 'Ваш пароль',
			submit: 'Войти',
			submitting: 'Вход…',
			signUpLink: 'Регистрация',
			loading: 'Загрузка…',
			toastEnterCredentials: 'Введите email или телефон и пароль',
			toastLoginInvalid: 'Проверьте email или номер телефона',
			toastWrongPassword: 'Неверный пароль',
			toastUserNotFound: 'Аккаунт с таким email или телефоном не найден',
			toastSuccess: 'Вы успешно вошли',
			toastAccountDeleted: 'Аккаунт удалён',
			toastLoginFailed: 'Не удалось войти',
		},
		signUp: {
			title: 'Регистрация',
			subtitle: 'Создайте аккаунт по email или телефону и паролю',
			nameLabel: 'Имя',
			namePlaceholder: 'Ваше имя',
			loginLabel: 'Email или телефон',
			loginPlaceholder: 'you@example.com или +79991234567',
			passwordLabel: 'Пароль',
			passwordPlaceholder: 'Не менее 8 символов, буква и цифра',
			confirmLabel: 'Повторите пароль',
			confirmPlaceholder: 'Пароль ещё раз',
			submit: 'Создать аккаунт',
			submitting: 'Создание…',
			signInLink: 'Уже есть аккаунт? Войти',
			loading: 'Загрузка…',
			toastPasswordMismatch: 'Пароли не совпадают',
			toastSuccess: 'Аккаунт создан. Вы вошли.',
			toastRegisterFailed: 'Не удалось зарегистрироваться',
		},
	},
	filter: {
		searchPlaceholder: 'Поиск',
		filterPlaceholder: 'Сортировка',
		newest: 'Сначала новые',
		oldest: 'Сначала старые',
		categoryPlaceholder: 'Категория',
		allCategories: 'Все категории',
	},
	searchPanel: {
		placeholder: 'Поиск по каталогу',
		close: 'Закрыть',
		popularHeading: 'Чаще всего ищут',
		categoriesHeading: 'Аудитория',
		categoryMen: 'Мужчины',
		categoryWomen: 'Женщины',
		categoryKids: 'Дети',
		noResults: 'Товары не найдены.',
		viewAllResults: 'Все результаты',
	},
	dashboard: {
		sidebarTitle: 'Кабинет',
		navPersonal: 'Личные данные',
		navWatchList: 'Избранное',
		navSettings: 'Настройки',
		personalInfoPageTitle: 'Личные данные',
		fullName: 'Полное имя',
		email: 'Email',
		emailNotProvided: 'Email не указан',
		emailPlaceholder: 'name@example.com',
		emailUpdated: 'Email обновлён',
		avatarUpdated: 'Фото профиля обновлено',
		fullNameUpdated: 'Имя обновлено',
		fullNamePlaceholder: 'Ваше имя',
		submit: 'Сохранить',
		genericError: 'Что-то пошло не так',
		watchListPageTitle: 'Избранное',
		watchListEmpty: 'Товары не найдены.',
		watchListRemoved: 'Удалено из избранного',
		settingsDangerZone: 'Опасная зона',
		settingsDeleteAccount: 'Удалить аккаунт',
		settingsDeleteDesc:
			'Удаление аккаунта удалит ваши данные с серверов. Это действие необратимо.',
		settingsDeleteButton: 'Удалить аккаунт',
		settingsAlertTitle: 'Вы уверены?',
		settingsAlertDescription:
			'Аккаунт будет удалён безвозвратно вместе с данными на серверах.',
		settingsCancel: 'Отмена',
		settingsContinue: 'Продолжить',
		settingsAccountDeleted: 'Аккаунт удалён',
		settingsPasswordUpdated: 'Пароль обновлён',
		oldPassword: 'Текущий пароль',
		newPassword: 'Новый пароль',
		confirmPassword: 'Подтвердите пароль',
		ordersTitle: 'Заказы',
		ordersCaption: 'Ваши последние заказы.',
		colPrice: 'Цена',
		colStatus: 'Статус',
		colProduct: 'Товар',
		colOrderTime: 'Время заказа',
		colUpdatedTime: 'Обновлено',
		statusPaid: 'Оплачено',
		paymentsTitle: 'Платежи',
		paymentsCaption: 'Ваши последние платежи.',
		paymentsColProduct: 'Товар',
		paymentsColProvider: 'Провайдер',
		paymentsColStatus: 'Статус',
		paymentsColPrice: 'Цена',
		paymentsProviderClick: 'Клик',
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
		userMenuLabel: 'Mening akkauntim',
		userMenuAdmin: 'Admin',
		userMenuDashboard: 'Kabinet',
		userMenuLogout: 'Chiqish',
		logoutDialogTitle: 'Chiqishni tasdiqlaysizmi?',
		logoutDialogDescription: 'Do‘kondan chiqasiz.',
		logoutDialogCancel: 'Bekor qilish',
		logoutDialogContinue: 'Chiqish',
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
		sidebarCategoryHrefs: [
			'/women-products',
			'/men-products',
			'/children-products',
			'/umbrellas-products',
			'/bags-products',
			'/backpacks-products',
			'/clothes-products',
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
		newArrivalFallback: [
			{
				title: 'PlayStation 5',
				desc: 'O‘yin konsoli va aksessuarlar.',
			},
			{
				title: 'Ayollar kolleksiyasi',
				desc: 'Har kun uchun tanlangan liboslar.',
			},
			{
				title: 'Kalonkalar',
				desc: 'Uy uchun simsiz audio.',
			},
			{
				title: 'Atir',
				desc: 'Ommabop va yangi atirlar.',
			},
		],
	},
	about: {
		title: 'Biz haqimizda',
		lead: "Onlayn do`konimiz sifatli mahsulotlarni qulay narxlarda taqdim etadi.",
		body: 'Maqsadimiz foydalanuvchilarga ishonchli servis, tez yetkazib berish va zamonaviy xarid tajribasini taqdim etishdir.',
	},
	contacts: {
		heroEyebrow: 'Aloqa',
		heroHeading: 'Sizning xabaringizni mamnuniyat bilan kutamiz',
		heroIntro:
			'Savolingiz bormi yoki salom aytmoqchimisiz? Formani to‘ldiring — imkon qadar tez javob beramiz.',
		perk1Title: 'Tez javob',
		perk1Body: '24 soat ichida javob berishga intilamiz.',
		perk2Title: 'Do‘stona qo‘llab-quvvatlash',
		perk2Body: 'Jamoamiz yordam berishga tayyor.',
		perk3Title: 'Ishonchli xizmat',
		perk3Body: 'Sizning qoniqishingiz — ustuvor vazifamiz.',
		fieldName: 'Ismingiz',
		fieldEmail: 'Email manzilingiz',
		fieldSubject: 'Mavzu',
		fieldMessage: 'Xabaringiz',
		phName: 'Ismingizni kiriting',
		phEmail: 'Email kiriting',
		phSubject: 'Nima haqida?',
		phMessage: 'Xabarni yozing…',
		submit: 'Xabar yuborish',
		formNote:
			'Serverda Telegram qo‘llab-quvvatlash boti sozlangan bo‘lsa, xabar u yerga yuboriladi; aks holda pochta dasturi ochiladi.',
		toastContactSent: 'Xabar yuborildi. Tez orada javob beramiz.',
		toastContactError: 'Yuborib bo‘lmadi. Qayta urinib ko‘ring yoki pochta orqali yozing.',
		toastContactMailFallback: 'Xabar yuborish uchun pochta dasturi ochildi.',
		infoEyebrow: 'Bog‘lanish',
		infoHeading: 'Aloqa ma’lumotlari',
		lblAddress: 'Manzil',
		lblPhone: 'Telefon',
		lblEmail: 'Email',
		lblHours: 'Ish vaqti',
		addressLine: 'Toshkent, O‘zbekiston',
		hoursLine: 'Har kuni 10:00 dan 22:00 gacha, dam olish kunlarisiz',
		showroomAlt: 'Flagman do‘kon interyeri — kiyim va oyoq kiyimi zali.',
		storeOpenLabel: 'Do‘konni ochish',
	},
	footer: {
		homeAria: 'Bosh sahifa',
		playAlt: 'Google Play',
		appStoreAlt: 'App Store',
		brandBlurb:
			'Sifatli moda va poyabzal. Har kuni minglab mamnun mijozlar.',
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
		mapTitle: 'Xarita',
		mapAria: 'Taxminiy joylashuv — Toshkent, O‘zbekiston',
		mapOpenInMaps: 'Kattaroq xarita',
		chat: 'Chat',
		telegram: 'Telegram',
		maxMessenger: 'Max',
		copyright: 'Internet-do‘koni. Barcha huquqlar himoyalangan.',
		privacy: 'Maxfiylik siyosati',
		terms: 'Foydalanish shartlari',
		sitemap: 'Sayt xaritasi',
		disclaimer:
			'Narxlar va mavjudlik o‘zgarishi mumkin. Mahsulot rasmlari namoyish xarakterida.',
	},
	productCard: {
		wishlistAria: 'Sevimlilarga qo‘shish',
		quickViewAria: 'Tez ko‘rish',
		newBadge: 'Yangi',
		addToCart: 'Savatga',
		favoriteAdded: 'Sevimlilarga qo‘shildi',
		favoriteRemoved: 'Sevimlilardan olib tashlandi',
		genericError: 'Xatolik yuz berdi',
	},
	auth: {
		otp: {
			toastSmsSendFailed:
				'Kod yuborilmadi. Bir necha daqiqadan keyin qayta urinib ko‘ring.',
		},
		signIn: {
			title: 'Kirish',
			subtitle: 'Email yoki telefon va parol bilan kiring',
			loginLabel: 'Email yoki telefon',
			loginPlaceholder: 'Email yoki telefon',
			passwordLabel: 'Parol',
			passwordPlaceholder: 'Parolingiz',
			submit: 'Kirish',
			submitting: 'Kirilmoqda…',
			signUpLink: 'Ro‘yxatdan o‘tish',
			loading: 'Yuklanmoqda…',
			toastEnterCredentials: 'Email yoki telefon va parolni kiriting',
			toastLoginInvalid: 'Email yoki telefonni tekshiring',
			toastWrongPassword: 'Parol noto‘g‘ri',
			toastUserNotFound: 'Bu email yoki telefon uchun akkaunt topilmadi',
			toastSuccess: 'Muvaffaqiyatli kirdingiz',
			toastAccountDeleted: 'Akkaunt o‘chirilgan',
			toastLoginFailed: 'Kirish amalga oshmadi',
		},
		signUp: {
			title: 'Ro‘yxatdan o‘tish',
			subtitle: 'Email yoki telefon va parol bilan akkaunt yarating',
			nameLabel: 'Ism',
			namePlaceholder: 'Ismingiz',
			loginLabel: 'Email yoki telefon',
			loginPlaceholder: 'you@example.com yoki +998901234567',
			passwordLabel: 'Parol',
			passwordPlaceholder: 'Kamida 8 belgi, harf va raqam',
			confirmLabel: 'Parolni tasdiqlang',
			confirmPlaceholder: 'Parolni qayta kiriting',
			submit: 'Akkaunt yaratish',
			submitting: 'Yaratilmoqda…',
			signInLink: 'Akkauntingiz bormi? Kirish',
			loading: 'Yuklanmoqda…',
			toastPasswordMismatch: 'Parollar mos emas',
			toastSuccess: 'Akkaunt yaratildi. Siz tizimga kirdingiz.',
			toastRegisterFailed: 'Ro‘yxatdan o‘tib bo‘lmadi',
		},
	},
	filter: {
		searchPlaceholder: 'Qidirish',
		filterPlaceholder: 'Saralash',
		newest: 'Yangi',
		oldest: 'Eski',
		categoryPlaceholder: 'Kategoriya',
		allCategories: 'Barcha kategoriyalar',
	},
	searchPanel: {
		placeholder: 'Katalog bo‘yicha qidiruv',
		close: 'Yopish',
		popularHeading: 'Ko‘p qidirilgan so‘rovlar',
		categoriesHeading: 'Kategoriyalar',
		categoryMen: 'Erkak',
		categoryWomen: 'Ayol',
		categoryKids: 'Bola',
		noResults: 'Mahsulot topilmadi.',
		viewAllResults: 'Barcha natijalarni ko‘rish',
	},
	dashboard: {
		sidebarTitle: 'Kabinet',
		navPersonal: 'Shaxsiy ma’lumotlar',
		navWatchList: 'Sevimlilar',
		navSettings: 'Sozlamalar',
		personalInfoPageTitle: 'Shaxsiy ma’lumotlar',
		fullName: 'To‘liq ism',
		email: 'Email',
		emailNotProvided: 'Email kiritilmagan',
		emailPlaceholder: 'ism@example.com',
		emailUpdated: 'Email yangilandi',
		avatarUpdated: 'Profil rasmi yangilandi',
		fullNameUpdated: 'Ism yangilandi',
		fullNamePlaceholder: 'Ismingiz',
		submit: 'Saqlash',
		genericError: 'Xatolik yuz berdi',
		watchListPageTitle: 'Sevimlilar',
		watchListEmpty: 'Mahsulot topilmadi.',
		watchListRemoved: 'Sevimlilardan olib tashlandi',
		settingsDangerZone: 'Xavfli zona',
		settingsDeleteAccount: 'Akkauntni o‘chirish',
		settingsDeleteDesc:
			'Akkauntni o‘chirish ma’lumotlaringizni serverdan yo‘q qiladi. Qaytarib bo‘lmaydi.',
		settingsDeleteButton: 'Akkauntni o‘chirish',
		settingsAlertTitle: 'Ishonchingiz komilmi?',
		settingsAlertDescription:
			'Akkauntingiz butunlay o‘chiriladi va ma’lumotlaringiz serverdan olib tashlanadi.',
		settingsCancel: 'Bekor qilish',
		settingsContinue: 'Davom etish',
		settingsAccountDeleted: 'Akkaunt o‘chirildi',
		settingsPasswordUpdated: 'Parol yangilandi',
		oldPassword: 'Joriy parol',
		newPassword: 'Yangi parol',
		confirmPassword: 'Parolni tasdiqlang',
		ordersTitle: 'Buyurtmalar',
		ordersCaption: 'So‘nggi buyurtmalaringiz.',
		colPrice: 'Narx',
		colStatus: 'Holat',
		colProduct: 'Mahsulot',
		colOrderTime: 'Buyurtma vaqti',
		colUpdatedTime: 'Yangilangan',
		statusPaid: 'To‘langan',
		paymentsTitle: "To'lovlar",
		paymentsCaption: "So'nggi to'lovlaringiz.",
		paymentsColProduct: 'Mahsulot',
		paymentsColProvider: 'Provayder',
		paymentsColStatus: 'Holat',
		paymentsColPrice: 'Narx',
		paymentsProviderClick: 'Click',
	},
}

const map: Record<Locale, Dictionary> = { en, ru, uz }

export function getDictionary(locale: Locale): Dictionary {
	return map[locale] ?? en
}
