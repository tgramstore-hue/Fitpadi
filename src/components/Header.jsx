'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo.jsx';
import SvgIcon from './SvgIcon.jsx';
import { NAVL } from '../data/appData.js';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // If inside in-app routes (/app/*) or auth pages (/login, /signup, etc.), public header is not rendered or handled differently
  const isAuth = ['/login', '/signup', '/forgot', '/verify', '/setup'].includes(pathname);
  const isInApp = pathname.startsWith('/app');

  if (isInApp || isAuth) {
    return null;
  }

  return (
    <header id="nav">
      <div className="w nv">
        <Link href="/" className="logo" aria-label="FitPadi home">
          <Logo height={34} />
        </Link>

        <nav id="links" className={mobileOpen ? 'open' : ''} aria-label="Main">
          {NAVL.map((n) => {
            const href = n[0] === '' ? '/' : `/${n[0]}`;
            const isActive = n[0] === '' ? pathname === '/' : pathname.startsWith(`/${n[0]}`);
            return (
              <Link
                key={n[0]}
                href={href}
                className={isActive ? 'on' : ''}
                onClick={() => setMobileOpen(false)}
              >
                {n[1]}
              </Link>
            );
          })}
          <Link
            href="/login"
            style={{ padding: '9px 14px', borderRadius: '999px', fontWeight: 500, color: 'var(--sub)' }}
            onClick={() => setMobileOpen(false)}
          >
            Log in
          </Link>
        </nav>

        <Link className="btn sm" href="/signup">
          Get started
        </Link>

        <button
          id="mb"
          aria-label="Open menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <SvgIcon name={mobileOpen ? 'close' : 'menu'} size={24} />
        </button>
      </div>
    </header>
  );
}

