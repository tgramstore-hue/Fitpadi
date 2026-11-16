'use client';

import React, { useState } from 'react';
import SvgIcon from '../../../components/SvgIcon.jsx';
import { useApp } from '../../../context/AppContext.jsx';

export default function ProfilePage() {
  const { showToast } = useApp();
  const [name, setName] = useState('David Okonkwo');
  const [country, setCountry] = useState('Nigeria');
  const [goal, setGoal] = useState('Build stamina & healthy habits');

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Profile updated successfully!');
  };

  const achievements = [
    { icon: 'act', name: 'First Steps', unlocked: true, color: 'sq-green' },
    { icon: 'flame', name: '7-Day Streak', unlocked: true, color: 'sq-red' },
    { icon: 'star', name: 'Fitness Explorer', unlocked: true, color: 'sq-blue' },
    { icon: 'trophy', name: 'Walking Champ', unlocked: false, color: 'sq-gold' },
    { icon: 'book', name: 'Wellness Scholar', unlocked: false, color: 'sq-purple' },
    { icon: 'leaf', name: 'Nutrition Learner', unlocked: false, color: 'sq-teal' }
  ];

  return (
    <div className="gr" style={{ paddingBottom: '90px' }}>
      {/* Top Profile Card (span 12 - HTML Layout) */}
      <div className="s12">
        <div
          className="card-box"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            padding: '24px 28px'
          }}
        >
          <div
            style={{
              width: '76px',
              height: '76px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #16A34A, #15803D)',
              color: '#fff',
              display: 'grid',
              placeItems: 'center',
              fontSize: '32px',
              fontWeight: 800,
              flex: 'none',
              boxShadow: '0 8px 24px rgba(22, 163, 74, 0.25)'
            }}
          >
            {name.charAt(0) || 'D'}
          </div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '26px', margin: 0, letterSpacing: '-0.02em' }}>{name}</h2>
              <span className="pill-tag" style={{ background: '#FEF3C7', color: '#92400E', fontWeight: 700 }}>
                Gold Member
              </span>
            </div>
            <small className="muted" style={{ display: 'block', marginTop: '4px', fontSize: '14px' }}>
              {country} · Member since August 2026 · Health Fund ID #7419
            </small>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
              {['Be more active', 'Reduce stress', 'Eat better', '7-Day Streak'].map((g, idx) => (
                <span key={idx} className="pp2" style={{ fontSize: '12px' }}>
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4 KPIs with Flat Squircle Icons */}
      <div className="kp s3" style={{ '--c': '#16A34A' }}>
        <span className="flat-sq" style={{ background: 'rgba(255,255,255,.22)', width: '44px', height: '44px' }}>
          <SvgIcon name="dumb" size={22} />
        </span>
        <div>
          <small>Workouts</small>
          <b>24</b>
          <em>Completed sessions</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#2563EB' }}>
        <span className="flat-sq" style={{ background: 'rgba(255,255,255,.22)', width: '44px', height: '44px' }}>
          <SvgIcon name="act" size={22} />
        </span>
        <div>
          <small>Total steps</small>
          <b>62,400</b>
          <em>Active cadence</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#EF5A3C' }}>
        <span className="flat-sq" style={{ background: 'rgba(255,255,255,.22)', width: '44px', height: '44px' }}>
          <SvgIcon name="flame" size={22} />
        </span>
        <div>
          <small>Day streak</small>
          <b>7 days</b>
          <em>Consistency bonus</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#6D3AE8' }}>
        <span className="flat-sq" style={{ background: 'rgba(255,255,255,.22)', width: '44px', height: '44px' }}>
          <SvgIcon name="coin" size={22} />
        </span>
        <div>
          <small>Points wallet</small>
          <b>2,450</b>
          <em>Lifetime points</em>
        </div>
      </div>

      {/* Left Column: Personal Profile Form (span 7) */}
      <div className="s7">
        <span className="sec-label">ACCOUNT DETAILS</span>
        <div className="card-box">
          <div className="pt" style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', margin: 0 }}>Edit profile information</h3>
          </div>

          <form onSubmit={handleSave}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '13px', marginBottom: '6px', color: 'var(--sub)' }}>
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ height: '44px', borderRadius: '14px' }}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '13px', marginBottom: '6px', color: 'var(--sub)' }}>
                Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={{
                  width: '100%',
                  height: '44px',
                  borderRadius: '14px',
                  border: '1.5px solid var(--ln)',
                  background: 'var(--wh)',
                  color: 'var(--tx)',
                  padding: '0 14px',
                  fontFamily: 'inherit',
                  fontSize: '15px'
                }}
              >
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
                <option value="Kenya">Kenya</option>
                <option value="South Africa">South Africa</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '13px', marginBottom: '6px', color: 'var(--sub)' }}>
                Primary wellness goal
              </label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                style={{ height: '44px', borderRadius: '14px' }}
              />
            </div>

            <button className="pill-btn pill-blue" style={{ height: '44px', padding: '0 24px' }}>
              Save changes
            </button>
          </form>
        </div>
      </div>

      {/* Right Column: Achievements & Badges (span 5 - HTML layout) */}
      <div className="s5">
        <span className="sec-label">ACHIEVEMENTS</span>
        <div className="card-box">
          <div className="pt" style={{ marginBottom: '14px' }}>
            <h3 style={{ fontSize: '18px', margin: 0 }}>Earned Badges</h3>
            <span className="pill-tag">3 of 6 unlocked</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', textAlign: 'center' }}>
            {achievements.map((b, idx) => (
              <div
                key={idx}
                style={{
                  padding: '14px 8px',
                  borderRadius: '16px',
                  background: b.unlocked ? 'var(--sf)' : 'transparent',
                  border: b.unlocked ? '1px solid var(--ln)' : '1.5px dashed var(--ln)',
                  opacity: b.unlocked ? 1 : 0.6
                }}
              >
                <div
                  className={`flat-sq ${b.unlocked ? b.color : 'sq-dark'}`}
                  style={{
                    width: '46px',
                    height: '46px',
                    margin: '0 auto 8px',
                    borderRadius: '14px',
                    background: b.unlocked ? undefined : 'var(--ln)',
                    color: b.unlocked ? '#fff' : 'var(--sub)'
                  }}
                >
                  <SvgIcon name={b.unlocked ? b.icon : 'lock'} size={22} />
                </div>
                <b style={{ fontSize: '12px', display: 'block', lineHeight: 1.2 }}>
                  {b.name}
                </b>
                <small className="muted" style={{ fontSize: '10px' }}>
                  {b.unlocked ? 'Unlocked ✓' : 'Locked'}
                </small>
              </div>
            ))}
          </div>

          {/* Account status info */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--ln)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <b style={{ fontSize: '14px', display: 'block' }}>FitPadi Pioneer Tier</b>
                <small className="muted">Eligible for community Health Fund payouts</small>
              </div>
              <span className="chk-circle">✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
