'use client';

import React, { useState } from 'react';
import SvgIcon from '../../../components/SvgIcon.jsx';
import { useApp } from '../../../context/AppContext.jsx';

export default function ProfilePage() {
  const { showToast } = useApp();
  const [name, setName] = useState('David Okonkwo');
  const [email] = useState('david@example.com');
  const [country, setCountry] = useState('Nigeria');
  const [goal, setGoal] = useState('Build stamina & strength');

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Profile updated successfully!');
  };

  return (
    <div className="gr">
      {/* 4 KPIs with authentic colors */}
      <div className="kp s3" style={{ '--c': '#16A34A' }}>
        <span className="ki">
          <SvgIcon name="dumb" size={22} />
        </span>
        <div>
          <small>Workouts</small>
          <b>24</b>
          <em>Completed</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#2563EB' }}>
        <span className="ki">
          <SvgIcon name="act" size={22} />
        </span>
        <div>
          <small>Total steps</small>
          <b>62,400</b>
          <em>This month</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#EF5A3C' }}>
        <span className="ki">
          <SvgIcon name="flame" size={22} />
        </span>
        <div>
          <small>Day streak</small>
          <b>7 days</b>
          <em>Current</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#6D3AE8' }}>
        <span className="ki">
          <SvgIcon name="coin" size={22} />
        </span>
        <div>
          <small>Points</small>
          <b>2,450</b>
          <em>Lifetime</em>
        </div>
      </div>

      {/* Profile Details Form (span 8) */}
      <div className="pn s8">
        <div className="pt">
          <h3>Personal profile</h3>
        </div>

        <form onSubmit={handleSave}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '24px' }}>
            <div
              className="avs"
              style={{
                width: '64px',
                height: '64px',
                fontSize: '24px',
                borderRadius: '50%',
                background: 'var(--g)',
                color: '#fff',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 700
              }}
            >
              {name.charAt(0) || 'D'}
            </div>
            <div>
              <b style={{ fontSize: '18px', display: 'block' }}>{name}</b>
              <small className="muted">{email}</small>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>
              Full name
            </label>
            <div className="fi">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>
              Country
            </label>
            <div className="fi">
              <select value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
                <option value="Cameroon">Cameroon</option>
                <option value="South Africa">South Africa</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>
              Primary wellness goal
            </label>
            <div className="fi">
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>
          </div>

          <button className="btn">Save changes</button>
        </form>
      </div>

      {/* Account Status (span 4) */}
      <div className="pn s4">
        <div className="pt">
          <h3>Account tier</h3>
        </div>
        <div style={{ background: 'var(--mint)', padding: '16px 20px', borderRadius: '18px', marginBottom: '16px' }}>
          <b style={{ color: 'var(--gd)', fontSize: '16px', display: 'block' }}>FitPadi Pioneer</b>
          <small style={{ color: 'var(--tx)', opacity: 0.85 }}>Free member tier with active reward pool eligibility</small>
        </div>

        <div className="mini">
          <div>
            <b>$12.50</b>
            <small>Earned</small>
          </div>
          <div>
            <b>#4</b>
            <small>Rank</small>
          </div>
          <div>
            <b>Level 5</b>
            <small>Status</small>
          </div>
        </div>

        <p className="muted" style={{ fontSize: '13px', marginTop: '16px' }}>
          Member since November 2026. Verified participant of the FitPadi Health Fund.
        </p>
      </div>
    </div>
  );
}
