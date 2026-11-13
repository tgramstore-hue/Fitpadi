'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo.jsx';
import SvgIcon from './SvgIcon.jsx';
import SceneSvg from './SceneSvg.jsx';
import { AUBL } from '../data/appData.js';

export default function AuthLayout({ children }) {
  return (
    <div className="au pg">
      <aside className="aul">
        <Link href="/" className="logo" aria-label="FitPadi home">
          <Logo height={34} colorMode="wh" />
        </Link>

        <div className="hd2" style={{ margin: 'auto 0 20px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.15 }}>
            Healthier habits start here
          </h2>
          <p style={{ opacity: 0.92, margin: '14px 0 28px', fontSize: '18px', maxWidth: '420px', lineHeight: 1.5 }}>
            Join a supportive free community building lifelong wellness, one day at a time.
          </p>

          <div className="bls">
            {AUBL.map((benefit, idx) => (
              <div key={idx} className="bl">
                <span>
                  <SvgIcon name="chk" size={16} />
                </span>
                {benefit}
              </div>
            ))}
          </div>
        </div>

        <div className="aui">
          <SceneSvg type="walk" color="#15803D" />
        </div>

        <small style={{ opacity: 0.75, fontSize: '14px', marginTop: '10px' }}>
          &copy; {new Date().getFullYear()} FitPadi. All rights reserved.
        </small>
      </aside>

      <div className="aur">
        <div className="atp">
          <Link href="/" style={{ color: 'var(--sub)' }}>
            &larr; Back to website
          </Link>
          <div style={{ color: 'var(--sub)' }}>
            Need help?{' '}
            <Link href="/contact" style={{ color: 'var(--g)', fontWeight: 600 }}>
              Contact support
            </Link>
          </div>
        </div>

        <div className="afm">{children}</div>
      </div>
    </div>
  );
}
