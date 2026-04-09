"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { loginSchema } from "@/lib/validation";
import { login } from "@/actions/auth.action";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";

export default function SignInSection() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "+7",
      password: "",
    },
  });

  const onSubmit = async (values: { phone: string; password: string }) => {
  const res = await login(values);

  if (!res?.data?.success) {
    console.log(res?.data?.message);
    return;
  }

  const userId = res?.data?.user?._id;

  if (!userId) {
    console.log("User ID topilmadi");
    return;
  }

  if (res.data.user) {
			toast.success('Logged in successfully')
			signIn('credentials', { userId: res.data.user._id, callbackUrl: '/' })
		}

  console.log("Login bo'ldi");
};

  return (
    <section className="w-full flex justify-center px-6 py-16">
      <div className="w-full max-w-2xl">
        {/* FORM */}
        <div className="w-full mx-auto">
          <h2 className="text-3xl font-semibold mb-2">
            Log in to Exclusive
          </h2>

          <p className="text-gray-500 mb-8">
            Enter your details below
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* PHONE */}
            <Input
              type="tel"
              placeholder="Phone Number"
              className="h-12"
              {...form.register("phone")}
            />

            {/* ERROR */}
            {form.formState.errors.phone && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.phone.message}
              </p>
            )}

            {/* PASSWORD */}
            <Input
              type="password"
              placeholder="Password"
              className="h-12"
              {...form.register("password")}
            />

            {/* ERROR */}
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.password.message}
              </p>
            )}

            {/* BUTTON */}
            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 h-11"
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>

            {/* LINKS */}
            <div className="flex justify-between pt-2 text-sm">
              <Link href="/sign-up" className="text-blue-500">
                Sign Up
              </Link>

              <span className="text-gray-400">
                Password orqali kirish
              </span>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}