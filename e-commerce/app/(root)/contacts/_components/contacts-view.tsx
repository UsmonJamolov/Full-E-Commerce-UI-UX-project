import { ArrowUpRight, Clock, Headphones, Mail, MapPin, Phone, Shield } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import type { PublicFooterSettings } from '@/lib/footer-public'
import type { Dictionary } from '@/lib/i18n/dictionaries'

import ContactForm from './contact-form'

const perkIconWrap =
	'flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 ring-1 ring-red-100'
const infoIconWrap =
	'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-red-600 ring-1 ring-zinc-200/80'

export default function ContactsView({
	dictionary,
	settings,
}: {
	dictionary: Dictionary
	settings: PublicFooterSettings
}) {
	const c = dictionary.contacts

	return (
		<div className='w-full min-w-0 pb-16 pt-4 sm:pt-8'>
			<section className='grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-14'>
				<div>
					<p className='text-xs font-semibold uppercase tracking-[0.2em] text-red-600'>{c.heroEyebrow}</p>
					<h1 className='mt-3 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl'>
						{c.heroHeading}
					</h1>
					<p className='mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base'>{c.heroIntro}</p>
					<ul className='mt-10 space-y-6'>
						<li className='flex gap-4'>
							<div className={perkIconWrap} aria-hidden>
								<Clock className='h-5 w-5' />
							</div>
							<div>
								<p className='font-semibold text-zinc-900'>{c.perk1Title}</p>
								<p className='mt-1 text-sm text-muted-foreground'>{c.perk1Body}</p>
							</div>
						</li>
						<li className='flex gap-4'>
							<div className={perkIconWrap} aria-hidden>
								<Headphones className='h-5 w-5' />
							</div>
							<div>
								<p className='font-semibold text-zinc-900'>{c.perk2Title}</p>
								<p className='mt-1 text-sm text-muted-foreground'>{c.perk2Body}</p>
							</div>
						</li>
						<li className='flex gap-4'>
							<div className={perkIconWrap} aria-hidden>
								<Shield className='h-5 w-5' />
							</div>
							<div>
								<p className='font-semibold text-zinc-900'>{c.perk3Title}</p>
								<p className='mt-1 text-sm text-muted-foreground'>{c.perk3Body}</p>
							</div>
						</li>
					</ul>
				</div>
				<ContactForm copy={c} supportEmail={settings.email} />
			</section>

			<section className='mt-20 border-t border-zinc-200/80 pt-16'>
				<div className='grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12'>
					<div className='min-w-0 max-w-xl lg:max-w-none'>
					<p className='text-xs font-semibold uppercase tracking-[0.2em] text-red-600'>{c.infoEyebrow}</p>
					<h2 className='mt-3 text-2xl font-bold text-zinc-900 sm:text-3xl'>{c.infoHeading}</h2>
					<ul className='mt-8 space-y-6'>
						<li className='flex gap-4'>
							<div className={infoIconWrap} aria-hidden>
								<MapPin className='h-5 w-5' />
							</div>
							<div className='min-w-0'>
								<p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>{c.lblAddress}</p>
								<p className='mt-1 text-sm font-medium text-zinc-800'>{c.addressLine}</p>
							</div>
						</li>
						<li className='flex gap-4'>
							<div className={infoIconWrap} aria-hidden>
								<Phone className='h-5 w-5' />
							</div>
							<div>
								<p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>{c.lblPhone}</p>
								<p className='mt-1 text-sm font-medium text-zinc-800'>
									<a href={`tel:${settings.phonePrimary.replace(/\s/g, '')}`} className='hover:text-red-600'>
										{settings.phonePrimary}
									</a>
								</p>
								<p className='mt-1 text-sm font-medium text-zinc-800'>
									<a href={`tel:${settings.phoneSecondary.replace(/\s/g, '')}`} className='hover:text-red-600'>
										{settings.phoneSecondary}
									</a>
								</p>
							</div>
						</li>
						<li className='flex gap-4'>
							<div className={infoIconWrap} aria-hidden>
								<Mail className='h-5 w-5' />
							</div>
							<div>
								<p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>{c.lblEmail}</p>
								<p className='mt-1 text-sm font-medium text-zinc-800'>
									<a href={`mailto:${settings.email}`} className='hover:text-red-600'>
										{settings.email}
									</a>
								</p>
							</div>
						</li>
						<li className='flex gap-4'>
							<div className={infoIconWrap} aria-hidden>
								<Clock className='h-5 w-5' />
							</div>
							<div>
								<p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>{c.lblHours}</p>
								<p className='mt-1 text-sm font-medium text-zinc-800'>{c.hoursLine}</p>
							</div>
						</li>
					</ul>
					<p className='mt-10 text-sm text-muted-foreground'>
						<Link href='/' className='font-medium text-zinc-800 hover:text-red-600'>
							{dictionary.header.home}
						</Link>
						{' · '}
						<Link href='/explore-products' className='font-medium text-zinc-800 hover:text-red-600'>
							{dictionary.home.exploreProductsTitle}
						</Link>
					</p>
					</div>

					<div className='min-w-0'>
						<div className='relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-100 shadow-sm ring-1 ring-black/[0.04]'>
							<Image
								src='/images/contacts-showroom.png'
								alt={c.showroomAlt}
								fill
								className='object-cover'
								sizes='(max-width: 1024px) 100vw, 50vw'
							/>
						</div>
						<Link
							href='/all-products'
							className='mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 underline-offset-4 hover:text-red-700 hover:underline'
						>
							{c.storeOpenLabel}
							<ArrowUpRight className='h-4 w-4 shrink-0' aria-hidden />
						</Link>
					</div>
				</div>
			</section>
		</div>
	)
}
