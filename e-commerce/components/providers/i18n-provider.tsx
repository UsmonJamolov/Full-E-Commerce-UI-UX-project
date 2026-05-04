'use client'

import type { Dictionary, Locale } from '@/lib/i18n/dictionaries'
import { createContext, useContext, type ReactNode } from 'react'

type I18nValue = { locale: Locale; dictionary: Dictionary }

const I18nContext = createContext<I18nValue | null>(null)

type Props = {
	children: ReactNode
	locale: Locale
	dictionary: Dictionary
}

export function I18nProvider({ children, locale, dictionary }: Props) {
	return <I18nContext.Provider value={{ locale, dictionary }}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
	const ctx = useContext(I18nContext)
	if (!ctx) {
		throw new Error('useI18n must be used within I18nProvider')
	}
	return ctx
}
