'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'

import { sendOtp, verifyOtp, register } from '@/actions/auth.action'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const SignUpPage = () => {
  // STEP 1
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('+7')
  const [password, setPassword] = useState('')

  // STEP 2
  const [otp, setOtp] = useState('')

  // UI STATES
  const [step, setStep] = useState<1 | 2>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isResend, setIsResend] = useState(false)

  // =========================
  // HELPERS
  // =========================
  const normalizePhone = (value: string) => {
    // faqat raqam va + qoldiramiz
    let cleaned = value.replace(/[^\d+]/g, '')

    // + faqat boshida bo'lsin
    if (cleaned.includes('+')) {
      cleaned = '+' + cleaned.replace(/\+/g, '')
    }

    return cleaned
  }

  const normalizeOtp = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 6)
  }

  // =========================
  // STEP 1: SEND OTP
  // =========================
  const handleSendOtp = async () => {
    if (!name.trim() || !phone.trim() || !password.trim()) {
      toast.error("Barcha maydonlarni to'ldiring")
      return
    }

    if (phone.replace(/\D/g, '').length < 10) {
      toast.error("Telefon raqam noto'g'ri")
      return
    }

    try {
      setIsLoading(true)

      const res = await sendOtp({
        name: name.trim(),
        phone: phone.trim(),
        password,
        type: 'register',
      })

      if (res?.serverError || res?.validationErrors || !res?.data) {
        toast.error('OTP yuborishda xatolik yuz berdi')
        return
      }

      if (res.data.failure) {
        toast.error(res.data.failure)
        return
      }

      if (res.data.status === 200) {
        setOtp('')
        setStep(2)
        setIsResend(false)
        toast.success('OTP muvaffaqiyatli yuborildi')
        return
      }

      toast.error('OTP yuborilmadi')
    } catch (error) {
      console.error(error)
      toast.error('Server error')
    } finally {
      setIsLoading(false)
    }
  }

  // =========================
  // STEP 2: VERIFY OTP
  // =========================
  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      toast.error('OTP kodni kiriting')
      return
    }

    if (otp.length < 4) {
      toast.error("OTP juda qisqa")
      return
    }

    try {
      setIsLoading(true)

      const otpRes = await verifyOtp({
        phone: phone.trim(),
        otp: otp.trim(),
      })

      if (otpRes?.serverError || otpRes?.validationErrors || !otpRes?.data) {
        toast.error('OTP tekshirishda xatolik')
        return
      }

      if (otpRes.data.failure) {
        toast.error(otpRes.data.failure)
        return
      }

      // OTP expired
      if (otpRes.data.status === 301) {
        setIsResend(true)
        toast.error('OTP eskirgan. Qayta yuboring')
        return
      }

      // OTP success
      if (otpRes.data.status === 200) {
      const registerRes = await register({
        name: name.trim(),
        phone: phone.trim(),
        password,
      })

      if (
        registerRes?.serverError ||
        registerRes?.validationErrors ||
        !registerRes?.data
      ) {
        toast.error("Ro'yxatdan o'tishda xatolik")
        return
      }

      if (registerRes.data.failure) {
        toast.error(registerRes.data.failure)
        return
      }

      const createdUser = registerRes.data.user

      if (!createdUser?._id) {
        toast.error("User ID topilmadi")
        return
      }

      toast.success("User muvaffaqiyatli yaratildi")

      const loginRes = await signIn('credentials', {
        userId: createdUser._id,
        redirect: false,
      })

      if (loginRes?.error) {
        toast.error('Login qilishda xatolik')
        return
      }

      window.location.href = '/'
      return
    }

      toast.error("OTP noto'g'ri")
    } catch (error) {
      console.error(error)
      toast.error('Server error')
    } finally {
      setIsLoading(false)
    }
  }

  // =========================
  // STEP 3: RESEND OTP
  // =========================
  const handleResendOtp = async () => {
    if (!name.trim() || !phone.trim() || !password.trim()) {
      toast.error("Ma'lumotlar yetarli emas")
      return
    }

    try {
      setIsLoading(true)

      const res = await sendOtp({
        name: name.trim(),
        phone: phone.trim(),
        password,
        type: 'register',
      })

      if (res?.serverError || res?.validationErrors || !res?.data) {
        toast.error('OTP qayta yuborishda xatolik')
        return
      }

      if (res.data.failure) {
        toast.error(res.data.failure)
        return
      }

      if (res.data.status === 200) {
        setOtp('')
        setIsResend(false)
        toast.success('OTP qayta yuborildi')
        return
      }

      toast.error('OTP qayta yuborilmadi')
    } catch (error) {
      console.error(error)
      toast.error('Server error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full border bg-card p-8 shadow-sm md:p-10">
            <h1 className="text-3xl font-bold tracking-tight">Sign Up</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Telefon raqamingiz orqali ro‘yxatdan o‘ting
            </p>

            <Separator className="my-6" />

            {/* ================= STEP 1 ================= */}
            {step === 1 && (
              <div className="space-y-4">
                {/* NAME */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    type="text"
                    placeholder="Ismingizni kiriting"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* PHONE */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone number</label>
                  <Input
                    type="tel"
                    placeholder="+79991234567"
                    value={phone}
                    onChange={(e) => setPhone(normalizePhone(e.target.value))}
                  />
                </div>

                {/* PASSWORD */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input
                    type="password"
                    placeholder="Parol kiriting"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button
                  type="button"
                  className="w-full"
                  onClick={handleSendOtp}
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending OTP...' : 'Continue'}
                </Button>
              </div>
            )}

            {/* ================= STEP 2 ================= */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="rounded-md border bg-muted/30 p-3 text-sm">
                  <p className="font-medium">OTP yuborildi:</p>
                  <p className="text-muted-foreground">{phone}</p>
                </div>

                {/* OTP */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">OTP Code</label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder="OTP kiriting"
                    value={otp}
                    onChange={(e) => setOtp(normalizeOtp(e.target.value))}
                    maxLength={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    4-6 xonali kodni kiriting
                  </p>
                </div>

                <Button
                  type="button"
                  className="w-full"
                  onClick={handleVerifyOtp}
                  disabled={isLoading}
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </Button>

                {isResend && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleResendOtp}
                    disabled={isLoading}
                  >
                    Resend OTP
                  </Button>
                )}

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setStep(1)
                    setOtp('')
                    setIsResend(false)
                  }}
                  disabled={isLoading}
                >
                  Back
                </Button>
              </div>
            )}
    </Card>
  )
}

export default SignUpPage