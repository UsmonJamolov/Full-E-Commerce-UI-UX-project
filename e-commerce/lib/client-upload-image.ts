/**
 * Rasmni brauzerdan to‘g‘ridan-to‘g‘ri Express/S3 ga yuklaydi.
 * Server action orqali File yubormaslik kerak — Next.js body limiti va RSC xatolari (mobil) oldini oladi.
 */
export async function uploadProductImageClient(file: File): Promise<{ url: string; key: string }> {
	const base = (process.env.NEXT_PUBLIC_SERVER_URL || '').replace(/\/$/, '')
	if (!base) {
		throw new Error('NEXT_PUBLIC_SERVER_URL sozlanmagan')
	}

	const fileType = file.type?.trim() || 'image/jpeg'

	const presignRes = await fetch(`${base}/api/files/upload-url`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			fileName: file.name || 'upload.jpg',
			fileType,
			fileSize: file.size,
		}),
	})

	const presignText = await presignRes.text()
	let presignJson: { uploadUrl?: string; key?: string; fileUrl?: string; error?: string } = {}
	try {
		presignJson = presignText ? JSON.parse(presignText) : {}
	} catch {
		throw new Error(presignRes.ok ? 'Noto‘g‘ri server javobi' : `Yuklash URL olinmadi (${presignRes.status})`)
	}

	if (!presignRes.ok) {
		throw new Error(presignJson.error || `Yuklash URL olinmadi (${presignRes.status})`)
	}

	const uploadUrl = presignJson.uploadUrl
	const key = presignJson.key
	const fileUrl = presignJson.fileUrl
	if (!uploadUrl || !key || !fileUrl) {
		throw new Error('Server presign javobi to‘liq emas')
	}

	const putRes = await fetch(uploadUrl, {
		method: 'PUT',
		headers: { 'Content-Type': fileType },
		body: file,
	})
	if (!putRes.ok) {
		throw new Error('Faylni saqlashga (S3) yuklab bo‘lmadi')
	}

	const saveRes = await fetch(`${base}/api/files`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			key,
			url: fileUrl,
			fileName: file.name || 'upload.jpg',
			mimeType: fileType,
			size: file.size,
		}),
	})
	if (!saveRes.ok) {
		// Rasm allaqachon bucketda; mahsulot yaratish uchun URL yetarli
		console.warn('uploadProductImageClient: /api/files saqlanmadi', saveRes.status)
	}

	return { url: fileUrl, key }
}
