'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SvgIcon from '../../components/SvgIcon.jsx';
import { PRG } from '../../data/appData.js';

export default function ProgrammesPage() {
  const [filter, setFilter] = useState('all');

  const filtered = PRG.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'mv') return ['act', 'dumb', 'shield', 'walk', 'run'].includes(p[0]);
    if (filter === 'mi') return ['heart', 'moon'].includes(p[0]);
    if (filter === 'nu') return ['leaf', 'food'].includes(p[0]);
    return true;
  });

  return (
    <div className="pg">
      <div className="ph">
        <div className="w">
          <span className="eb">Programmes</span>
          <h1 style={{ fontSize: 'clamp(34px, 5vw, 52px)' }}>
            Health &amp; fitness programmes
          </h1>
          <p className="lead">
            Educational, evidence-informed programmes you can start at any time.
          </p>

          <div className="cps" style={{ marginTop: '24px' }}>
            {[
              ['all', 'All'],
              ['mv', 'Movement'],
              ['mi', 'Mind & sleep'],
              ['nu', 'Nutrition']
            ].map(([k, label]) => (
              <button
                key={k}
                className={`cp ${filter === k ? 'on' : ''}`}
                onClick={() => setFilter(k)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="s">
        <div className="w">
          <div className="grid">
            {filtered.map((p, j) => {
              const originalIdx = PRG.findIndex((item) => item[1] === p[1]);
              return (
                <Link
                  key={j}
                  href={`/app/programmes/${originalIdx}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="card rv"
                    style={{ '--c': p[4], '--d': `${(j % 3) * 80}ms`, minHeight: '260px', display: 'flex', flexDirection: 'column' }}
                  >
                    <div className="ico">
                      <SvgIcon name={p[0]} size={28} />
                    </div>
                    <h3>{p[1]}</h3>
                    <p style={{ marginTop: '8px', opacity: 0.9, fontSize: '16px' }}>{p[2]}</p>
                    {p[3] && (
                      <span className="tag" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                        {p[3]}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          <aside className="ad" aria-label="Advertisement" style={{ marginTop: '36px' }}>
            <span>Advertisement</span>
            <div>FitPadi Community Health Partner</div>
          </aside>

          <div className="note" style={{ marginTop: '28px' }}>
            <p>
              <b>Safety first.</b> Programmes are educational and do not diagnose, treat or prevent any condition. Speak to a doctor before starting a new activity programme, especially if you have a medical condition, and stop if you feel pain.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
