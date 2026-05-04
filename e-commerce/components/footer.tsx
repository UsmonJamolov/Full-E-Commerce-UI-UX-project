import type { ReactNode } from 'react'
import { MessageCircle, Send } from 'lucide-react'
import Link from 'next/link'

import type { PublicFooterSettings } from '@/lib/footer-public'
import type { Dictionary } from '@/lib/i18n/dictionaries'

type Props = {
  dictionary: Dictionary
  settings: PublicFooterSettings
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className='text-sm text-gray-300 transition hover:text-white'>
      {children}
    </Link>
  )
}

export default function Footer({ dictionary, settings }: Props) {
  const { footer } = dictionary

  const socialLinks = [
    { href: settings.telegramUrl, label: footer.telegram, Icon: Send },
    { href: settings.maxMessengerUrl, label: footer.maxMessenger, Icon: MessageCircle },
  ] as const

  return (
    <footer className='border-t border-gray-800 bg-black text-white'>
      <div className='mx-auto w-full max-w-6xl px-3 py-12 sm:px-4 md:py-14'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-12'>
          <div className='flex flex-col gap-6'>
            <Link
              href='/'
              className='flex h-14 w-14 items-center justify-center rounded-md border border-red-500/60 bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 text-[11px] font-black tracking-tight text-white transition hover:border-orange-400'
              aria-label={footer.homeAria}
            >
              600+
            </Link>
            <div className='flex flex-wrap gap-2'>
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={label}
                  className='flex h-10 w-10 items-center justify-center rounded-md border border-gray-600 bg-white/5 text-white transition hover:border-gray-500 hover:bg-white/10'
                >
                  <Icon className='h-4 w-4' />
                </a>
              ))}
            </div>
            <div className='flex gap-3 border-t border-gray-800 pt-6'>
              <div
                className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-red-500 text-[10px] font-bold leading-tight text-red-400'
                aria-hidden
              >
                #1
              </div>
              <p className='text-xs leading-relaxed text-gray-400'>{footer.brandBlurb}</p>
            </div>
          </div>

          <div className='min-w-0'>
            <h3 className='mb-4 text-base font-semibold text-white'>{footer.contact}</h3>
            <div className='flex flex-col gap-1 text-sm font-medium text-white'>
              <a href={`tel:${settings.phonePrimary}`} className='text-lg hover:text-gray-200'>
                {settings.phonePrimary}
              </a>
              <a href={`tel:${settings.phoneSecondary}`} className='text-base text-gray-200 hover:text-white'>
                {settings.phoneSecondary}
              </a>
            </div>
            <p className='mt-3 text-xs text-gray-400'>{settings.supportHours}</p>
            <a
              href={`mailto:${settings.email}`}
              className='mt-2 inline-block text-sm text-gray-300 underline-offset-4 hover:text-white hover:underline'
            >
              {settings.email}
            </a>
            <div className='mt-4 flex flex-col gap-2'>
              <FooterLink href='/contacts'>{footer.contacts}</FooterLink>
            </div>
            <div className='mt-5 flex flex-wrap gap-2'>
              <a
                href={settings.telegramUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 rounded-full border border-gray-600 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/10'
              >
                <Send className='h-3.5 w-3.5' />
                {footer.telegram}
              </a>
              <a
                href={settings.maxMessengerUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 rounded-full border border-gray-600 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/10'
              >
                <MessageCircle className='h-3.5 w-3.5' />
                {footer.maxMessenger}
              </a>
            </div>
          </div>
        </div>

        <div className='mt-12 flex flex-col gap-4 border-t border-gray-800 pt-8 md:flex-row md:items-start md:justify-between'>
          <p className='text-sm text-gray-400'>
            Copyright {new Date().getFullYear()} {footer.copyright}
          </p>
          <div className='flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-400'>
            <Link href='#' className='hover:text-white'>
              {footer.privacy}
            </Link>
            <span className='text-gray-600' aria-hidden>
              /
            </span>
            <Link href='#' className='hover:text-white'>
              {footer.terms}
            </Link>
            <span className='text-gray-600' aria-hidden>
              /
            </span>
            <Link href='#' className='hover:text-white'>
              {footer.sitemap}
            </Link>
          </div>
          <p className='max-w-md text-[11px] leading-snug text-gray-500 md:max-w-xs md:text-right'>
            {footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  )
}
