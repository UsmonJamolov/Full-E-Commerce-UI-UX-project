import { ChildProps } from '@/types'
import "./globals.css";

import type { Metadata } from "next";
import { FC } from 'react';
import Header from "@/components/header";
import { Toaster } from '@/components/ui/sonner';
import Footer from '@/components/footer';
import SessionProvider from '@/components/providers/session.provider'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';


// export const metadata: Metadata = {
//   title: "E-Commerce full project",
//   description: "E-commerce website built with Next.js",
//   icons: {icon: '/favicon.png'}
// };

const RootLayout: FC<ChildProps> = async ({children}) => {
  const session = await getServerSession(authOptions)

  if (!session) return redirect('/sign-in')
  
  return (
    <html lang='en'>
        <body className='antialised'>
        <SessionProvider>
                <div className='relative z-50 sticky top-0'>
                  <Header />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <main className="container max-w-6xl">
                      {children}
                  </main>
                </div>
              <div className="">
                <Footer />
              </div>
          <Toaster />
        </SessionProvider>
        </body>
      </html>
  )
}

export default RootLayout
