import { getDictionary, parseLocale } from '@/lib/i18n/dictionaries'
import { cookies } from 'next/headers'

const AboutPage = async () => {
	const store = await cookies()
	const locale = parseLocale(store.get('locale')?.value)
	const dict = getDictionary(locale)

	return (
		<div className='mx-auto w-full max-w-6xl px-4 py-10'>
			<h1 className='text-3xl font-bold'>{dict.about.title}</h1>
			<p className='mt-3 text-muted-foreground'>{dict.about.lead}</p>
			<div className='mt-6 rounded-lg border bg-white p-4'>
				<p>{dict.about.body}</p>
			</div>
		</div>
	)
}

export default AboutPage
