import React from 'react'; // React.ReactNode uchun kerak bo'lishi mumkin

export interface ChildProps {
	children: React.ReactNode
}

export type SearchParams = {
  [key: string]: string | string[] | undefined;
};
export type Params = Promise<{ productId: string }>

export interface QueryProps {
	params: string
	key: string
	value?: string | null
}
export interface ReturnActionType {
	user: IUser
	message: string
	failure: string
	checkoutUrl: string
	status: number
	isNext: boolean
	products: IProduct[]
	product: IProduct
	customers: IUser[]
	orders: IOrder[]
	transactions: ITransaction[]
	statistics: { totalOrders: number; totalTransactions: number; totalFavourites: number }
}

// getProducts action uchun qaytarish tipi
export interface GetProductsActionReturnType {
  data: IProduct[];
  serverError?: string;
  validationErrors?: Record<string, string[]>;
}

export interface GetProductActionReturnType {
  data: IProduct;
  serverError?: string;
  validationErrors?: Record<string, string[]>;
}


export interface IProduct {
	title: string
	category: string
	price: number
	image: string
	description: string
	imageKey: string
	_id: string
	reviews: number
	cta: boolean
}

// export type SafeUser = Omit<IUser, "password">

export type SafeUser = Partial<Omit<IUser, "password">> & {
  _id: string
  phone: string
  name: string
  role: string
}

export interface IUser {
	phone: string
	name: string
	password: string
	_id: string
	role: string
	orderCount: number
	totalPrice: number
	avatar: string
	avatarKey: string
	isDeleted: boolean
	deletedAt: Date
	favorites: IProduct[]
}

export interface IOrder {
	_id: string
	user: IUser
	product: IProduct
	createdAt: Date
	price: number
	status: string
	updatedAt: Date
}

export interface ITransaction {
	_id: string
	id: string
	user: IUser
	product: IProduct
	state: number
	amount: number
	create_time: number
	perform_time: number
	cancel_time: number
	reason: number
	provider: string
}