'use client';

import React, { useState } from 'react';
import SvgIcon from '../../../components/SvgIcon.jsx';
import { useApp } from '../../../context/AppContext.jsx';

export default function NotificationsPage() {
  const { notifications, unreadNotifications, markNotificationsRead } = useApp();
  const [filter, setFilter] = useState('all');

  const filtered = notifications.filter((n) => {
    if (filter === 'all') return true;
    return n[4] === filter;
  });

  return (
    <div>
      <div className="pn">
        <div className="pt">
          <div>
            <h3>Notifications Center</h3>
            <small className="muted">Updates on challenges, streaks &amp; Health Fund payouts</small>
          </div>
          {unreadNotifications > 0 && (
            <button className="btn sm o" onClick={markNotificationsRead}>
              Mark all read
            </button>
          )}
        </div>

        <div className="cps" style={{ margin: '18px 0 24px' }}>
          {[
            ['all', 'All Activity'],
            ['c', 'Challenges'],
            ['r', 'Streaks & Missions'],
            ['w', 'Rewards & Wallet']
          ].map((tab) => (
            <button
              key={tab[0]}
              className={`cp ${filter === tab[0] ? 'on' : ''}`}
              onClick={() => setFilter(tab[0])}
            >
              {tab[1]}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map((n, idx) => (
            <div
              key={idx}
              className="lr"
              style={{
                padding: '16px 20px',
                background: 'var(--sf)',
                borderRadius: '16px',
                border: 0,
                alignItems: 'flex-start'
              }}
            >
              <div
                className="lt"
                style={{
                  background: 'var(--mint)',
                  color: 'var(--gd)',
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px'
                }}
              >
                <SvgIcon name={n[0]} size={22} />
              </div>

              <div style={{ flex: 1 }}>
                <b style={{ fontSize: '16px', display: 'block', marginBottom: '4px' }}>{n[1]}</b>
                <p className="muted" style={{ fontSize: '14px', lineHeight: 1.5 }}>
                  {n[2]}
                </p>
              </div>

              <span style={{ fontSize: '12px', color: 'var(--sub)', fontWeight: 600, flex: 'none' }}>
                {n[3]}
              </span>
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 10px' }}>
              <p className="muted">No notifications in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

