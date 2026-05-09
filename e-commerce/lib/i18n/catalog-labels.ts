import type { Dictionary } from '@/lib/i18n/dictionaries'

export function categoryFromCatalog(catalog: Dictionary['catalog'], raw: string): string {
	if (!raw?.trim()) return raw
	return catalog.categories[raw] ?? raw
}

export function targetGroupFromCatalog(catalog: Dictionary['catalog'], raw: string | undefined): string {
	if (!raw) return ''
	const g = catalog.targetGroups
	if (raw === 'Erkak' || raw === 'Ayol' || raw === 'Bola') return g[raw]
	return raw
}

/** To‘liq lug‘at bilan (server komponentlar). */
export function categoryLabel(dict: Dictionary, raw: string): string {
	return categoryFromCatalog(dict.catalog, raw)
}

export function targetGroupLabel(dict: Dictionary, raw: string | undefined): string {
	return targetGroupFromCatalog(dict.catalog, raw)
}
