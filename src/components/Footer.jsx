'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo.jsx';

export default function Footer() {
  const pathname = usePathname();
  const isAuth = ['/login', '/signup', '/forgot', '/verify', '/setup'].includes(pathname);
  const isInApp = pathname.startsWith('/app');

  if (isInApp || isAuth) {
    return null;
  }

  return (
    <footer id="ft">
      <div className="w">
        <div className="fg">
          <div>
            <Link href="/" className="logo" aria-label="FitPadi home">
              <Logo height={30} />
            </Link>
            <p className="muted" style={{ marginTop: '14px', maxWidth: '300px', fontSize: '15px' }}>
              Healthier habits through daily activities, health education and friendly community challenges.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/programmes">Programmes</Link></li>
              <li><Link href="/academy">Academy</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/impact">Health Fund</Link></li>
              <li><Link href="/app">Web app</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/signup">Create account</Link></li>
              <li><Link href="/login">Log in</Link></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/disclaimer">Health &amp; Ad Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="fb">
          <span>&copy; {new Date().getFullYear()} FitPadi. All rights reserved.</span>
          <span>FitPadi provides general wellness information, not medical advice.</span>
        </div>
      </div>
    </footer>
  );
}

