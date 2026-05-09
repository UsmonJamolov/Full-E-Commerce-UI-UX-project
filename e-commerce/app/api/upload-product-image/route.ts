import { authOptions } from '@/lib/auth-options'
import jwt from 'jsonwebtoken'
import { getServerSession } from 'next-auth'

export const runtime = 'nodejs'

function adminBearerToken(userId: string): string {
	const secret = process.env.JWT_SECRET ?? process.env.NEXT_PUBLIC_JWT_SECRET
	if (!secret) {
		throw new Error('JWT_SECRET sozlanmagan')
	}
	return jwt.sign({ userId }, secret, { expiresIn: '15m' })
}

/** Brauzer → Next (cookie sessiya) → Express (Bearer) → S3. S3 ga to‘g‘ridan-to‘g‘ri PUT CORS talab qiladi. */
export async function POST(req: Request) {
	try {
		const session = await getServerSession(authOptions)
		const userId = session?.currentUser?._id ?? session?.user?.id
		const role = session?.currentUser?.role ?? session?.user?.role
		if (!userId || String(role).toLowerCase() !== 'admin') {
			return Response.json({ failure: 'Unauthorized' }, { status: 401 })
		}

		const form = await req.formData()
		const file = form.get('file')
		if (!file || !(file instanceof Blob)) {
			return Response.json({ failure: 'Fayl kerak' }, { status: 400 })
		}

		const token = adminBearerToken(String(userId))
		const forward = new FormData()
		forward.append('file', file)

		const base = (process.env.INTERNAL_API_URL || '').replace(/\/$/, '') || 'http://localhost:5000'
		const upstream = await fetch(`${base}/api/admin/upload-product-image`, {
			method: 'POST',
			headers: { Authorization: `Bearer ${token}` },
			body: forward,
		})

		const text = await upstream.text()
		return new Response(text, {
			status: upstream.status,
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (e) {
		console.error('upload-product-image', e)
		const msg = e instanceof Error ? e.message : 'Yuklash muvaffaqiyatsiz'
		return Response.json({ failure: msg }, { status: 500 })
	}
}
