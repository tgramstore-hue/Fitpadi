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
  const [breathPhase, setBreathPhase] = useState('Ready'); // 'Inhale...', 'Hold breath...', 'Exhale slowly...', 'Ready'
  const breathTimerRef = useRef(null);

  // Exercise Library State
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Full Body', 'Upper Body', 'Lower Body', 'Core'];

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
  }, [breathActive, breathDuration, setPoints, showToast]);

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
      {/* 4 Top KPI Cards using modern card pattern & flat saturated squircles */}
      <div className="card-box s3">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div className="flat-sq sq-blue">
            <SvgIcon name="act" size={24} />
          </div>
          <div>
            <div className="sec-label">TOTAL STEPS</div>
            <b style={{ fontSize: '24px', display: 'block', letterSpacing: '-0.02em' }}>
              {steps.toLocaleString()}
            </b>
            <small className="muted" style={{ fontSize: '12px' }}>
              {progressPercent}% of {goal.toLocaleString()} goal
            </small>
          </div>
        </div>
      </div>

      <div className="card-box s3">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div className="flat-sq sq-green">
            <SvgIcon name="clock" size={24} />
          </div>
          <div>
            <div className="sec-label">ACTIVE MOVEMENT</div>
            <b style={{ fontSize: '24px', display: 'block', letterSpacing: '-0.02em' }}>
              {activeMins} min
            </b>
            <small className="muted" style={{ fontSize: '12px' }}>Target: 30 min / day</small>
          </div>
        </div>
      </div>

      <div className="card-box s3">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div className="flat-sq sq-orange">
            <SvgIcon name="flame" size={24} />
          </div>
          <div>
            <div className="sec-label">ESTIMATED BURN</div>
            <b style={{ fontSize: '24px', display: 'block', letterSpacing: '-0.02em' }}>
              {caloriesBurned} kcal
            </b>
            <small className="muted" style={{ fontSize: '12px' }}>Active expenditure</small>
          </div>
        </div>
      </div>

      <div className="card-box s3">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div className="flat-sq sq-teal">
            <SvgIcon name="heart" size={24} />
          </div>
          <div>
            <div className="sec-label">DISTANCE COVERED</div>
            <b style={{ fontSize: '24px', display: 'block', letterSpacing: '-0.02em' }}>
              {distanceKm} km
            </b>
            <small className="muted" style={{ fontSize: '12px' }}>Outdoor &amp; treadmill</small>
          </div>
        </div>
      </div>

      {/* Feature Sunset Banner (like Images 1 & 3) */}
      <div className="s12">
        <div className="banner-orange">
          <div className="banner-icon">
            <SvgIcon name="flame" size={24} />
          </div>
          <div>
            <b>Daily Movement Challenge · Keep your streak burning!</b>
            <p>Reach your 8,000 steps target today to secure +50 Health Fund pool points and climb the rankings.</p>
          </div>
          <button
            className="banner-btn"
            onClick={() => {
              logQuickActivity(15, 25);
              setSteps((s) => s + 1200);
              showToast('Quick walk logged! +1,200 steps & +25 points 🔥');
            }}
          >
            + Quick Walk
          </button>
        </div>
      </div>

      {/* Walking Tracker Card (span 8) */}
      <div className="card-box s8">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
          <div>
            <div className="sec-label">WALKING TRACKER</div>
            <h3 style={{ fontSize: '20px', margin: '2px 0 0' }}>Live Cadence &amp; Step Counter</h3>
          </div>
          <button
            className="pill-tag"
            style={{ cursor: 'pointer', border: 'none', background: 'var(--mint)', color: 'var(--gd)', fontWeight: 700 }}
            title="Click to toggle sync source"
            onClick={() => {
              const nextMode =
                sourceMode === 'Manual entry' ? 'Connected to Health Connect' : 'Manual entry';
              setSourceMode(nextMode);
              showToast(`Sync source: ${nextMode}`);
            }}
          >
            ● {sourceMode}
          </button>
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
              <div className="sec-label" style={{ marginBottom: '8px' }}>SET DAILY GOAL</div>
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
            className={`pill-btn ${isWalking ? 'pill-outline' : 'pill-blue'}`}
            onClick={toggleWalkingSession}
          >
            {isWalking ? 'Pause walking' : 'Start walking'}
          </button>
          <button
            className="pill-btn pill-outline"
            onClick={finishWalkingSession}
          >
            Finish session
          </button>
          <span className="muted" style={{ fontSize: '14px', marginLeft: '6px' }}>
            Session time: <b style={{ color: 'var(--tx)' }}>{formatTimer(walkSeconds)}</b>
          </span>
          <button
            className="pill-btn pill-green"
            style={{ marginLeft: 'auto' }}
            onClick={() => {
              logQuickActivity(15, 15);
              setSteps((s) => s + 1500);
              showToast('+15 min & +1,500 steps logged! +15 pts');
            }}
          >
            + Quick log 15 min
          </button>
        </div>
      </div>

      {/* Recent Walks History (span 4) */}
      <div className="card-box s4">
        <div className="sec-label">RECENT WALKS</div>
        <h3 style={{ fontSize: '18px', margin: '2px 0 12px' }}>Recorded Walks</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {walks.map((w, idx) => (
            <div key={idx} className="card-row" style={{ padding: '10px 0' }}>
              <div className="flat-sq sq-blue" style={{ width: '38px', height: '38px', borderRadius: '12px' }}>
                <SvgIcon name="act" size={18} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <b style={{ fontSize: '14px', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {w[0]}
                </b>
                <small className="muted" style={{ display: 'block', fontSize: '12px' }}>
                  {w[1]} · {w[2]}
                </small>
              </div>
              <div className="chk-circle" title="Verified by Step Detector">
                ✓
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guided Breathing Break (span 6) */}
      <div className="card-box s6" style={{ background: 'linear-gradient(135deg, #0F766E 0%, #115E59 100%)', color: '#fff' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="sec-label" style={{ color: 'rgba(255,255,255,0.75)' }}>MINDFUL BREATHING BREAK</div>
          <h3 style={{ color: '#fff', fontSize: '22px', margin: '4px 0 6px' }}>Four-Count Box Breathing</h3>
          <p style={{ fontSize: '13px', opacity: 0.88, maxWidth: '380px', margin: '0 auto 14px' }}>
            Inhale, hold, exhale, reset. Clinically designed to lower cortisol and steady resting pulse.
          </p>

          {/* Duration selector */}
          <div className="cps" style={{ justifyContent: 'center', marginBottom: '16px' }}>
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
                  color: dur === breathDuration ? '#0F766E' : '#fff',
                  borderColor: 'transparent',
                  fontWeight: 700
                }}
                onClick={() => selectBreathDuration(dur)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Breathing Animated Circle */}
          <div
            className={`br ${breathActive ? 'on' : ''}`}
            id="bc"
            style={{
              width: '120px',
              height: '120px',
              margin: '14px auto 10px',
              display: 'grid',
              placeItems: 'center',
              borderRadius: '50%',
              background: 'rgba(255,255,255,.22)',
              boxShadow: breathActive ? '0 0 35px rgba(255,255,255,.5)' : 'none',
              transition: 'all 0.5s ease'
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#fff' }}>
              {breathPhase}
            </span>
          </div>

          <div style={{ opacity: 0.9, marginBottom: '14px', fontSize: '14px', fontWeight: 600 }}>
            {formatTimer(breathRemaining)} remaining
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              className="pill-btn"
              style={{ background: '#fff', color: '#0F766E', minWidth: '130px' }}
              onClick={toggleBreathing}
            >
              {breathActive ? 'Pause' : 'Begin session'}
            </button>
            {breathActive && (
              <button
                className="pill-btn pill-outline"
                style={{ borderColor: 'rgba(255,255,255,0.6)', color: '#fff' }}
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
      </div>

      {/* More Ways to Move (span 6) */}
      <div className="card-box s6">
        <div className="sec-label">EXPLORE ACTIVITIES</div>
        <h3 style={{ fontSize: '20px', margin: '2px 0 14px' }}>More Ways to Move</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            [
              'Workout builder',
              'Create and play your customized interval routines',
              '/app/workouts',
              'dumb',
              'sq-purple'
            ],
            [
              'Nutrition and hydration',
              'Track daily water intake and explore balanced West African meals',
              '/app/nutrition',
              'leaf',
              'sq-orange'
            ],
            [
              'Structured programmes',
              'Evidence-based multi-week health pathways with lessons',
              '/app/programmes',
              'shield',
              'sq-blue'
            ]
          ].map(([title, desc, href, icon, sqClass], idx) => (
            <Link
              key={idx}
              href={href}
              className="card-row"
              style={{ textDecoration: 'none', padding: '12px 0' }}
            >
              <div className={`flat-sq ${sqClass}`}>
                <SvgIcon name={icon} size={22} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <b style={{ fontSize: '15px', color: 'var(--tx)', display: 'block' }}>{title}</b>
                <small className="muted" style={{ display: 'block', marginTop: '2px' }}>
                  {desc}
                </small>
              </div>
              <span style={{ color: 'var(--g)', fontSize: '18px', fontWeight: 800 }}>&rarr;</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Exercise Movement Library (span 12) - Fully Functional Categories & Filters */}
      <div className="card-box s12">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
          <div>
            <div className="sec-label">EXERCISE MOVEMENT LIBRARY</div>
            <h3 style={{ fontSize: '22px', margin: '2px 0 4px' }}>Technique &amp; Form Guide</h3>
            <small className="muted">
              Explore step-by-step biomechanics, breathing techniques &amp; target muscle groups
            </small>
          </div>
          <button
            className="pill-btn pill-blue"
            onClick={() => {
              const routineNames = filteredExercises.slice(0, 4).map((e) => e[0]);
              startWorkout(routineNames.length ? routineNames : ['High knees', 'Push-ups', 'Bodyweight squats', 'Plank hold']);
              showToast('Starting quick 4-movement routine!');
            }}
          >
            Start routine ({Math.min(4, filteredExercises.length)})
          </button>
        </div>

        {/* Categories Pills & Search Input */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '14px 0 20px'
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

          <div className="bsr" style={{ height: '40px', maxWidth: '300px', width: '100%' }}>
            <SvgIcon name="search" size={16} />
            <input
              placeholder="Search movement or muscle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Exercise Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
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
                className="pill-btn pill-outline"
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
                  borderRadius: '20px',
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
                        fontWeight: 700,
                        background: 'var(--mint)',
                        padding: '3px 9px',
                        borderRadius: '6px'
                      }}
                    >
                      {ex[2]}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '8px 0 10px' }}>
                    <div
                      className={`flat-sq ${
                        ex[2] === 'Upper Body'
                          ? 'sq-blue'
                          : ex[2] === 'Lower Body'
                          ? 'sq-green'
                          : ex[2] === 'Core'
                          ? 'sq-purple'
                          : 'sq-orange'
                      }`}
                      style={{ width: '40px', height: '40px', borderRadius: '12px', flex: 'none' }}
                    >
                      <SvgIcon name={ex[6] || 'dumb'} size={20} />
                    </div>
                    <b style={{ fontSize: '17px', color: 'var(--tx)', lineHeight: 1.3 }}>
                      {ex[0]}
                    </b>
                  </div>

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
                    fontWeight: 700
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
