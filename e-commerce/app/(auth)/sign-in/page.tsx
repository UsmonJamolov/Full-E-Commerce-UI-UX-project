"use client";

import { Suspense, useState } from "react";
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
import { useSearchParams } from "next/navigation";

function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const rawCallback = searchParams.get("callbackUrl") || "/";
  const callbackUrl =
    rawCallback.startsWith("/") && !rawCallback.startsWith("//")
      ? rawCallback
      : "/";

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (values: { phone: string; password: string }) => {
    setIsLoading(true);
    try {
      const res = await login(values);

      if (res?.serverError) {
        toast.error(res.serverError);
        return;
      }
      if (res?.validationErrors) {
        toast.error("Ma'lumotlarni tekshiring");
        return;
      }

      if (!res?.data?.success) {
        toast.error(res?.data?.message || "Login muvaffaqiyatsiz");
        return;
      }

      const userId = res.data.user?._id;
      if (!userId) {
        toast.error("Foydalanuvchi ma'lumotlari topilmadi");
        return;
      }

      const signInResult = await signIn("credentials", {
        userId: String(userId),
        redirect: false,
        callbackUrl,
      });

      if (signInResult?.error) {
        toast.error(signInResult.error);
        return;
      }

      toast.success("Muvaffaqiyatli kirdingiz");
      window.location.assign(callbackUrl);
    } finally {
      setIsLoading(false);
    }
  };

  const onInvalid = () => {
    toast.error("Telefon va parolni to‘g‘ri kiriting");
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
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
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
              disabled={isLoading}
              className="w-full bg-red-500 hover:bg-red-600 h-11"
            >
              {isLoading ? "Kutilmoqda..." : "Login"}
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

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <section className="w-full flex justify-center px-6 py-16">
          <p className="text-muted-foreground">Yuklanmoqda...</p>
        </section>
      }
    >
      <SignInForm />
    </Suspense>
  );
}