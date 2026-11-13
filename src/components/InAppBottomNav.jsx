'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SvgIcon from './SvgIcon.jsx';

export default function InAppBottomNav() {
  const pathname = usePathname();

  const items = [
    { href: '/app', label: 'Home', icon: 'home' },
    { href: '/app/programmes', label: 'Programmes', icon: 'book' },
    { href: '/app/activities', label: 'Activities', icon: 'act' },
    { href: '/app/challenges', label: 'Challenges', icon: 'trophy' },
    { href: '/app/rewards', label: 'Rewards', icon: 'wallet' },
    { href: '/app/profile', label: 'Profile', icon: 'user' }
  ];

  return (
    <nav className="bmb" aria-label="Mobile Navigation">
      {items.map((item) => {
        const isActive = item.href === '/app' ? pathname === '/app' : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={isActive ? 'on' : ''}
          >
            <SvgIcon name={item.icon} size={20} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

