'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo.jsx';
import SvgIcon from './SvgIcon.jsx';
import { NAVG } from '../data/appData.js';

export default function InAppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="side">
      <Link href="/" className="logo" aria-label="FitPadi home">
        <Logo height={30} />
      </Link>

      <nav aria-label="App">
        {NAVG.map((group, gIdx) => (
          <React.Fragment key={gIdx}>
            <div className="ng">{group[0]}</div>
            {group[1].map((item) => {
              const href = item[0] ? `/app/${item[0]}` : '/app';
              const isActive = item[0] ? pathname.startsWith(`/app/${item[0]}`) : pathname === '/app';
              return (
                <Link
                  key={item[0]}
                  href={href}
                  className={`${isActive ? 'on' : ''} ${item[3] ? '' : 'nm'}`}
                >
                  <SvgIcon name={item[2]} size={20} />
                  <span>{item[1]}</span>
                </Link>
              );
            })}
          </React.Fragment>
        ))}
      </nav>

      <Link className="bk" href="/">
        &larr; Back to website
      </Link>
    </aside>
  );
}

