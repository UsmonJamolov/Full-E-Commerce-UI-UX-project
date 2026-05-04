import ContactsView from './_components/contacts-view'
import { getPublicFooterSettings } from '@/lib/footer-public'
import { getDictionary, parseLocale } from '@/lib/i18n/dictionaries'
import { cookies } from 'next/headers'

const ContactsPage = async () => {
	const [store, settings] = await Promise.all([cookies(), getPublicFooterSettings()])
	const locale = parseLocale(store.get('locale')?.value)
	const dict = getDictionary(locale)

	return (
		<div className='w-full min-w-0 rounded-2xl border border-zinc-200/60 bg-gradient-to-b from-zinc-50/90 to-white px-3 py-6 sm:px-6 sm:py-8'>
			<ContactsView dictionary={dict} settings={settings} />
		</div>
	)
}

export default ContactsPage
