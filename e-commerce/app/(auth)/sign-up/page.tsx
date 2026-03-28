'use client';

import { useState } from 'react';

export default function SignUp() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+7');
  const [password, setPassword] = useState('');

  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // 🔹 OTP yuborish (register + send otp)
  const handleSendOTP = async () => {
    if (!name || !phone || !password) {
      setError("Barcha maydonlarni to‘ldiring");
      return;
    }

    if (phone.length < 10) {
      setError("Telefon raqam noto‘g‘ri");
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, password }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("SMS kod yuborildi (console’dan oling)");
        setStep(2);
      } else {
        setError(data.message || "Xatolik yuz berdi");
      }
    } catch (err) {
      setError("Server bilan bog'lanishda xatolik");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 OTP tekshirish
  const handleVerifyOTP = async () => {
    if (!otp) {
      setError("OTP kodni kiriting");
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Xatolik yuz berdi");
        return;
      }

      if (data.success) {
        localStorage.setItem("token", data.token);
        setMessage("Ro‘yxatdan o‘tish muvaffaqiyatli ✅");

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        setError(data.message || "OTP noto‘g‘ri");
      }

    } catch (err) {
      setError("Server bilan bog'lanishda xatolik");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create an account
        </h2>

        {/* 🔹 STEP 1: REGISTER */}
        {step === 1 && (
          <>
            {/* NAME */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* PHONE */}
            <div className="mb-4">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7..."
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
            >
              {loading ? "Yuborilmoqda..." : "Create Account"}
            </button>
          </>
        )}

        {/* 🔹 STEP 2: OTP */}
        {step === 2 && (
          <>
            <div className="mb-6">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP kod"
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
            >
              {loading ? "Tekshirilmoqda..." : "Tasdiqlash"}
            </button>
          </>
        )}

        {/* 🔹 MESSAGE */}
        {message && (
          <p className="mt-4 text-center text-green-600">{message}</p>
        )}

        {error && (
          <p className="mt-4 text-center text-red-600">{error}</p>
        )}

        <p className="text-xs text-gray-500 text-center mt-6">
          Telefon raqam (+7 bilan boshlanishi kerak)
        </p>

      </div>
    </div>
  );
}