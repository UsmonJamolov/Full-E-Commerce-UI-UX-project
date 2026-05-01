'use client'

import Link from 'next/link'
import { MapPin, Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

type NavLink = { href: string; label: string }

type Props = {
  links: NavLink[]
  locationLabel: string
  locationAria: string
  menuTitle: string
}

export default function HeaderMobileNav({ links, locationLabel, locationAria, menuTitle }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden shrink-0' aria-label={menuTitle}>
          <Menu className='h-5 w-5' />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-[min(100vw-2rem,20rem)]'>
        <SheetHeader>
          <SheetTitle className='text-left'>{menuTitle}</SheetTitle>
        </SheetHeader>
        <nav className='mt-6 flex flex-col gap-1'>
          <div className='mb-4 flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-muted-foreground'>
            <MapPin className='h-4 w-4 shrink-0' aria-hidden />
            <span aria-label={locationAria}>{locationLabel}</span>
          </div>
          {links.map(l => (
            <SheetClose key={l.href} asChild>
              <Link
                href={l.href}
                className='rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted'
              >
                {l.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
