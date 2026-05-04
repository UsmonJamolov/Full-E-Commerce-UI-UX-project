import { NextRequest, NextResponse } from 'next/server'

/** Nominatim usage policy: identify the application. */
const NOMINATIM_UA = 'FullECommerceAdmin/1.0 (footer map settings)'

export async function GET(req: NextRequest) {
	const q = req.nextUrl.searchParams.get('q')?.trim()
	if (!q || q.length > 400) {
		return NextResponse.json({ failure: 'Введите адрес (не длиннее 400 символов).' }, { status: 400 })
	}

	try {
		const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`
		const res = await fetch(url, {
			headers: {
				'User-Agent': NOMINATIM_UA,
				Accept: 'application/json',
			},
			next: { revalidate: 0 },
		})

		if (!res.ok) {
			return NextResponse.json({ failure: 'Сервис геокодинга временно недоступен.' }, { status: 502 })
		}

		const data = (await res.json()) as Array<{ lat: string; lon: string; display_name?: string }>
		if (!Array.isArray(data) || data.length === 0) {
			return NextResponse.json({ failure: 'Адрес не найден. Уточните город и улицу.' }, { status: 404 })
		}

		const hit = data[0]
		const lat = parseFloat(hit.lat)
		const lon = parseFloat(hit.lon)
		if (Number.isNaN(lat) || Number.isNaN(lon)) {
			return NextResponse.json({ failure: 'Некорректный ответ геокодинга.' }, { status: 502 })
		}

		return NextResponse.json({
			lat,
			lon,
			displayName: hit.display_name || '',
		})
	} catch {
		return NextResponse.json({ failure: 'Ошибка запроса к геокодингу.' }, { status: 502 })
	}
}
