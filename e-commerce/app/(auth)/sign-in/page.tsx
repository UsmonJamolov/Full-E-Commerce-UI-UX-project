// 'use client'

// import { Button } from "@/components/ui/button";
// // import { Card } from "@/components/ui/card";
// import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import { loginSchema } from '@/lib/validation'
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import { useForm } from "react-hook-form"
// import z from "zod"


// const SingInPage = () => {
//     const form = useForm<z.infer<typeof loginSchema>>({
//         resolver: zodResolver(loginSchema),
//         defaultValues: { email: '', password: ''}
//     })

//     function onSubmit(values: z.infer<typeof loginSchema>) {
//         console.log(values);
//     }

//     return (
//         // <Card className='w-1/2 p-4 border-none border-0'>
//             <div className="border border-1 w-1/3">

//                 <h2 className="text-xl font-bold">Log in to Exclucive</h2>
//                 <p>Enter your details below</p>
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
//                         <FormField 
//                             control={form.control}
//                             name='email'
//                             render={({field}) => (
//                                 <FormItem className="space-y-0">
//                                     <FormControl>
//                                         <Input placeholder="Email" {...field} />
//                                     </FormControl>
//                                     <FormMessage className="text-xs text-red-500" />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField 
//                             control={form.control}
//                             name='password'
//                             render={({field}) => (
//                                 <FormItem className="space-y-0">
//                                     <FormControl>
//                                         <Input placeholder="Password" type='password' {...field} />
//                                     </FormControl>
//                                     <FormMessage className="text-xs text-red-500" />
//                                 </FormItem>
//                             )}
//                         />
//                         <Separator className="my-3" />
//                         <div className="flex gap-1">
//                             <Button type='submit' className="w-1/2">Log in</Button>
//                             <Button asChild variant={'link'} className="w-1/2">
//                                 <Link href='/sign-up' className="text-xs text-red-500">Forget Password?</Link>
//                             </Button>
//                         </div>
//                     </form>
//                 </Form>
//             </div>
//         // </Card>
//     )
// }

// export default SingInPage

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignInSection() {
  return (
    <section className="w-full flex justify-center px-6 py-16">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT IMAGE */}
        <div className="hidden lg:block">
          <img
            src="/login-image.png"
            alt="login"
            className="w-full max-w-[500px]"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-2">
            Log in to Exclusive
          </h2>

          <p className="text-gray-500 mb-8">
            Enter your details below
          </p>

          <div className="space-y-5">
            <Input
              type="text"
              placeholder="Email or Phone Number"
              className="h-12"
            />

            <Input
              type="password"
              placeholder="Password"
              className="h-12"
            />

            <div className="flex items-center justify-between pt-2">
              <Button className="bg-red-500 hover:bg-red-600 text-white px-8 h-11">
                Log In
              </Button>

              <div className="flex gap-1">
                <Link href="/sign-up" className="font-medium text-blue-500 hover:underline ml-1">
                    Sign Up
                </Link>

                <button className="text-red-500 text-sm hover:underline">
                    Forgot Password?
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}