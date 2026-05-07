'use server'

import jwt from 'jsonwebtoken'

/** API `user.middleware` JWT ni `JWT_SECRET` bilan tekshiradi — shu yerdan ham shu secret ishlatilishi shart. */
export const generateToken = async (userId?: string) => {
	const secret = process.env.JWT_SECRET ?? process.env.NEXT_PUBLIC_JWT_SECRET
	if (!secret) {
		throw new Error('JWT_SECRET (yoki dev uchun NEXT_PUBLIC_JWT_SECRET) sozlanmagan')
	}
	return jwt.sign({ userId }, secret, { expiresIn: '15m' })
}