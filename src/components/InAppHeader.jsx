'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import SvgIcon from './SvgIcon.jsx';
import { useApp } from '../context/AppContext.jsx';
import { TT2 } from '../data/appData.js';

export default function InAppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { notifications, unreadNotifications, markNotificationsRead } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  // Determine current page sub-route key
  // e.g. /app/programmes -> programmes
  const subRoute = pathname.replace('/app', '').replace(/^\//, '').split('/')[0] || '';
  const pageTitle = TT2[subRoute] || 'Dashboard';

  const todayStr = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchVal.trim()) {
      router.push(`/app/programmes?q=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  return (
    <div className="tb">
      <div>
        <div className="muted" style={{ fontSize: '14px' }}>
          {todayStr}
        </div>
        <h1>{pageTitle}</h1>
      </div>

      <div className="tr">
        <label className="srch">
          <SvgIcon name="search" size={18} />
          <input
            id="gs"
            placeholder="Search programmes"
            aria-label="Search programmes"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onKeyDown={handleSearchSubmit}
          />
        </label>

        <button
          className="ib2"
          aria-label="Notifications"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <SvgIcon name="bell" size={22} />
          {unreadNotifications > 0 && <b id="nd" />}
        </button>

        <Link className="avs" href="/app/profile" aria-label="Profile">
          D
        </Link>

        {/* Notifications Popup */}
        <div className={`np ${showNotifications ? 'show' : ''}`} id="np">
          <div className="pt" style={{ padding: '4px 6px 0' }}>
            <h3>Notifications</h3>
            {unreadNotifications > 0 && (
              <span className="lk" onClick={markNotificationsRead}>
                Mark all read
              </span>
            )}
            <Link
              className="lk"
              href="/app/notifications"
              onClick={() => setShowNotifications(false)}
            >
              View all
            </Link>
          </div>

          <div>
            {notifications.slice(0, 4).map((n, i) => (
              <div key={i} className="lr">
                <div className="lt">
                  <SvgIcon name={n[0]} size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: '14px', display: 'block' }}>{n[1]}</b>
                  <small className="muted" style={{ fontSize: '12px' }}>
                    {n[2]}
                  </small>
                </div>
                <small className="muted" style={{ fontSize: '11px', flex: 'none' }}>
                  {n[3]}
                </small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

