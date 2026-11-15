'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import SvgIcon from '../../../components/SvgIcon.jsx';
import { useApp } from '../../../context/AppContext.jsx';
import { LIB } from '../../../data/appData.js';

export default function ActivitiesPage() {
  const {
    steps,
    setSteps,
    activeMins,
    setActiveMins,
    walks,
    setWalks,
    setPoints,
    logQuickActivity,
    setPreviewExercise,
    startWorkout,
    showToast
  } = useApp();

  // Walking Tracker State
  const [goal, setGoal] = useState(8000);
  const [sourceMode, setSourceMode] = useState('Manual entry');
  const [isWalking, setIsWalking] = useState(false);
  const [walkSeconds, setWalkSeconds] = useState(0);
  const walkTimerRef = useRef(null);

  // Guided Breathing State
  const [breathDuration, setBreathDuration] = useState(60); // 60, 180, 300
  const [breathRemaining, setBreathRemaining] = useState(60);
  const [breathActive, setBreathActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Ready'); // 'Inhale', 'Hold', 'Exhale', 'Ready'
  const breathTimerRef = useRef(null);

  // Exercise Library State
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Full Body', 'Lower Body', 'Upper Body', 'Core'];

  // Walking Live Session Timer
  useEffect(() => {
    if (isWalking) {
      walkTimerRef.current = setInterval(() => {
        setWalkSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (walkTimerRef.current) clearInterval(walkTimerRef.current);
    }
    return () => {
      if (walkTimerRef.current) clearInterval(walkTimerRef.current);
    };
  }, [isWalking]);

  const toggleWalkingSession = () => {
    if (!isWalking) {
      setIsWalking(true);
      showToast('Walking session started! Step cadence tracking...');
    } else {
      setIsWalking(false);
      showToast('Walking session paused.');
    }
  };

  const finishWalkingSession = () => {
    if (walkSeconds < 5 && steps === 0) {
      setIsWalking(false);
      setWalkSeconds(0);
      showToast('Session too short to record.');
      return;
    }

    const sessionMins = Math.max(1, Math.round(walkSeconds / 60));
    const addedSteps = Math.max(250, sessionMins * 110);
    const timeStr = `${sessionMins} min`;
    const now = new Date();
    const timeLabel = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setIsWalking(false);
    setWalkSeconds(0);
    setSteps((s) => s + addedSteps);
    setActiveMins((m) => Math.min(180, m + sessionMins));
    setPoints((p) => p + 25);
    setWalks((prev) => [
      [timeLabel, `${addedSteps.toLocaleString()} steps`, timeStr],
      ...prev
    ]);

    showToast(`Great walk! +${addedSteps.toLocaleString()} steps · +25 points earned 🎉`);
  };

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Guided Breathing Loop (4s Inhale, 4s Hold, 4s Exhale)
  useEffect(() => {
    if (breathActive) {
      breathTimerRef.current = setInterval(() => {
        setBreathRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(breathTimerRef.current);
            setBreathActive(false);
            setBreathPhase('Completed');
            setPoints((p) => p + 15);
            showToast('Breathing session complete! Mind reset · +15 points 🌿');
            return breathDuration;
          }
          const elapsed = breathDuration - (prev - 1);
          const cycle = elapsed % 12;
          if (cycle < 4) setBreathPhase('Inhale...');
          else if (cycle < 8) setBreathPhase('Hold breath...');
          else setBreathPhase('Exhale slowly...');

          return prev - 1;
        });
      }, 1000);
    } else {
      if (breathTimerRef.current) clearInterval(breathTimerRef.current);
    }
    return () => {
      if (breathTimerRef.current) clearInterval(breathTimerRef.current);
    };
  }, [breathActive, breathDuration]);

  const selectBreathDuration = (dur) => {
    setBreathDuration(dur);
    setBreathRemaining(dur);
    setBreathActive(false);
    setBreathPhase('Ready');
  };

  const toggleBreathing = () => {
    if (!breathActive) {
      setBreathActive(true);
      setBreathPhase('Inhale...');
      showToast('Breathing session started. Inhale gently through your nose...');
    } else {
      setBreathActive(false);
      setBreathPhase('Paused');
      showToast('Breathing session paused.');
    }
  };

  // Exercise Filter
  const filteredExercises = LIB.filter((ex) => {
    const name = ex[0] || '';
    const category = ex[2] || '';
    const target = ex[3] || '';

    const matchesCat =
      filter === 'All' ||
      category.toLowerCase() === filter.toLowerCase() ||
      target.toLowerCase().includes(filter.toLowerCase());

    const matchesQ =
      !search ||
      name.toLowerCase().includes(search.toLowerCase()) ||
      target.toLowerCase().includes(search.toLowerCase()) ||
      category.toLowerCase().includes(search.toLowerCase());

    return matchesCat && matchesQ;
  });

  // Circular progress calculations
  const progressPercent = Math.min(100, Math.round((steps / goal) * 100));
  const strokeOffset = 465 - (465 * progressPercent) / 100;
  const distanceKm = (steps * 0.00075).toFixed(2);
  const caloriesBurned = Math.round(steps * 0.042);

  return (
    <div className="gr">
      {/* 4 KPI Top Cards with authentic brand colors */}
      <div className="kp s3" style={{ '--c': '#2563EB' }}>
        <span className="ki">
          <SvgIcon name="act" size={22} />
        </span>
        <div>
          <small>Total Steps</small>
          <b>{steps.toLocaleString()}</b>
          <em>{progressPercent}% of {goal.toLocaleString()} goal</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#16A34A' }}>
        <span className="ki">
          <SvgIcon name="clock" size={22} />
        </span>
        <div>
          <small>Active Movement</small>
          <b>{activeMins} min</b>
          <em>Target: 30 min / day</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#EF5A3C' }}>
        <span className="ki">
          <SvgIcon name="flame" size={22} />
        </span>
        <div>
          <small>Estimated Burn</small>
          <b>{caloriesBurned} kcal</b>
          <em>Active caloric expenditure</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#0F766E' }}>
        <span className="ki">
          <SvgIcon name="heart" size={22} />
        </span>
        <div>
          <small>Distance Covered</small>
          <b>{distanceKm} km</b>
          <em>Outdoor &amp; treadmill</em>
        </div>
      </div>

      {/* Walking Tracker Card (span 8) */}
      <div className="pn s8">
        <div className="pt">
          <div>
            <h3>Walking tracker</h3>
            <small className="muted">Live cadence &amp; step counter</small>
          </div>
          <span
            className="pp2"
            style={{ cursor: 'pointer', userSelect: 'none' }}
            title="Click to toggle sync source"
            onClick={() => {
              const nextMode =
                sourceMode === 'Manual entry' ? 'Connected to Health Connect' : 'Manual entry';
              setSourceMode(nextMode);
              showToast(`Sync source: ${nextMode}`);
            }}
          >
            {sourceMode}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '28px',
            alignItems: 'center',
            flexWrap: 'wrap',
            margin: '18px 0'
          }}
        >
          {/* Circular SVG Ring */}
          <div style={{ position: 'relative', width: '160px', height: '160px', flex: 'none' }}>
            <svg
              width="160"
              height="160"
              viewBox="0 0 170 170"
              style={{ transform: 'rotate(-90deg)' }}
            >
              <circle
                cx="85"
                cy="85"
                r="74"
                fill="none"
                stroke="var(--mint)"
                strokeWidth="12"
              />
              <circle
                cx="85"
                cy="85"
                r="74"
                fill="none"
                stroke="var(--g)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="465"
                strokeDashoffset={strokeOffset}
                style={{ transition: 'stroke-dashoffset .8s var(--ease)' }}
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                placeItems: 'center',
                textAlign: 'center'
              }}
            >
              <div>
                <b style={{ fontSize: '30px', letterSpacing: '-.03em', display: 'block' }}>
                  {steps.toLocaleString()}
                </b>
                <small className="muted" style={{ display: 'block', fontSize: '13px' }}>
                  of {goal.toLocaleString()}
                </small>
              </div>
            </div>
          </div>

          {/* Mini KPI metrics & Goal Selectors */}
          <div style={{ flex: 1, minWidth: '240px' }}>
            <div className="mini" style={{ marginBottom: '16px' }}>
              <div>
                <b>{distanceKm}</b>
                <small>km</small>
              </div>
              <div>
                <b>{activeMins}</b>
                <small>active min</small>
              </div>
              <div>
                <b>{caloriesBurned}</b>
                <small>kcal (est.)</small>
              </div>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--sub)',
                  marginBottom: '6px'
                }}
              >
                Set Daily Goal:
              </label>
              <div className="cps">
                {[3000, 5000, 8000, 10000].map((g) => (
                  <button
                    key={g}
                    className={`cp ${g === goal ? 'on' : ''}`}
                    onClick={() => {
                      setGoal(g);
                      showToast(`Daily step goal set to ${g.toLocaleString()}`);
                    }}
                  >
                    {g.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Walking Session Controls */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid var(--ln)',
            flexWrap: 'wrap'
          }}
        >
          <button
            className={`btn ${isWalking ? 'o' : ''}`}
            onClick={toggleWalkingSession}
          >
            {isWalking ? 'Pause walking' : 'Start walking'}
          </button>
          <button
            className="btn o"
            onClick={finishWalkingSession}
          >
            Finish session
          </button>
          <span className="muted" style={{ fontSize: '14px' }}>
            Session time: <b style={{ color: 'var(--tx)' }}>{formatTimer(walkSeconds)}</b>
          </span>
          <button
            className="btn sm o"
            style={{ marginLeft: 'auto' }}
            onClick={() => logQuickActivity(15, 15)}
          >
            + Quick log 15 min
          </button>
        </div>
      </div>

      {/* Recent Walks History (span 4) */}
      <div className="pn s4">
        <div className="pt">
          <h3>Recent recorded walks</h3>
        </div>
        <p className="muted" style={{ fontSize: '13px', marginBottom: '12px' }}>
          Automatically logged through step detection &amp; manual sessions.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {walks.map((w, idx) => (
            <div key={idx} className="lr">
              <div className="lt">
                <SvgIcon name="act" size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <b style={{ fontSize: '14px', display: 'block' }}>{w[0]}</b>
                <small className="muted" style={{ display: 'block' }}>
                  {w[1]} · {w[2]}
                </small>
              </div>
              <span className="pp2">Verified ✓</span>
            </div>
          ))}
        </div>
      </div>

      {/* Guided Breathing Break (span 6) */}
      <div
        className="pn s6"
        style={{
          background: 'var(--tea)',
          color: '#fff',
          border: '0',
          textAlign: 'center',
          padding: '24px'
        }}
      >
        <div className="pt" style={{ justifyContent: 'center' }}>
          <h3 style={{ color: '#fff' }}>Guided breathing break</h3>
        </div>
        <p style={{ fontSize: '14px', opacity: 0.9, maxWidth: '420px', margin: '0 auto 14px' }}>
          Four-count box breathing to reduce cortisol and reset resting heart rate.
        </p>

        {/* Duration selector */}
        <div className="cps" style={{ justifyContent: 'center', marginBottom: '14px' }}>
          {[
            [60, '1 min'],
            [180, '3 min'],
            [300, '5 min']
          ].map(([dur, label]) => (
            <button
              key={dur}
              className={`cp ${dur === breathDuration ? 'on' : ''}`}
              style={{
                background: dur === breathDuration ? '#fff' : 'rgba(255,255,255,.2)',
                color: dur === breathDuration ? 'var(--tea)' : '#fff',
                borderColor: 'transparent'
              }}
              onClick={() => selectBreathDuration(dur)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Breathing Circle */}
        <div
          className={`br ${breathActive ? 'on' : ''}`}
          id="bc"
          style={{
            width: '130px',
            height: '130px',
            margin: '18px auto 10px',
            display: 'grid',
            placeItems: 'center',
            borderRadius: '50%',
            background: 'rgba(255,255,255,.2)',
            boxShadow: breathActive ? '0 0 35px rgba(255,255,255,.4)' : 'none',
            transition: 'all 0.5s ease'
          }}
        >
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>
            {breathPhase}
          </span>
        </div>

        <div style={{ opacity: 0.92, marginBottom: '16px', fontSize: '15px' }}>
          {formatTimer(breathRemaining)} remaining
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            className="btn wt sm"
            onClick={toggleBreathing}
            style={{ minWidth: '120px' }}
          >
            {breathActive ? 'Pause' : 'Begin session'}
          </button>
          {breathActive && (
            <button
              className="btn sm"
              style={{ background: 'rgba(255,255,255,.2)', color: '#fff', border: '1px solid rgba(255,255,255,.4)' }}
              onClick={() => {
                setBreathActive(false);
                setBreathRemaining(breathDuration);
                setBreathPhase('Ready');
              }}
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* More Ways to Move (span 6) */}
      <div className="pn s6">
        <div className="pt">
          <h3>More ways to move</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '6px' }}>
          {[
            [
              'Workout builder',
              'Create and play your customized interval routines',
              '/app/workouts',
              'dumb',
              '#6D3AE8'
            ],
            [
              'Nutrition and hydration',
              'Track daily water intake and explore balanced West African meals',
              '/app/nutrition',
              'leaf',
              '#EF5A3C'
            ],
            [
              'Structured programmes',
              'Evidence-based multi-week health pathways with lessons',
              '/app/programmes',
              'shield',
              '#2563EB'
            ]
          ].map(([title, desc, href, icon, color], idx) => (
            <Link
              key={idx}
              href={href}
              className="lr"
              style={{ textDecoration: 'none', padding: '12px 14px' }}
            >
              <div
                className="lt"
                style={{ background: color, color: '#fff', borderRadius: '14px' }}
              >
                <SvgIcon name={icon} size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <b style={{ fontSize: '15px', color: 'var(--tx)' }}>{title}</b>
                <small className="muted" style={{ display: 'block', marginTop: '2px' }}>
                  {desc}
                </small>
              </div>
              <span style={{ color: 'var(--g)', fontSize: '18px', fontWeight: 700 }}>&rarr;</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Exercise Movement Library (span 12) - Fully Functional */}
      <div className="pn s12">
        <div className="pt">
          <div>
            <h3>Exercise movement library</h3>
            <small className="muted">
              Learn proper form, breathing technique &amp; target muscle groups
            </small>
          </div>
          <button
            className="btn sm"
            onClick={() => {
              const routineNames = filteredExercises.slice(0, 4).map((e) => e[0]);
              startWorkout(routineNames.length ? routineNames : ['High knees', 'Push-ups', 'Bodyweight squats', 'Plank hold']);
              showToast('Starting quick 4-movement routine!');
            }}
          >
            Start routine ({Math.min(4, filteredExercises.length)})
          </button>
        </div>

        {/* Categories & Search Filters */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '18px 0 20px'
          }}
        >
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

          <div className="bsr" style={{ height: '40px', maxWidth: '280px', width: '100%' }}>
            <SvgIcon name="search" size={16} />
            <input
              placeholder="Search movement or muscle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Exercises Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: '16px'
          }}
        >
          {filteredExercises.length === 0 ? (
            <div
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '40px 20px',
                color: 'var(--sub)'
              }}
            >
              <SvgIcon name="search" size={32} />
              <p style={{ marginTop: '10px' }}>
                No exercises found matching &quot;{search}&quot; in {filter}.
              </p>
              <button
                className="btn sm o"
                style={{ marginTop: '12px' }}
                onClick={() => {
                  setFilter('All');
                  setSearch('');
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            filteredExercises.map((ex, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--sf)',
                  border: '1px solid var(--ln)',
                  borderRadius: '18px',
                  padding: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform .2s ease, box-shadow .2s ease'
                }}
                onClick={() => setPreviewExercise(ex)}
                title="Click to view technique & form steps"
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '10px'
                    }}
                  >
                    <span className="tg">{ex[1] || 'Beginner'}</span>
                    <span
                      style={{
                        fontSize: '12px',
                        color: 'var(--sub)',
                        fontWeight: 600,
                        background: 'var(--mint)',
                        padding: '3px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {ex[2]}
                    </span>
                  </div>

                  <b style={{ fontSize: '18px', display: 'block', margin: '4px 0 6px', color: 'var(--tx)' }}>
                    {ex[0]}
                  </b>

                  <small
                    className="muted"
                    style={{ display: 'block', fontSize: '13px', lineHeight: 1.4 }}
                  >
                    Target: <b>{ex[3]}</b>
                  </small>
                </div>

                <div
                  style={{
                    marginTop: '16px',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--ln)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '13px',
                    color: 'var(--g)',
                    fontWeight: 600
                  }}
                >
                  <span>View technique &amp; instructions</span>
                  <span>&rarr;</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
