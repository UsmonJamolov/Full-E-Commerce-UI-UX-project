'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { loginSchema } from '@/lib/validation'
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form"
import z from "zod"


const SingInPage = () => {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: ''}
    })

    function onSubmit(values: z.infer<typeof loginSchema>) {
        console.log(values);
    }

    return (
        // <Card className='w-1/2 p-4 border-none border-0'>
            <div className="border border-1 w-1/3">

                <h2 className="text-xl font-bold">Log in to Exclucive</h2>
                <p>Enter your details below</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField 
                            control={form.control}
                            name='email'
                            render={({field}) => (
                                <FormItem className="space-y-0">
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name='password'
                            render={({field}) => (
                                <FormItem className="space-y-0">
                                    <FormControl>
                                        <Input placeholder="Password" type='password' {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-500" />
                                </FormItem>
                            )}
                        />
                        <Separator className="my-3" />
                        <div className="flex gap-1">
                            <Button type='submit' className="w-1/2">Log in</Button>
                            <Button asChild variant={'link'} className="w-1/2">
                                <Link href='/sign-up' className="text-xs text-red-500">Forget Password?</Link>
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        // </Card>
    )
}

export default SingInPage