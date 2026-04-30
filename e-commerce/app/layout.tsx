import { ChildProps } from '@/types'
import "./globals.css";

import { FC } from 'react';
import Header from "@/components/header";
import { Toaster } from '@/components/ui/sonner';
import Footer from '@/components/footer';
import SessionProvider from '@/components/providers/session.provider'

// export const metadata: Metadata = {
//   title: "E-Commerce full project",
//   description: "E-commerce website built with Next.js",
//   icons: {icon: '/favicon.png'}
// };

const RootLayout: FC<ChildProps> = ({ children }) => {
  return (
    <html lang='en'>
        <body className='antialised'>
        <SessionProvider>
                <div className='site-global-header relative z-50 sticky top-0'>
                  <Header />
                </div>
                <div className="site-main-wrapper flex flex-col justify-center items-center">
                  <main className="site-main-content container max-w-6xl">
                      {children}
                  </main>
                </div>
              <div className="site-global-footer">
                <Footer />
              </div>
          <Toaster />
        </SessionProvider>
        </body>
      </html>
  )
}

export default RootLayout
