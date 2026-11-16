'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SceneSvg from '../../../../components/SceneSvg.jsx';
import SvgIcon from '../../../../components/SvgIcon.jsx';
import { useApp } from '../../../../context/AppContext.jsx';
import { PRG, SCN, LES, LIB } from '../../../../data/appData.js';

export default function ProgrammeDetailPage({ params }) {
  const unwrappedParams = use(params);
  const progId = parseInt(unwrappedParams.id, 10);
  const programme = PRG[progId];

  const {
    completedLessons,
    toggleLesson,
    joinedProgrammes,
    joinProgramme,
    setPreviewExercise,
    startWorkout,
    showToast
  } = useApp();

  if (!programme) return notFound();

  const isJoined = joinedProgrammes[progId];
  const doneLessons = completedLessons[progId] || [];
  const progressPct = Math.round((doneLessons.length / LES.length) * 100);

  return (
    <div className="pg">
      <div className="bcr">
        <Link href="/app/programmes" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span>&larr;</span> Back to all programmes
        </Link>
      </div>

      {/* Programme Header Card */}
      <div className="card-box" style={{ padding: 0, overflow: 'hidden', margin: '16px 0 28px' }}>
        <div style={{ height: '220px', position: 'relative' }}>
          <SceneSvg type={SCN[progId] || 'walk'} color={programme[4] || '#16A34A'} />
        </div>

        <div style={{ padding: '28px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="sec-label" style={{ marginBottom: '6px' }}>PATHWAY CURRICULUM</div>
              <span className="tg">{programme[2]}</span>
              <h1 style={{ fontSize: '30px', margin: '8px 0 10px', letterSpacing: '-0.02em' }}>{programme[1]}</h1>
              <p className="lead" style={{ fontSize: '15px', maxWidth: '640px', lineHeight: 1.5 }}>
                {programme[3]}
              </p>
            </div>

            <div>
              {!isJoined ? (
                <button
                  className="pill-btn pill-blue"
                  style={{ height: '42px', padding: '0 24px' }}
                  onClick={() => {
                    joinProgramme(progId);
                    showToast('Enrolled in programme! +25 Health Fund points');
                  }}
                >
                  Enroll in Programme Free
                </button>
              ) : (
                <div style={{ background: 'var(--mint)', color: 'var(--gd)', padding: '10px 20px', borderRadius: '999px', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="chk-circle" style={{ width: '20px', height: '20px', fontSize: '12px' }}>✓</div>
                  Currently Enrolled &amp; Active
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--ln)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
              <span className="sec-label">PROGRAMME COMPLETION</span>
              <span style={{ color: 'var(--g)', fontWeight: 800 }}>{progressPct}% Completed</span>
            </div>
            <div className="pgb" style={{ height: '10px' }}>
              <i style={{ width: `${progressPct}%` }} />
            </div>
            <small className="muted" style={{ display: 'block', marginTop: '6px', fontSize: '13px' }}>
              {doneLessons.length} of {LES.length} daily syllabus lessons completed
            </small>
          </div>
        </div>
      </div>

      {/* Two columns: Lessons Syllabus & Recommended Routine */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Lessons List */}
        <div className="card-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <div className="sec-label">SYLLABUS</div>
              <h3 style={{ fontSize: '20px', margin: '2px 0 0' }}>Daily Lessons</h3>
            </div>
            <small className="muted" style={{ fontSize: '12px' }}>Tap check to complete</small>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {LES.map((lessonName, idx) => {
              const isDone = doneLessons.includes(idx);
              return (
                <div
                  key={idx}
                  className="card-row"
                  style={{
                    padding: '12px 14px',
                    borderRadius: '16px',
                    background: isDone ? 'var(--mint)' : 'var(--sf)',
                    border: `1px solid ${isDone ? 'rgba(22,163,74,.3)' : 'var(--ln)'}`,
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleLesson(progId, idx)}
                >
                  {isDone ? (
                    <div className="chk-circle">✓</div>
                  ) : (
                    <div className="num-badge" style={{ width: '28px', height: '28px', fontSize: '12px' }}>
                      {idx + 1}
                    </div>
                  )}

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <small className="muted" style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Lesson {idx + 1}
                    </small>
                    <b style={{ fontSize: '15px', color: isDone ? 'var(--gd)' : 'var(--tx)', display: 'block' }}>
                      {lessonName}
                    </b>
                  </div>

                  <span className="pill-tag" style={{ background: isDone ? '#22C55E' : 'rgba(0,122,255,0.1)', color: isDone ? '#fff' : '#007AFF' }}>
                    +15 pts
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Key Exercises Sidebar */}
        <div className="card-box" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="sec-label">PRACTICE MOVEMENTS</div>
          <h3 style={{ fontSize: '20px', margin: '2px 0 8px' }}>Key Technique Exercises</h3>
          <p className="muted" style={{ fontSize: '13px', marginBottom: '16px', lineHeight: 1.4 }}>
            Practice these core biomechanical movements to get the maximum health impact from this programme:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {LIB.slice(0, 4).map((ex, i) => (
              <div
                key={i}
                className="card-row"
                style={{
                  cursor: 'pointer',
                  padding: '12px 14px',
                  borderRadius: '16px',
                  background: 'var(--sf)',
                  border: '1px solid var(--ln)'
                }}
                onClick={() => setPreviewExercise(ex)}
                title="Click to view technique & form steps"
              >
                <div
                  className={`flat-sq ${
                    i === 0 ? 'sq-blue' : i === 1 ? 'sq-orange' : i === 2 ? 'sq-green' : 'sq-purple'
                  }`}
                  style={{ width: '38px', height: '38px', borderRadius: '12px' }}
                >
                  <SvgIcon name="dumb" size={18} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <b style={{ fontSize: '14px', display: 'block', color: 'var(--tx)' }}>{ex[0]}</b>
                  <small className="muted" style={{ fontSize: '12px', display: 'block' }}>{ex[1]} · {ex[3]}</small>
                </div>
                <span style={{ color: 'var(--g)', fontSize: '13px', fontWeight: 700 }}>Preview &rarr;</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
            <button
              className="pill-btn pill-blue"
              style={{ width: '100%', height: '42px' }}
              onClick={() => {
                startWorkout(LIB.slice(0, 4).map((e) => e[0]));
                showToast('Starting guided practice routine!');
              }}
            >
              Start Practice Session (4 moves)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
