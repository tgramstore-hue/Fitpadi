'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SvgIcon from './SvgIcon.jsx';

export default function InAppBottomNav() {
  const pathname = usePathname();

  const items = [
    { href: '/app', label: 'Home', icon: 'home', hasDot: true },
    { href: '/app/challenges', label: 'TOP', icon: 'trophy' },
    { href: '/app/activities', label: 'Activities', icon: 'act' },
    { href: '/app/rewards', label: 'Rewards', icon: 'wallet' },
    { href: '/app/referrals', label: 'Friends', icon: 'users' }
  ];

  return (
    <nav className="bmb" aria-label="App Floating Navigation">
      {items.map((item) => {
        const isActive =
          item.href === '/app' ? pathname === '/app' : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={isActive ? 'on' : ''}
          >
            <div style={{ position: 'relative' }}>
              <SvgIcon name={item.icon} size={20} />
              {item.hasDot && !isActive && <span className="b-dot" />}
            </div>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
