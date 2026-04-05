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

  // 🔹 REGISTER + OTP
  const handleSendOTP = async () => {
    if (!name || !phone || !password) {
      setError("Barcha maydonlarni to‘ldiring");
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, password }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("OTP kod yuborildi (console’da)");
        setStep(2);
      } else {
        setError(data.message || "Xatolik");
      }

    } catch (err) {
      console.error(err);
      setError("Server xatosi");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 OTP VERIFY
  const handleVerifyOTP = async () => {
    if (!otp) {
      setError("OTP kiriting");
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('http://localhost:8080/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        setMessage("Muvaffaqiyatli ✅");

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        setError(data.message || "OTP noto‘g‘ri");
      }

    } catch (err) {
      console.error(err);
      setError("Server xatosi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 border rounded w-80">

        <h2 className="text-xl mb-4 text-center">Sign Up</h2>

        {step === 1 && (
          <>
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-2 p-2 border"
            />

            <input
              placeholder="+7..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mb-2 p-2 border"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-2 p-2 border"
            />

            <button
              onClick={handleSendOTP}
              className="w-full bg-red-500 text-white p-2"
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mb-2 p-2 border"
            />

            <button
              onClick={handleVerifyOTP}
              className="w-full bg-green-600 text-white p-2"
            >
              {loading ? "Checking..." : "Verify"}
            </button>
          </>
        )}

        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}

      </div>
    </div>
  );
}