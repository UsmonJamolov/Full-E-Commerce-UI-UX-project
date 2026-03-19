"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignUpMain() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Account created!");
  };

  return (
    <main className="min-h-screen w-full bg-white flex items-center justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white overflow-hidden">
        {/* CHAPDA BANNER RASMI */}
        <div className="hidden md:flex items-center justify-center bg-[#EAF4FA]">
          <Image
            src="/images/signup-banner.png"
            alt="Register visual"
            width={420}
            height={420}
            priority
            unoptimized
            className="object-contain w-full h-full"
          />
        </div>

        {/* O‘NGDA FORMA BLOK */}
        <div className="flex items-center justify-center py-10">
          <div className="w-full max-w-[370px]">
            <h2 className="text-2xl font-bold mb-2">Create an account</h2>
            <p className="text-sm text-gray-700 mb-5">Enter your details below</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <Input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="off"
                className="rounded-none border-x-0 border-t-0 border-b border-gray-300 px-0 focus:ring-0 focus:border-blue-400"
              />
              <Input
                name="email"
                placeholder="Email or Phone Number"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="off"
                className="rounded-none border-x-0 border-t-0 border-b border-gray-300 px-0 focus:ring-0 focus:border-blue-400"
              />
              <Input
                name="password"
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="rounded-none border-x-0 border-t-0 border-b border-gray-300 px-0 focus:ring-0 focus:border-blue-400"
              />
              <Button
                type="submit"
                className="mt-4 bg-red-500 hover:bg-red-600 text-white rounded-none h-10 w-full"
              >
                Create Account
              </Button>
            </form>
            {/* Google Sign up */}
            <Button
              variant="outline"
              className="mt-3 flex items-center justify-center gap-2 w-full border-gray-300 hover:bg-gray-50 rounded-none"
              type="button"
            >
              <Image
                src="/images/google-icon.png"
                alt="Google"
                width={22}
                height={22}
                className="inline"
                unoptimized
              />
              <span className="text-sm font-medium text-gray-700">Sign up with Google</span>
            </Button>
            {/* Log in link */}
            <div className="mt-5 text-xs text-gray-700 text-center">
              Already have account?{" "}
              <Link href="/login" className="font-medium text-blue-500 hover:underline ml-1">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}