'use client';

import React from 'react';
import Link from 'next/link';
import SceneSvg from '../../../components/SceneSvg.jsx';
import SvgIcon from '../../../components/SvgIcon.jsx';
import { CRS, COL } from '../../../data/appData.js';

export default function InAppAcademyPage() {
  const scenes = ['walk', 'food', 'mind'];

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <div className="sec-label">HEALTH ACADEMY</div>
        <h2 style={{ fontSize: '26px', margin: '4px 0 6px', letterSpacing: '-0.02em' }}>
          Educational Health Courses &amp; Nutrition Science
        </h2>
        <p className="muted" style={{ fontSize: '14px', maxWidth: '640px' }}>
          Explore practical, evidence-based health courses designed for everyday longevity. Earn Health Fund points upon completing quizzes.
        </p>
      </div>

      <div className="pgd" style={{ marginTop: 0 }}>
        {CRS.map((k, i) => (
          <Link
            key={i}
            href={`/app/academy/${i}`}
            className="pcd card-box"
            style={{ textDecoration: 'none', padding: 0, overflow: 'hidden' }}
          >
            <div className="im" style={{ height: '170px' }}>
              <SceneSvg type={scenes[i % 3]} color={COL[i % 5]} />
            </div>
            <div className="bd" style={{ padding: '20px 22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="tg" style={{ fontSize: '11px', padding: '3px 9px' }}>
                  Course
                </span>
                <span className="pill-tag" style={{ background: 'rgba(0,122,255,0.08)', color: '#007AFF' }}>
                  +50 pts
                </span>
              </div>
              <b style={{ fontSize: '18px', display: 'block', margin: '4px 0 6px', color: 'var(--tx)' }}>
                {k[1]}
              </b>
              <small className="muted" style={{ display: 'block', lineHeight: 1.5, fontSize: '13px' }}>
                {k[2]}
              </small>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '16px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--ln)',
                  fontSize: '13px',
                  fontWeight: 700,
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
