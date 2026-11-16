'use client';

import React, { useState } from 'react';
import SvgIcon from '../../../components/SvgIcon.jsx';
import { useApp } from '../../../context/AppContext.jsx';

export default function ReferralsPage() {
  const { showToast } = useApp();
  const refCode = 'FITPADI-D7K2';
  const refLink = 'https://fitpadi.com/#/signup?ref=FITPADI-D7K2';

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(refLink);
    }
    setCopied(true);
    showToast('Referral link copied to clipboard!');
    setTimeout(() => setCopied(false), 2400);
  };

  const friendsList = [
    {
      name: 'Etoma Ettah',
      initials: 'EE',
      bg: '#16A34A',
      subtitle: 'Step 1: 0 of 3',
      status: 'Not counted',
      type: 'tag'
    },
    {
      name: 'Idogho Hannah',
      initials: 'IH',
      bg: '#7C3AED',
      subtitle: 'Step 1: 0 of 3',
      status: 'Not counted',
      type: 'tag'
    },
    {
      name: 'Chris Humble',
      initials: 'CH',
      bg: '#2563EB',
      subtitle: 'Every task done',
      points: '+3,927 for you',
      type: 'points'
    },
    {
      name: 'John Irwin',
      initials: 'JI',
      bg: '#475569',
      subtitle: 'Step 1: 0 of 3',
      status: 'Not counted',
      type: 'tag'
    },
    {
      name: 'Willie Owai',
      initials: 'WO',
      bg: '#0D9488',
      subtitle: '7-day streak active',
      points: '+1,271 for you',
      type: 'points'
    },
    {
      name: 'Amara Okoro',
      initials: 'AO',
      bg: '#F97316',
      subtitle: 'Every task done',
      points: '+4,500 for you',
      type: 'points'
    }
  ];

  return (
    <div className="gr" style={{ paddingBottom: '90px' }}>
      {/* Top 2 Big Stats Cards Side-by-Side (Image 5) */}
      <div className="s6">
        <div className="card-box" style={{ textAlign: 'center', padding: '24px' }}>
          <b style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-0.03em', display: 'block', lineHeight: 1.1 }}>
            9
          </b>
          <span className="muted" style={{ fontSize: '14px', fontWeight: 600 }}>
            friends joined
          </span>
        </div>
      </div>

      <div className="s6">
        <div className="card-box" style={{ textAlign: 'center', padding: '24px' }}>
          <b style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-0.03em', display: 'block', lineHeight: 1.1, color: '#D97706' }}>
            24,993
          </b>
          <span className="muted" style={{ fontSize: '14px', fontWeight: 600 }}>
            Points from friends
          </span>
        </div>
      </div>

      {/* Left Column: Rewards For Each Friend + Guidelines (span 6) */}
      <div className="s6">
        <span className="sec-label">FOR EACH FRIEND</span>
        <div className="card-box">
          {/* Row 1: Step 1 */}
          <div className="card-row">
            <div className="num-badge">1</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <b style={{ fontSize: '15px', display: 'block', color: 'var(--tx)' }}>
                Friend finishes step 1
              </b>
              <small className="muted" style={{ fontSize: '13px' }}>
                <b style={{ color: '#D97706' }}>+300 Points</b> and a bonus reward for you
              </small>
            </div>
          </div>

          {/* Row 2: Step 2 */}
          <div className="card-row">
            <div className="num-badge">2</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <b style={{ fontSize: '15px', display: 'block', color: 'var(--tx)' }}>
                Friend finishes every task
              </b>
              <small className="muted" style={{ fontSize: '13px' }}>
                A mystery Health Fund pool reward for you: <b style={{ color: '#D97706' }}>$2.00 CASH</b>
              </small>
            </div>
          </div>

          {/* Row 3: Faster Payout Speed Multiplier */}
          <div className="card-row">
            <div className="flat-sq sq-red" style={{ width: '38px', height: '38px', borderRadius: '12px' }}>
              <SvgIcon name="flame" size={20} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <b style={{ fontSize: '15px', display: 'block', color: 'var(--tx)' }}>
                A faster pool payout
              </b>
              <small className="muted" style={{ fontSize: '13px', lineHeight: 1.4, display: 'block' }}>
                Each friend takes 0.3% off your payout cycle, down to every 7 days.
                <br />
                <span style={{ color: 'var(--g)', fontWeight: 600 }}>
                  Yours: cycle every 14 days (-2.7%)
                </span>
              </small>
            </div>
          </div>
        </div>

        <p className="muted" style={{ fontSize: '12px', margin: '10px 4px 18px', lineHeight: 1.5 }}>
          Step 1 is 3 healthy missions, every task is verified. Your friend sees them in the Activities and Missions tabs.
        </p>

        {/* Sunset Feature Notice Banner (Image 1) */}
        <div className="banner-orange">
          <div className="banner-icon">
            <SvgIcon name="clock" size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: '15px', display: 'block', lineHeight: 1.25 }}>
              Only verified active members count
            </b>
            <p style={{ margin: '3px 0 0', fontSize: '12px', opacity: 0.95, lineHeight: 1.4 }}>
              Friends must log at least 3 days of steps or workout sessions to unlock cash pool rewards.
            </p>
          </div>
        </div>

        {/* Share Action Container */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button
            className="pill-btn pill-blue"
            style={{ flex: 1, height: '48px', fontSize: '16px', gap: '8px' }}
            onClick={handleCopy}
          >
            <SvgIcon name="msg" size={20} />
            <span>{copied ? 'Link Copied!' : 'Invite friends'}</span>
          </button>
          <button
            className="pill-btn pill-outline"
            style={{ width: '48px', height: '48px', padding: 0 }}
            onClick={handleCopy}
            title="Copy referral link"
          >
            <SvgIcon name="copy" size={20} />
          </button>
        </div>
      </div>

      {/* Right Column: Your Friends List (span 6 - Image 5) */}
      <div className="s6">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '0 4px' }}>
          <span className="sec-label" style={{ margin: 0 }}>
            YOUR FRIENDS
          </span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--sub)' }}>
            {friendsList.length} total
          </span>
        </div>

        <div className="card-box">
          {friendsList.map((f, idx) => (
            <div key={idx} className="card-row">
              {/* Circular Avatar */}
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: f.bg,
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 800,
                  fontSize: '15px',
                  flex: 'none'
                }}
              >
                {f.initials}
              </div>

              {/* Name & status */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <b style={{ fontSize: '15px', display: 'block', color: 'var(--tx)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {f.name}
                </b>
                <small
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    color: f.type === 'points' ? '#16A34A' : '#D97706',
                    fontWeight: 600
                  }}
                >
                  {f.subtitle}
                </small>
              </div>

              {/* Right Tag / Points */}
              {f.type === 'points' ? (
                <div style={{ textAlign: 'right' }}>
                  <b style={{ color: '#D97706', fontSize: '15px', display: 'block' }}>
                    {f.points}
                  </b>
                  <small className="muted" style={{ fontSize: '11px' }}>
                    Health Fund
                  </small>
                </div>
              ) : (
                <span className="pill-tag">
                  {f.status}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
