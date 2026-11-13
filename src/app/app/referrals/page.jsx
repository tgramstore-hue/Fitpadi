'use client';

import React from 'react';
import SvgIcon from '../../../components/SvgIcon.jsx';
import { useApp } from '../../../context/AppContext.jsx';

export default function ReferralsPage() {
  const { showToast } = useApp();
  const refCode = 'DAVID-PAD18';
  const refLink = 'https://fitpadi.com/#/signup?ref=DAVID-PAD18';

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(refLink);
    }
    showToast('Referral link copied to clipboard!');
  };

  return (
    <div className="gr">
      {/* Brand Green Banner Header */}
      <div
        className="pn s12"
        style={{
          background: 'var(--g)',
          border: 0,
          color: '#fff',
          padding: '28px 32px'
        }}
      >
        <span className="eb" style={{ color: 'var(--mint)' }}>
          Referral programme
        </span>
        <h2 style={{ color: '#fff', margin: '6px 0 10px', fontSize: 'clamp(26px, 3vw, 34px)' }}>
          Invite friends and earn together
        </h2>
        <p style={{ opacity: 0.92, maxWidth: '600px', fontSize: '16px' }}>
          Give your friends a healthy head start. When they join and complete their first 7 days of missions, you both receive $2.00 in cash pool rewards.
        </p>
      </div>

      {/* 4 KPIs with authentic --c colors */}
      <div className="kp s3" style={{ '--c': '#16A34A' }}>
        <span className="ki">
          <SvgIcon name="users" size={22} />
        </span>
        <div>
          <small>Total referrals</small>
          <b>12</b>
          <em>All time</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#2563EB' }}>
        <span className="ki">
          <SvgIcon name="act" size={22} />
        </span>
        <div>
          <small>Active referrals</small>
          <b>8</b>
          <em>This month</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#D97706' }}>
        <span className="ki">
          <SvgIcon name="coin" size={22} />
        </span>
        <div>
          <small>Pending commission</small>
          <b>$3.00</b>
          <em>In review</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#6D3AE8' }}>
        <span className="ki">
          <SvgIcon name="wallet" size={22} />
        </span>
        <div>
          <small>Total earned</small>
          <b>$24.00</b>
          <em>Paid to cash balance</em>
        </div>
      </div>

      {/* Share Your Link (span 8) */}
      <div className="pn s8">
        <div className="pt">
          <h3>Your unique referral link</h3>
        </div>
        <p className="muted" style={{ marginBottom: '18px', fontSize: '15px' }}>
          Share your link on WhatsApp, Twitter, or with friends and family.
        </p>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <div className="fi" style={{ flex: 1 }}>
            <SvgIcon name="link" size={18} />
            <input type="text" readOnly value={refLink} />
          </div>
          <button className="btn" onClick={handleCopy}>
            Copy link
          </button>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ background: 'var(--sf)', padding: '12px 18px', borderRadius: '14px', fontSize: '14px' }}>
            Referral code: <b style={{ color: 'var(--g)' }}>{refCode}</b>
          </div>
          <div style={{ background: 'var(--sf)', padding: '12px 18px', borderRadius: '14px', fontSize: '14px' }}>
            Bonus per referral: <b>$2.00 USDT</b>
          </div>
        </div>
      </div>

      {/* Qualification Criteria (span 4) */}
      <div className="pn s4">
        <div className="pt">
          <h3>How it qualifies</h3>
        </div>
        {[
          'Your friend joins with your code',
          'They complete 7 daily missions',
          'Anti-fraud checks pass',
          'You both receive $2.00 reward'
        ].map((step, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '12px', marginBottom: '14px', fontSize: '14px', alignItems: 'flex-start' }}>
            <span
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--mint)',
                color: 'var(--gd)',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 700,
                fontSize: '12px',
                flex: 'none'
              }}
            >
              {idx + 1}
            </span>
            <span style={{ color: 'var(--sub)' }}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
