/**
 * Admin mahsulot rasmi: `/api/auth/...` — nginx allaqachon Next ga yo‘naltiradi (maxsus location kerak emas).
 */
export async function uploadProductImageClient(file: File): Promise<{ url: string; key: string }> {
	const form = new FormData()
	form.append('file', file)

	const res = await fetch('/api/auth/upload-product-image', {
		method: 'POST',
		body: form,
		credentials: 'include',
	})

	const text = await res.text()
	let data: { url?: string; key?: string; failure?: string; error?: string; message?: string } = {}
	try {
		data = text ? JSON.parse(text) : {}
	} catch {
		throw new Error(res.ok ? 'Noto‘g‘ri server javobi' : `Yuklash xatosi (${res.status})`)
	}

	if (!res.ok) {
		throw new Error(
			data.failure || data.error || data.message || `Yuklash xatosi (${res.status})`,
		)
	}
	if (!data.url || !data.key) {
		throw new Error('Server javobi to‘liq emas')
	}
	return { url: data.url, key: data.key }
}
