// import { ChildProps } from '@/types'
// import Image from 'next/image'
// import { FC } from 'react'

// const AuthLayout: FC<ChildProps> = ({ children }) => {
// 	return (
// 		<div className="hidden md:flex items-center justify-center ">
// 		<div className="bg-[#EAF4FA]">
			
// 		</div>
//           <Image
//             src="/images/signup-banner.png"
//             alt="Register visual"
//             width={420}
//             height={420}
//             priority
//             unoptimized
//             className="object-contain w-full h-full"
//           />
// 			<section className='flex justify-center gap-4'>
// 				{children}
// 			</section>
// 		</div>
// 	)
// }

// export default AuthLayout

import { ChildProps } from "@/types";
import Image from "next/image";
import { FC } from "react";

const AuthLayout: FC<ChildProps> = ({ children }) => {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-200px)]">
      
      {/* LEFT SIDE */}
      <div className="hidden md:flex items-center justify-center bg-[#EAF4FA]">
        <div className="max-w-[500px] w-full flex justify-center">
          <Image
            src="/images/signup-banner.png"
            alt="auth"
            width={400}
            height={400}
            className="object-contain w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

    </section>
  );
};

export default AuthLayout;