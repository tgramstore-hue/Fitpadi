'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '../../components/AuthLayout.jsx';
import SvgIcon from '../../components/SvgIcon.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function ForgotPasswordPage() {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your email address');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      showToast('Password reset link sent to your inbox');
    }, 600);
  };

  return (
    <AuthLayout>
      <h1 style={{ fontSize: '34px', letterSpacing: '-.03em', lineHeight: 1.1 }}>Forgot your password?</h1>
      <p className="muted" style={{ margin: '8px 0 26px' }}>
        Enter your email address and we will send you a link to reset your password.
      </p>

      {sent ? (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--mint)',
              color: 'var(--gd)',
              display: 'grid',
              placeItems: 'center',
              margin: '0 auto 16px',
              fontSize: '24px'
            }}
          >
            &check;
          </div>
          <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Check your inbox</h3>
          <p className="muted" style={{ fontSize: '15px', marginBottom: '24px' }}>
            We sent a password reset link to <b>{email}</b>. If you don&apos;t see it, check your spam folder.
          </p>
          <button className="btn sm o" onClick={() => setSent(false)}>
            Resend email
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
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
              />
            </div>
          </div>

          <button className="btn" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Sending link...' : 'Send reset link'}
          </button>
        </form>
      )}

      <p className="muted" style={{ textAlign: 'center', marginTop: '24px', fontSize: '15px' }}>
        Remember your password?{' '}
        <Link href="/login" style={{ color: 'var(--g)', fontWeight: 600 }}>
          Back to sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
