'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLayout from '../../components/AuthLayout.jsx';
import SvgIcon from '../../components/SvgIcon.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter your email and password');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      showToast('Welcome back, David!');
      router.push('/app');
    }, 600);
  };

  return (
    <AuthLayout>
      <h1 style={{ fontSize: '34px', letterSpacing: '-.03em', lineHeight: 1.1 }}>Welcome back</h1>
      <p className="muted" style={{ margin: '8px 0 26px' }}>
        Log in to continue your missions, track streaks and check your points.
      </p>

      <button
        type="button"
        className="so"
        onClick={() => {
          showToast('Signed in with Google');
          router.push('/app');
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
          />
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
          />
          <path
            fill="#FBBC05"
            d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9z"
          />
          <path
            fill="#34A853"
            d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
          />
        </svg>
        Continue with Google
      </button>

      <div className="dv">or sign in with email</div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>
            Email address
          </label>
          <div className="fi">
            <SvgIcon name="mail" size={18} />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label style={{ fontWeight: 600, fontSize: '14px' }}>Password</label>
            <Link href="/forgot" style={{ fontSize: '13px', color: 'var(--g)', fontWeight: 600 }}>
              Forgot password?
            </Link>
          </div>
          <div className="fi">
            <SvgIcon name="lock" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              <SvgIcon name={showPassword ? 'eyeOff' : 'eye'} size={18} />
            </button>
          </div>
        </div>

        <button className="btn" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <p className="muted" style={{ textAlign: 'center', marginTop: '24px', fontSize: '15px' }}>
        Don&apos;t have an account?{' '}
        <Link href="/signup" style={{ color: 'var(--g)', fontWeight: 600 }}>
          Create free account
        </Link>
      </p>
    </AuthLayout>
  );
}
