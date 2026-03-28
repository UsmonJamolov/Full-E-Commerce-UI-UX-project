import { ChildProps } from '@/types'
import "./globals.css";

import type { Metadata } from "next";
import { FC } from 'react';
// import Navbar from '@/components/shared/navbar'
import Header from "@/components/header";
import { Toaster } from '@/components/ui/sonner';
import Footer from '@/components/footer';
import { SessionProvider } from "next-auth/react";
import Providers from '@/components/providers/providers';


export const metadata: Metadata = {
  title: "E-Commerce full project",
  description: "E-commerce website built with Next.js",
  icons: {icon: '/favicon.png'}
};

const RootLayout: FC<ChildProps> = ({children}) => {
  return (
    <html lang='en'>
      <body className='antialised'>
            <Providers>
              <div className='relative z-50 sticky top-0'>
                <Header />
              </div>
              <div className="flex flex-col justify-center items-center">
                <main className="container max-w-6xl">
                    {children}
                </main>
              </div>
            </Providers>
            <div className="">
              <Footer />
            </div>
        <Toaster />
      </body>
    </html>
  )
}

export default RootLayout
