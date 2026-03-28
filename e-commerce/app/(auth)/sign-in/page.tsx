"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignInSection() {
  const [phone, setPhone] = useState("+7");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 OTP yuborish
  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      setError("Telefon raqam noto‘g‘ri");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/login-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (data.success) {
        setStep(2);
      } else {
        setError(data.message || "Xatolik");
      }
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 OTP tekshirish
  const handleVerifyOTP = async () => {
    if (!otp) {
      setError("OTP kiriting");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        setError("OTP noto‘g‘ri");
      }
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full flex justify-center px-6 py-16">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* IMAGE */}
        <div className="hidden lg:block">
          <img src="/login-image.png" className="w-full max-w-[500px]" />
        </div>

        {/* FORM */}
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-2">
            Log in to Exclusive
          </h2>

          <p className="text-gray-500 mb-8">
            Enter your details below
          </p>

          <div className="space-y-5">

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="h-12"
                />

                <Button
                  onClick={handleSendOTP}
                  className="w-full bg-red-500 hover:bg-red-600 h-11"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <Input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="h-12"
                />

                <Button
                  onClick={handleVerifyOTP}
                  className="w-full bg-green-600 hover:bg-green-700 h-11"
                >
                  {loading ? "Checking..." : "Verify"}
                </Button>
              </>
            )}

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* LINKS */}
            <div className="flex justify-between pt-2 text-sm">
              <Link href="/sign-up" className="text-blue-500">
                Sign Up
              </Link>

              <span className="text-gray-400">
                OTP orqali kirish
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}