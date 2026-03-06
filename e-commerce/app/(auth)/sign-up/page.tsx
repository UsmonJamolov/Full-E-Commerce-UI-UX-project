'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { registerSchema } from '@/lib/validation'
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form"
import z from "zod"


const SingUpPage = () => {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {username: '', email: '', password: ''}
    })

    function onSubmit(values: z.infer<typeof registerSchema>) {
        console.log(values);
    }

    return (
        <Card className='w-1/2 p-4'>
            <h2 className="text-xl font-bold">Create an account</h2>
            <p>Enter your details below</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField 
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem className="space-y-0">
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage className="text-xs text-red-500" />
                            </FormItem>
                        )}
                    />
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
                        name='email'
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
                    <Button type='submit' className="w-full">Create Account</Button>
                </form>
            </Form>

            <div className="mt-4">
                <div className="text-sm text-muted-foreground">
                    Already have account?{' '}
                    <Button asChild variant={'link'} className="p-0">
                        <Link href='/sign-up'>Log in</Link>
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default SingUpPage