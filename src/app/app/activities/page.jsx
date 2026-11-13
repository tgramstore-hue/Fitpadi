'use client';

import React, { useState } from 'react';
import SvgIcon from '../../../components/SvgIcon.jsx';
import { useApp } from '../../../context/AppContext.jsx';
import { LIB } from '../../../data/appData.js';

export default function ActivitiesPage() {
  const { steps, activeMins, walks, logQuickActivity, setPreviewExercise, startWorkout, showToast } = useApp();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [breathing, setBreathing] = useState(false);

  const categories = ['All', 'Full Body', 'Lower Body', 'Upper Body', 'Core'];

  const filteredExercises = LIB.filter((ex) => {
    const matchesCat = filter === 'All' || ex[2]?.toLowerCase() === filter.toLowerCase() || ex[3]?.toLowerCase().includes(filter.toLowerCase());
    const matchesQ = !search || ex[0].toLowerCase().includes(search.toLowerCase()) || ex[3]?.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesQ;
  });

  const toggleBreathing = () => {
    setBreathing(!breathing);
    if (!breathing) {
      showToast('Breathing session started. Inhale... exhale...');
    }
  };

  return (
    <div className="gr">
      {/* 4 KPIs with authentic --c colors */}
      <div className="kp s3" style={{ '--c': '#2563EB' }}>
        <span className="ki">
          <SvgIcon name="act" size={22} />
        </span>
        <div>
          <small>Total Steps</small>
          <b>{steps.toLocaleString()}</b>
          <em>Active cadence</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#16A34A' }}>
        <span className="ki">
          <SvgIcon name="clock" size={22} />
        </span>
        <div>
          <small>Active Movement</small>
          <b>{activeMins} min</b>
          <em>Goal: 30 min / day</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#EF5A3C' }}>
        <span className="ki">
          <SvgIcon name="flame" size={22} />
        </span>
        <div>
          <small>Estimated Burn</small>
          <b>{Math.round(steps * 0.042)} kcal</b>
          <em>Active energy</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#0F766E' }}>
        <span className="ki">
          <SvgIcon name="heart" size={22} />
        </span>
        <div>
          <small>Mindful Breaks</small>
          <b>2 sessions</b>
          <em>Today</em>
        </div>
      </div>

      {/* Walking Tracker (span 8) */}
      <div className="pn s8">
        <div className="pt">
          <div>
            <h3>Walking tracker</h3>
            <small className="muted">Recent recorded walks</small>
          </div>
          <button className="btn sm o" onClick={() => logQuickActivity(15, 15)}>
            + Log 15 min walk
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
          {walks.map((w, idx) => (
            <div key={idx} className="lr">
              <div className="lt">
                <SvgIcon name="act" size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <b style={{ fontSize: '15px' }}>{w[0]}</b>
                <small className="muted" style={{ display: 'block' }}>{w[1]} · {w[2]}</small>
              </div>
              <span className="pp2">Verified ✓</span>
            </div>
          ))}
        </div>
      </div>

      {/* Breathing Break (span 4) */}
      <div className="pn s4" style={{ textAlign: 'center' }}>
        <div className="pt">
          <h3>Breathing break</h3>
        </div>
        <p className="muted" style={{ fontSize: '13px' }}>
          Slow deep breaths to reset focus and lower heart rate.
        </p>
        <div className={`br ${breathing ? 'on' : ''}`} id="bc" style={{ margin: '20px auto 16px' }}>
          <span>{breathing ? 'Breathe...' : 'Rest'}</span>
        </div>
        <button className="btn sm" onClick={toggleBreathing} style={{ width: '100%' }}>
          {breathing ? 'Stop session' : 'Start breathing'}
        </button>
      </div>

      {/* Exercise Movement Library (span 12) */}
      <div className="pn s12">
        <div className="pt">
          <div>
            <h3>Exercise movement library</h3>
            <small className="muted">Learn form, technique &amp; target muscle groups</small>
          </div>
          <button
            className="btn sm"
            onClick={() => startWorkout(LIB.slice(0, 4).map((e) => e[0]))}
          >
            Start routine
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', margin: '18px 0 20px' }}>
          <div className="cps">
            {categories.map((c) => (
              <button
                key={c}
                className={`cp ${filter === c ? 'on' : ''}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="bsr" style={{ height: '40px', maxWidth: '280px' }}>
            <SvgIcon name="search" size={16} />
            <input
              placeholder="Filter movements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Exercises Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {filteredExercises.map((ex, i) => (
            <div
              key={i}
              style={{
                background: 'var(--sf)',
                border: '1px solid var(--ln)',
                borderRadius: '18px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all .2s'
              }}
              onClick={() => setPreviewExercise(ex)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span className="tg">{ex[1]}</span>
                <span style={{ fontSize: '12px', color: 'var(--sub)' }}>{ex[2]}</span>
              </div>
              <b style={{ fontSize: '17px', display: 'block', margin: '4px 0 6px' }}>{ex[0]}</b>
              <small className="muted" style={{ display: 'block', fontSize: '13px' }}>
                Target: {ex[3]}
              </small>
              <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--ln)', display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--g)', fontWeight: 600 }}>
                <span>View technique</span>
                <span>&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
