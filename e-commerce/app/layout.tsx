import { ChildProps } from '@/types'
import Header from "@/components/header";
import "./globals.css";

import type { Metadata } from "next";
import { FC } from 'react';
import Navbar from '@/components/shared/navbar'
import { Toaster } from '@/components/ui/sonner';


export const metadata: Metadata = {
  title: "E-Commerce full project",
  description: "E-commerce website built with Next.js",
  icons: {icon: '/favicon.png'}
};

const RootLayout: FC<ChildProps> = ({children}) => {
  return (
    <html lang='en'>
      <body className='antialised flex flex-col justify-center items-center'>
        <Header />
        <main className="container max-w-6xl">{children}</main>
        <Toaster />
      </body>
    </html>
  )
}

export default RootLayout
