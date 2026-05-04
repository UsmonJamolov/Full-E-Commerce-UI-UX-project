"use client";

import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { login } from "@/actions/auth.action";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useI18n } from "@/components/providers/i18n-provider";

function normalizePhoneDigits(value: string) {
  let cleaned = value.replace(/[^\d+]/g, "");
  if (cleaned.includes("+")) {
    cleaned = "+" + cleaned.replace(/\+/g, "");
  }
  return cleaned;
}

function pickFirstValidationMessage(validationErrors: unknown): string | null {
  if (!validationErrors || typeof validationErrors !== "object") return null;
  const o = validationErrors as Record<string, unknown>;
  const nested = (key: string) => {
    const v = o[key];
    if (v && typeof v === "object" && v !== null && "_errors" in v) {
      const arr = (v as { _errors?: string[] })._errors;
      if (Array.isArray(arr) && typeof arr[0] === "string") return arr[0];
    }
    return null;
  };
  for (const key of ["login", "password"]) {
    const m = nested(key);
    if (m) return m;
  }
  const fe = (validationErrors as { fieldErrors?: Record<string, string[] | undefined> })
    .fieldErrors;
  if (fe) {
    for (const key of ["login", "password"]) {
      const first = fe[key]?.[0];
      if (first) return first;
    }
  }
  return null;
}

function SignInForm() {
  const { dictionary } = useI18n();
  const t = dictionary.auth.signIn;
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const rawCallback = searchParams.get("callbackUrl") || "/";
  const callbackUrl =
    rawCallback.startsWith("/") && !rawCallback.startsWith("//")
      ? rawCallback
      : "/";

  const mapServerMessage = (msg: string) => {
    if (msg.includes("User topilmadi")) return t.toastUserNotFound;
    if (msg.includes("Password noto") || msg.toLowerCase().includes("password"))
      return t.toastWrongPassword;
    if (msg.includes("o‘chirilgan") || msg.includes("удалён") || msg.toLowerCase().includes("deleted"))
      return t.toastAccountDeleted;
    return msg;
  };

  const handleSubmit = async () => {
    if (!loginValue.trim() || !password) {
      toast.error(t.toastEnterCredentials);
      return;
    }

    setIsLoading(true);
    try {
      const res = await login({
        login: loginValue.trim(),
        password,
      });

      if (res?.validationErrors) {
        toast.error(pickFirstValidationMessage(res.validationErrors) ?? t.toastLoginInvalid);
        return;
      }

      if (res?.serverError) {
        toast.error(t.toastLoginFailed);
        return;
      }

      const d = res?.data as
        | { success?: boolean; message?: string; user?: { _id?: string } }
        | undefined;

      if (!d?.success || !d.user?._id) {
        toast.error(d?.message ? mapServerMessage(d.message) : t.toastLoginFailed);
        return;
      }

      const signInResult = await signIn("credentials", {
        userId: String(d.user._id),
        redirect: false,
        callbackUrl,
      });

      if (signInResult?.error) {
        toast.error(t.toastLoginFailed);
        return;
      }

      toast.success(t.toastSuccess);
      window.location.assign(callbackUrl);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full rounded-2xl border bg-card p-8 shadow-sm md:p-10">
      <h2 className="mb-2 text-3xl font-semibold tracking-tight">{t.title}</h2>
      <p className="mb-8 text-muted-foreground">{t.subtitle}</p>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.loginLabel}</label>
          <Input
            type="text"
            autoComplete="username"
            placeholder={t.loginPlaceholder}
            className="h-12"
            value={loginValue}
            onChange={(e) => {
              const v = e.target.value;
              setLoginValue(v.includes("@") ? v : normalizePhoneDigits(v));
            }}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.passwordLabel}</label>
          <Input
            type="password"
            autoComplete="current-password"
            placeholder={t.passwordPlaceholder}
            className="h-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="button"
          disabled={isLoading}
          onClick={handleSubmit}
          className="h-11 w-full bg-red-500 hover:bg-red-600"
        >
          {isLoading ? t.submitting : t.submit}
        </Button>
        <div className="pt-2 text-center text-sm">
          <Link href="/sign-up" className="text-blue-500">
            {t.signUpLink}
          </Link>
        </div>
      </div>
    </div>
  );
}

function SignInSuspenseFallback() {
  const { dictionary } = useI18n();
  return (
    <div className="w-full rounded-2xl border bg-card p-8 text-center text-muted-foreground shadow-sm">
      {dictionary.auth.signIn.loading}
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInSuspenseFallback />}>
      <SignInForm />
    </Suspense>
  );
}
