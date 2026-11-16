'use client';

import React from 'react';
import SvgIcon from '../../../components/SvgIcon.jsx';
import { useApp } from '../../../context/AppContext.jsx';

export default function ProgressPage() {
  const { points } = useApp();
  const xp = 2450 + points - 240;
  const lv = Math.floor(xp / 600) + 1;
  const nxt = lv * 600;
  const pc = Math.round(((xp - (lv - 1) * 600) / 600) * 100);

  const badges = [
    { name: '7-Day Streak', icon: 'flame', unlocked: true, color: 'sq-red' },
    { name: 'Early Bird', icon: 'act', unlocked: true, color: 'sq-green' },
    { name: 'Hydration Pro', icon: 'drop', unlocked: true, color: 'sq-blue' },
    { name: 'Padi Pioneer', icon: 'star', unlocked: true, color: 'sq-gold' },
    { name: 'Centurion 100k', icon: 'trophy', unlocked: false, color: 'sq-purple' },
    { name: 'Master Mind', icon: 'heart', unlocked: false, color: 'sq-teal' }
  ];

  return (
    <div className="gr" style={{ paddingBottom: '90px' }}>
      {/* 4 KPIs with Flat Squircle Icons */}
      <div className="kp s3" style={{ '--c': '#6D3AE8' }}>
        <span className="flat-sq" style={{ background: 'rgba(255,255,255,.22)', width: '44px', height: '44px' }}>
          <SvgIcon name="trophy" size={22} />
        </span>
        <div>
          <small>Current Tier</small>
          <b>Level {lv}</b>
          <em>{pc}% to Level {lv + 1}</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#2563EB' }}>
        <span className="flat-sq" style={{ background: 'rgba(255,255,255,.22)', width: '44px', height: '44px' }}>
          <SvgIcon name="coin" size={22} />
        </span>
        <div>
          <small>Total points</small>
          <b>{xp.toLocaleString()}</b>
          <em>+{points} this week</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#EF5A3C' }}>
        <span className="flat-sq" style={{ background: 'rgba(255,255,255,.22)', width: '44px', height: '44px' }}>
          <SvgIcon name="flame" size={22} />
        </span>
        <div>
          <small>Active streak</small>
          <b>7 days</b>
          <em>Shield active</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#16A34A' }}>
        <span className="flat-sq" style={{ background: 'rgba(255,255,255,.22)', width: '44px', height: '44px' }}>
          <SvgIcon name="shield" size={22} />
        </span>
        <div>
          <small>Fund Standing</small>
          <b>Top 10%</b>
          <em>Verified member</em>
        </div>
      </div>

      {/* Level & Milestone Progress (span 7) */}
      <div className="s7">
        <span className="sec-label">LEVEL ADVANCEMENT</span>
        <div className="card-box">
          <div className="pt" style={{ marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '18px', margin: 0 }}>Level {lv} · FitPadi Pioneer</h3>
              <small className="muted">{xp.toLocaleString()} / {nxt.toLocaleString()} XP to Level {lv + 1}</small>
            </div>
            <span className="pp2">{pc}% progress</span>
          </div>

          <div className="pgb" style={{ height: '10px', borderRadius: '999px', marginBottom: '20px' }}>
            <i style={{ width: `${pc}%` }} />
          </div>

          <p className="muted" style={{ fontSize: '14px', lineHeight: 1.5, marginBottom: '16px' }}>
            Earn XP by logging walks, staying hydrated, completing community sprints, and taking daily health quizzes.
          </p>

          <div
            style={{
              padding: '16px 18px',
              borderRadius: '16px',
              background: 'var(--sf)',
              border: '1px solid var(--ln)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px'
            }}
          >
            <div className="flat-sq sq-gold" style={{ width: '40px', height: '40px', borderRadius: '12px' }}>
              <SvgIcon name="trophy" size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <b style={{ fontSize: '14px', display: 'block' }}>Next Milestone Reward</b>
              <small className="muted">Reach Level 5 to unlock 1.5x Health Fund payout multiplier</small>
            </div>
            <span className="pill-tag">In 180 XP</span>
          </div>
        </div>
      </div>

      {/* Badges & Achievements (span 5) */}
      <div className="s5">
        <span className="sec-label">BADGES & AWARDS</span>
        <div className="card-box">
          <div className="pt" style={{ marginBottom: '14px' }}>
            <h3 style={{ fontSize: '18px', margin: 0 }}>Earned badges</h3>
            <span className="pill-tag">4 of 6</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center' }}>
            {badges.map((b, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 6px',
                  borderRadius: '16px',
                  background: b.unlocked ? 'var(--sf)' : 'transparent',
                  border: b.unlocked ? '1px solid var(--ln)' : '1.5px dashed var(--ln)',
                  opacity: b.unlocked ? 1 : 0.5
                }}
              >
                <div
                  className={`flat-sq ${b.unlocked ? b.color : 'sq-dark'}`}
                  style={{
                    width: '42px',
                    height: '42px',
                    margin: '0 auto 8px',
                    borderRadius: '13px',
                    background: b.unlocked ? undefined : 'var(--ln)',
                    color: b.unlocked ? '#fff' : 'var(--sub)'
                  }}
                >
                  <SvgIcon name={b.unlocked ? b.icon : 'lock'} size={20} />
                </div>
                <b style={{ fontSize: '12px', display: 'block', lineHeight: 1.2 }}>{b.name}</b>
                <small className="muted" style={{ fontSize: '10px' }}>
                  {b.unlocked ? 'Earned ✓' : 'Locked'}
                </small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
