'use client';

import React from 'react';
import Link from 'next/link';
import SceneSvg from '../../../components/SceneSvg.jsx';
import { CRS, COL } from '../../../data/appData.js';

export default function InAppAcademyPage() {
  const scenes = ['walk', 'food', 'mind'];

  return (
    <div>
      <div className="pgd" style={{ marginTop: 0 }}>
        {CRS.map((k, i) => (
          <Link
            key={i}
            href={`/app/academy/${i}`}
            className="pcd"
            style={{ textDecoration: 'none' }}
          >
            <div className="im">
              <SceneSvg type={scenes[i % 3]} color={COL[i % 5]} />
            </div>
            <div className="bd">
              <span className="bct" style={{ fontSize: '11px', padding: '3px 9px' }}>
                Course
              </span>
              <b style={{ fontSize: '17px', display: 'block', margin: '6px 0 4px' }}>
                {k[1]}
              </b>
              <small style={{ display: 'block', lineHeight: 1.5 }}>{k[2]}</small>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--g)'
                }}
              >
                <span>{k[3]} lessons · {k[4]} min</span>
                <span>Start course &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
