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
    { name: '7-Day Streak', icon: 'flame', unlocked: true },
    { name: 'Early Bird', icon: 'act', unlocked: true },
    { name: 'Hydration Pro', icon: 'water', unlocked: true },
    { name: 'Padi Pioneer', icon: 'star', unlocked: true },
    { name: 'Centurion 100k', icon: 'trophy', unlocked: false },
    { name: 'Master Mind', icon: 'heart', unlocked: false }
  ];

  return (
    <div className="gr">
      {/* 4 KPIs with authentic colors */}
      <div className="kp s3" style={{ '--c': '#6D3AE8' }}>
        <span className="ki">
          <SvgIcon name="trophy" size={22} />
        </span>
        <div>
          <small>Level</small>
          <b>{lv} · {lv > 4 ? 'Fit Hero' : lv > 2 ? 'Padi Pro' : 'Starter'}</b>
          <em>{pc}% to Level {lv + 1}</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#2563EB' }}>
        <span className="ki">
          <SvgIcon name="coin" size={22} />
        </span>
        <div>
          <small>Total points</small>
          <b>{xp.toLocaleString()}</b>
          <em>+{points} this week</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#EF5A3C' }}>
        <span className="ki">
          <SvgIcon name="flame" size={22} />
        </span>
        <div>
          <small>Active streak</small>
          <b>7 days</b>
          <em>Protected today</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#16A34A' }}>
        <span className="ki">
          <SvgIcon name="act" size={22} />
        </span>
        <div>
          <small>Rank</small>
          <b>#4</b>
          <em>Global leaderboard</em>
        </div>
      </div>

      {/* Level XP Progress (span 12) */}
      <div className="pn s12">
        <div className="pt">
          <h3>Level progress</h3>
          <span className="pp2">{xp} / {nxt} XP</span>
        </div>
        <div className="pgb" style={{ height: '10px' }}>
          <i style={{ width: `${pc}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '13px', color: 'var(--sub)' }}>
          <span>Level {lv} (Starter)</span>
          <span>Level {lv + 1} (Reward multiplier unlocked)</span>
        </div>
      </div>

      {/* Badges Grid (span 8) */}
      <div className="pn s8">
        <div className="pt">
          <h3>Achievement badges</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '16px', marginTop: '16px' }}>
          {badges.map((b, idx) => (
            <div key={idx} className={`bdg ${b.unlocked ? '' : 'lk'}`}>
              <div>
                <SvgIcon name={b.icon} size={26} />
              </div>
              <b>{b.name}</b>
              <small style={{ display: 'block', marginTop: '2px' }}>
                {b.unlocked ? 'Unlocked' : 'Locked'}
              </small>
            </div>
          ))}
        </div>
      </div>

      {/* Habit Consistency (span 4) */}
      <div className="pn s4">
        <div className="pt">
          <h3>Weekly habit consistency</h3>
        </div>
        <div className="cal" style={{ marginTop: '14px' }}>
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
            <div key={idx}>
              <i className={idx < 5 ? 'a' : idx === 5 ? 'h' : ''} style={{ margin: '0 auto 6px' }} />
              <span>{day}</span>
            </div>
          ))}
        </div>
        <p className="muted" style={{ fontSize: '13px', marginTop: '18px', textAlign: 'center' }}>
          Completed 5 of 7 daily mission days this week. 2 more to trigger the weekend bonus!
        </p>
      </div>
    </div>
  );
}
