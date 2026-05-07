import axios from 'axios'

/** Brauzer va server action / SSR uchun tashqi API manzili (bitta domen orqali nginx). */
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080'

/** Docker ichida Next konteyneridan Expressga to‘g‘ridan-to‘g‘ri (hairpin DNSsiz). */
const serverSideBaseURL =
	typeof window === 'undefined'
		? process.env.INTERNAL_API_URL || SERVER_URL
		: SERVER_URL

export const axiosClient = axios.create({
	baseURL: serverSideBaseURL,
	withCredentials: true,
})