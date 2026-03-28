// export interface ChildProps {
// 	children: React.ReactNode
// }

// // export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
// export type SearchParams = {
//   [key: string]: string | string[] | undefined;
// };
// export type Params = Promise<{ productId: string }>

// export interface QueryProps {
// 	params: string
// 	key: string
// 	value?: string | null
// }

// export interface ReturnActionType {
// 	user: IUser
// 	failure: string
// 	checkoutUrl: string
// 	status: number
// 	isNext: boolean
// 	products: IProduct[]
// 	product: IProduct
// 	customers: IUser[]
// 	orders: IOrder[]
// 	transactions: ITransaction[]
// 	statistics: { totalOrders: number; totalTransactions: number; totalFavourites: number }
// }

// export interface IProduct {
// 	title: string
// 	category: string
// 	price: number
// 	image: string
// 	description: string
// 	imageKey: string
// 	_id: string
// 	reviews: number
// 	cta: boolean
// }

// export interface IUser {
// 	email: string
// 	fullName: string
// 	password: string
// 	_id: string
// 	role: string
// 	orderCount: number
// 	totalPrice: number
// 	avatar: string
// 	avatarKey: string
// 	isDeleted: boolean
// 	deletedAt: Date
// 	favorites: IProduct[]
// }

// export interface IOrder {
// 	_id: string
// 	user: IUser
// 	product: IProduct
// 	createdAt: Date
// 	price: number
// 	status: string
// 	updatedAt: Date
// }

// export interface ITransaction {
// 	_id: string
// 	id: string
// 	user: IUser
// 	product: IProduct
// 	state: number
// 	amount: number
// 	create_time: number
// 	perform_time: number
// 	cancel_time: number
// 	reason: number
// 	provider: string
// }

// @/types/index.d.ts

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

// ----------------------------------------------------
// !!! ReturnActionType ni qayta tashkil qildik !!!
// Har bir Server Action uchun aniq qaytarish tiplari
// ----------------------------------------------------

export interface ReturnActionType {
	user: IUser
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

export interface IUser {
	email: string
	fullName: string
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