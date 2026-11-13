'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '../../components/AuthLayout.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function VerifyPage() {
  const router = useRouter();
  const { showToast } = useApp();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [seconds, setSeconds] = useState(30);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const handleInputChange = (idx, val) => {
    if (val.length > 1) val = val.slice(-1);
    const newCode = [...code];
    newCode[idx] = val;
    setCode(newCode);

    if (val && idx < 5) {
      const nextInput = document.getElementById(`otp-${idx + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = (e) => {
    if (e) e.preventDefault();
    setVerifying(true);
    setTimeout(() => {
      showToast('Email verified successfully!');
      router.push('/setup');
    }, 600);
  };

  const handleResend = () => {
    setSeconds(30);
    showToast('New code sent to your email.');
  };

  return (
    <AuthLayout>
      <h1 style={{ fontSize: '34px', letterSpacing: '-.03em', lineHeight: 1.1 }}>Verify your email</h1>
      <p className="muted" style={{ margin: '8px 0 26px' }}>
        Enter the 6-digit code sent to your email.
      </p>

      <form onSubmit={handleVerify}>
        <div className="otp" style={{ margin: '20px 0 28px' }}>
          {code.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(i, e.target.value)}
              required
            />
          ))}
        </div>

        <button className="btn" style={{ width: '100%' }} disabled={verifying}>
          {verifying ? 'Verifying...' : 'Verify email'}
        </button>
      </form>

      <p className="muted" style={{ textAlign: 'center', marginTop: '24px', fontSize: '15px' }}>
        Didn&apos;t get the code?{' '}
        <button
          type="button"
          className="lkb"
          disabled={seconds > 0}
          onClick={handleResend}
        >
          {seconds > 0 ? `Resend in ${seconds}s` : 'Resend code'}
        </button>
      </p>
    </AuthLayout>
  );
}
