'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('fp_ck');
      if (!consent) {
        const timer = setTimeout(() => setShow(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {}
  }, []);

  const handleConsent = (level) => {
    try {
      localStorage.setItem('fp_ck', level);
    } catch (e) {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div id="ck" className="show" role="dialog" aria-label="Cookie consent">
      <b>Your privacy choices</b>
      <p className="muted" style={{ marginTop: '6px' }}>
        We use essential cookies to run FitPadi. With your consent we and our advertising partners also use cookies to measure usage and improve your experience. Read our{' '}
        <Link href="/privacy" style={{ color: 'var(--g)', fontWeight: 600 }}>
          Privacy Policy
        </Link>.
      </p>
      <div className="cta">
        <button className="btn sm" onClick={() => handleConsent('all')}>
          Accept all
        </button>
        <button className="btn sm o" onClick={() => handleConsent('ess')}>
          Essential only
        </button>
      </div>
    </div>
  );
}

