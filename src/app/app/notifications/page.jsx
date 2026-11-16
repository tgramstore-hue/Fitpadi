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

  const getSquircleColor = (icon) => {
    switch (icon) {
      case 'trophy': return 'sq-purple';
      case 'flame': return 'sq-red';
      case 'wallet': return 'sq-green';
      case 'coin': return 'sq-gold';
      case 'cap': return 'sq-blue';
      default: return 'sq-teal';
    }
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      <span className="sec-label">INBOX</span>
      <div className="card-box">
        <div className="pt" style={{ marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', margin: 0 }}>Notification center</h3>
            <small className="muted">Updates on challenges, streaks &amp; Health Fund payouts</small>
          </div>
          {unreadNotifications > 0 && (
            <button className="pill-btn pill-outline" onClick={markNotificationsRead}>
              Mark all read
            </button>
          )}
        </div>

        {/* Filter pills */}
        <div className="cps" style={{ marginBottom: '18px' }}>
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

        {/* Notifications list */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filtered.map((n, idx) => (
            <div key={idx} className="card-row">
              <div className={`flat-sq ${getSquircleColor(n[0])}`}>
                <SvgIcon name={n[0]} size={22} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <b style={{ fontSize: '15px', display: 'block', color: 'var(--tx)' }}>
                  {n[1]}
                </b>
                <small className="muted" style={{ display: 'block', marginTop: '2px', fontSize: '13px', lineHeight: 1.4 }}>
                  {n[2]}
                </small>
              </div>

              <div style={{ textAlign: 'right', flex: 'none' }}>
                <span className="pill-tag" style={{ fontSize: '11px' }}>
                  {n[3]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
