import { getDictionary, parseLocale } from '@/lib/i18n/dictionaries'
import { cookies } from 'next/headers'

const ContactsPage = async () => {
	const store = await cookies()
	const locale = parseLocale(store.get('locale')?.value)
	const dict = getDictionary(locale)

	return (
		<div className='mx-auto w-full max-w-6xl px-4 py-10'>
			<h1 className='text-3xl font-bold'>{dict.contacts.title}</h1>
			<p className='mt-3 text-muted-foreground'>{dict.contacts.lead}</p>
			<div className='mt-6 space-y-2 rounded-lg border bg-white p-4'>
				<p>
					<span className='font-semibold'>{dict.contacts.phone}:</span> +998 90 000 00 00
				</p>
				<p>
					<span className='font-semibold'>{dict.contacts.email}:</span> support@exclusive.uz
				</p>
				<p>
					<span className='font-semibold'>{dict.contacts.address}:</span> Tashkent, Uzbekistan
				</p>
			</div>
		</div>
	)
}

export default ContactsPage
