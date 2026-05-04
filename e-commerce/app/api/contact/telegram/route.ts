import { NextResponse } from 'next/server'
import { z } from 'zod'

const bodySchema = z.object({
	name: z.string().trim().min(1).max(120),
	email: z.string().trim().email().max(120),
	subject: z.string().trim().max(200).optional().default(''),
	message: z.string().trim().min(1).max(5000),
})

const TELEGRAM_MAX = 4096

export async function POST(req: Request) {
	const token = process.env.TELEGRAM_CONTACT_BOT_TOKEN?.trim()
	const chatId = process.env.TELEGRAM_CONTACT_CHAT_ID?.trim()
	/* 200 — terminal / devtools da 503 “xato” ko‘rinmasin; mijoz mailto fallbackni `code` bo‘yicha qiladi */
	if (!token || !chatId) {
		return NextResponse.json({ ok: false as const, code: 'NOT_CONFIGURED' as const })
	}

	let json: unknown
	try {
		json = await req.json()
	} catch {
		return NextResponse.json({ ok: false, code: 'BAD_JSON' as const }, { status: 400 })
	}

	const parsed = bodySchema.safeParse(json)
	if (!parsed.success) {
		return NextResponse.json({ ok: false, code: 'VALIDATION' as const }, { status: 400 })
	}

	const { name, email, subject, message } = parsed.data
	const header = `📩 Контакт (сайт)\n\nИмя: ${name}\nEmail: ${email}\nТема: ${subject || '—'}\n\n`
	let text = `${header}${message}`
	if (text.length > TELEGRAM_MAX) {
		text = text.slice(0, TELEGRAM_MAX - 1) + '…'
	}

	const url = `https://api.telegram.org/bot${token}/sendMessage`
	const tgRes = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			chat_id: chatId,
			text,
		}),
	})

	if (!tgRes.ok) {
		const errBody = await tgRes.text().catch(() => '')
		console.error('[contact/telegram] Telegram API error', tgRes.status, errBody.slice(0, 500))
		return NextResponse.json({ ok: false, code: 'TELEGRAM_ERROR' as const }, { status: 502 })
	}

	return NextResponse.json({ ok: true as const })
}
