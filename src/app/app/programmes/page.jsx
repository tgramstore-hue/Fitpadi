'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import SceneSvg from '../../../components/SceneSvg.jsx';
import SvgIcon from '../../../components/SvgIcon.jsx';
import { useApp } from '../../../context/AppContext.jsx';
import { PRG, SCN } from '../../../data/appData.js';

function InAppProgrammesContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const { completedLessons } = useApp();

  const [activeTab, setActiveTab] = useState('all');
  const [query, setQuery] = useState(queryParam);

  const categories = [
    ['all', 'All'],
    ['mv', 'Movement'],
    ['mi', 'Mind & sleep'],
    ['nu', 'Nutrition']
  ];

  const filtered = PRG.filter((p) => {
    let matchesCat = true;
    if (activeTab === 'mv') matchesCat = ['act', 'dumb', 'shield', 'walk', 'run'].includes(p[0]);
    else if (activeTab === 'mi') matchesCat = ['heart', 'moon'].includes(p[0]);
    else if (activeTab === 'nu') matchesCat = ['leaf', 'food'].includes(p[0]);

    const matchesQ =
      !query ||
      p[1].toLowerCase().includes(query.toLowerCase()) ||
      p[2].toLowerCase().includes(query.toLowerCase()) ||
      p[3].toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQ;
  });

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <div className="sec-label">PROGRAMMES</div>
        <h2 style={{ fontSize: '26px', margin: '4px 0 6px', letterSpacing: '-0.02em' }}>
          Structured Health Pathways
        </h2>
        <p className="muted" style={{ fontSize: '14px', maxWidth: '640px' }}>
          Follow progressive multi-week routines designed with sports medicine and clinical physical therapy principles.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}
      >
        <div className="cps">
          {categories.map(([k, label]) => (
            <button
              key={k}
              className={`cp ${activeTab === k ? 'on' : ''}`}
              onClick={() => setActiveTab(k)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="bsr" style={{ height: '42px', maxWidth: '300px' }}>
          <SvgIcon name="search" size={18} />
          <input
            placeholder="Search programmes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="pgd" style={{ marginTop: 0 }}>
        {filtered.map((p) => {
          const originalIdx = PRG.findIndex((item) => item[1] === p[1]);
          const doneLessons = completedLessons[originalIdx] || (originalIdx === 0 ? [0, 1, 2] : originalIdx === 3 ? [0, 1, 2, 3] : []);
          const doneCount = doneLessons.length;
          const pct = Math.round((doneCount / 6) * 100);

          return (
            <Link
              key={originalIdx}
              href={`/app/programmes/${originalIdx}`}
              className="pcd card-box"
              style={{ textDecoration: 'none', padding: 0, overflow: 'hidden' }}
            >
              <div className="im" style={{ height: '170px' }}>
                <SceneSvg type={SCN[originalIdx]} color={p[4]} />
              </div>
              <div className="bd" style={{ padding: '20px 22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="tg">{p[2]}</span>
                  <span className="pill-tag" style={{ background: 'rgba(0,122,255,0.08)', color: '#007AFF' }}>
                    {pct}% done
                  </span>
                </div>
                <b style={{ fontSize: '18px', display: 'block', margin: '4px 0 6px', color: 'var(--tx)' }}>
                  {p[1]}
                </b>
                <small className="muted" style={{ display: 'block', margin: '0 0 14px', fontSize: '13px', lineHeight: 1.4 }}>
                  {p[3]}
                </small>
                <div className="pgb" style={{ height: '8px' }}>
                  <i style={{ width: `${pct}%` }} />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '12px',
                    fontSize: '12px',
                    color: 'var(--sub)'
                  }}
                >
                  <span>{doneCount} of 6 lessons finished</span>
                  <span style={{ color: 'var(--g)', fontWeight: 700 }}>Open &rarr;</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p className="muted">No programmes match your filter.</p>
        </div>
      )}
    </div>
  );
}

export default function InAppProgrammesPage() {
  return (
    <Suspense fallback={<div className="muted" style={{ padding: '40px' }}>Loading programmes...</div>}>
      <InAppProgrammesContent />
    </Suspense>
  );
}
