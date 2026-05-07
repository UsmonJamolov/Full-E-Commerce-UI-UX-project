'use client'

import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'

import { registerAdmin } from '@/actions/auth.action'
import { useI18n } from '@/components/providers/i18n-provider'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

function pickFirstValidationMessage(validationErrors: unknown): string | null {
  if (!validationErrors || typeof validationErrors !== 'object') return null
  const o = validationErrors as Record<string, unknown>
  const nested = (key: string) => {
    const v = o[key]
    if (v && typeof v === 'object' && v !== null && '_errors' in v) {
      const arr = (v as { _errors?: string[] })._errors
      if (Array.isArray(arr) && typeof arr[0] === 'string') return arr[0]
    }
    return null
  }
  for (const key of ['name', 'login', 'password', 'confirmPassword', 'adminKey']) {
    const m = nested(key)
    if (m) return m
  }
  const fe = (validationErrors as { fieldErrors?: Record<string, string[] | undefined> }).fieldErrors
  if (fe) {
    for (const key of ['name', 'login', 'password', 'confirmPassword', 'adminKey']) {
      const first = fe[key]?.[0]
      if (first) return first
    }
  }
  return null
}

function normalizePhoneDigits(value: string) {
  let cleaned = value.replace(/[^\d+]/g, '')
  if (cleaned.includes('+')) {
    cleaned = '+' + cleaned.replace(/\+/g, '')
  }
  return cleaned
}

export default function AdminSignUpPage() {
  const { dictionary } = useI18n()
  const t = dictionary.auth.adminSignUp

  const [name, setName] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [adminKey, setAdminKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error(t.toastPasswordMismatch)
      return
    }
    try {
      setIsLoading(true)
      const registerRes = await registerAdmin({
        name: name.trim(),
        login: login.trim(),
        password,
        confirmPassword,
        adminKey: adminKey.trim(),
      })

      if (registerRes?.validationErrors) {
        const msg = pickFirstValidationMessage(registerRes.validationErrors) ?? t.toastRegisterFailed
        toast.error(msg)
        return
      }

      if (registerRes?.serverError || !registerRes?.data) {
        const errMsg =
          registerRes?.serverError != null
            ? typeof registerRes.serverError === 'string'
              ? registerRes.serverError
              : JSON.stringify(registerRes.serverError)
            : null
        toast.error(errMsg || t.toastRegisterFailed)
        return
      }

      const data = registerRes.data as {
        success?: boolean
        message?: string
        failure?: string
        user?: { _id?: string }
      }

      if (data.failure || data.success === false) {
        toast.error(data.message || data.failure || t.toastRegisterFailed)
        return
      }

      const createdUser = data.user
      if (!createdUser?._id) {
        toast.error(t.toastRegisterFailed)
        return
      }

      const loginRes = await signIn('credentials', {
        userId: createdUser._id,
        redirect: false,
      })

      if (loginRes?.error) {
        toast.error(dictionary.auth.signIn.toastLoginFailed)
        return
      }

      toast.success(t.toastSuccess)
      window.location.href = '/admin'
    } catch {
      toast.error(t.toastRegisterFailed)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className='w-full border bg-card p-8 shadow-sm md:p-10'>
      <h1 className='text-3xl font-bold tracking-tight'>{t.title}</h1>
      <p className='mt-2 text-sm text-muted-foreground'>{t.subtitle}</p>

      <Separator className='my-6' />

      <div className='space-y-4'>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>{t.nameLabel}</label>
          <Input
            type='text'
            autoComplete='name'
            placeholder={t.namePlaceholder}
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>{t.loginLabel}</label>
          <Input
            type='text'
            autoComplete='username'
            placeholder={t.loginPlaceholder}
            value={login}
            onChange={e => {
              const v = e.target.value
              setLogin(v.includes('@') ? v : normalizePhoneDigits(v))
            }}
          />
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>{t.passwordLabel}</label>
          <Input
            type='password'
            autoComplete='new-password'
            placeholder={t.passwordPlaceholder}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>{t.confirmLabel}</label>
          <Input
            type='password'
            autoComplete='new-password'
            placeholder={t.confirmPlaceholder}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>{t.adminKeyLabel}</label>
          <Input
            type='password'
            autoComplete='off'
            placeholder={t.adminKeyPlaceholder}
            value={adminKey}
            onChange={e => setAdminKey(e.target.value)}
          />
        </div>

        <Button
          type='button'
          className='w-full bg-red-500 hover:bg-red-600'
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? t.submitting : t.submit}
        </Button>

        <div className='pt-2 text-center text-sm'>
          <Link href='/sign-in' className='text-blue-500'>
            {t.signInLink}
          </Link>
        </div>
      </div>
    </Card>
  )
}
