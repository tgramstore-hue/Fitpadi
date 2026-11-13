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
    startWorkout
  } = useApp();

  if (!programme) return notFound();

  const isJoined = joinedProgrammes[progId];
  const doneLessons = completedLessons[progId] || [];
  const progressPct = Math.round((doneLessons.length / LES.length) * 100);

  return (
    <div className="pg">
      <div className="bcr">
        <Link href="/app/programmes">&larr; Back to all programmes</Link>
      </div>

      {/* Programme Header Card */}
      <div style={{ background: 'var(--wh)', border: '1px solid var(--ln)', borderRadius: '28px', overflow: 'hidden', margin: '16px 0 32px', boxShadow: '0 8px 24px rgba(20,38,28,.06)' }}>
        <div style={{ height: '220px', position: 'relative' }}>
          <SceneSvg type={SCN[progId] || 'walk'} color={programme[4] || '#16A34A'} />
        </div>

        <div style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="tg">{programme[2]}</span>
              <h1 style={{ fontSize: '32px', margin: '8px 0 10px' }}>{programme[1]}</h1>
              <p className="lead" style={{ fontSize: '16px', maxWidth: '640px' }}>
                {programme[3]}
              </p>
            </div>

            <div>
              {!isJoined ? (
                <button className="btn" onClick={() => joinProgramme(progId)}>
                  Enroll in Programme Free
                </button>
              ) : (
                <div style={{ background: 'var(--mint)', color: 'var(--gd)', padding: '10px 20px', borderRadius: '999px', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <SvgIcon name="chk" size={18} />
                  Currently Active
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--ln)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
              <span>Programme Progress</span>
              <span style={{ color: 'var(--g)' }}>{progressPct}% Completed</span>
            </div>
            <div className="pgb" style={{ height: '10px' }}>
              <i style={{ width: `${progressPct}%` }} />
            </div>
            <small className="muted" style={{ display: 'block', marginTop: '6px' }}>
              {doneLessons.length} of {LES.length} lessons finished
            </small>
          </div>
        </div>
      </div>

      {/* Two columns: Lessons Syllabus & Recommended Routine */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: '28px' }}>
        {/* Lessons List */}
        <div className="pn">
          <div className="pt">
            <h3>Syllabus &amp; Daily Lessons</h3>
            <small className="muted">Click checkbox to mark done</small>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            {LES.map((lessonName, idx) => {
              const isDone = doneLessons.includes(idx);
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    borderRadius: '16px',
                    background: isDone ? 'var(--mint)' : 'var(--sf)',
                    border: `1px solid ${isDone ? 'rgba(22,163,74,.3)' : 'var(--ln)'}`,
                    transition: 'all .2s'
                  }}
                >
                  <button
                    onClick={() => toggleLesson(progId, idx)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      border: `2px solid ${isDone ? 'var(--g)' : 'var(--sub)'}`,
                      background: isDone ? 'var(--g)' : 'transparent',
                      color: '#fff',
                      display: 'grid',
                      placeItems: 'center',
                      cursor: 'pointer',
                      flex: 'none'
                    }}
                    aria-label={isDone ? 'Mark incomplete' : 'Mark complete'}
                  >
                    {isDone && <SvgIcon name="chk" size={16} />}
                  </button>

                  <div style={{ flex: 1 }}>
                    <small className="muted" style={{ display: 'block', fontSize: '12px' }}>
                      Lesson {idx + 1}
                    </small>
                    <b style={{ fontSize: '16px', color: isDone ? 'var(--gd)' : 'var(--tx)' }}>
                      {lessonName}
                    </b>
                  </div>

                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--g)' }}>
                    +15 pts
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Exercises sidebar */}
        <div className="pn" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="pt">
            <h3>Key Exercises</h3>
            <small className="muted">Technique guide</small>
          </div>

          <p className="muted" style={{ fontSize: '14px', marginBottom: '16px' }}>
            Practice these core movements to maximize your benefits in this programme:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {LIB.slice(0, 4).map((ex, i) => (
              <div
                key={i}
                className="lr"
                style={{ cursor: 'pointer', padding: '10px 12px', borderRadius: '12px', background: 'var(--sf)' }}
                onClick={() => setPreviewExercise(ex)}
              >
                <div className="lt">
                  <SvgIcon name="dumb" size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: '14px', display: 'block' }}>{ex[0]}</b>
                  <small className="muted" style={{ fontSize: '12px' }}>{ex[1]} · {ex[3]}</small>
                </div>
                <span className="lk">Preview &rarr;</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
            <button
              className="btn"
              style={{ width: '100%' }}
              onClick={() => startWorkout(LIB.slice(0, 3).map((e) => e[0]))}
            >
              Start Practice Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

