'use client';

import React, { useState } from 'react';
import SvgIcon from '../../../components/SvgIcon.jsx';
import { useApp } from '../../../context/AppContext.jsx';
import { LIB } from '../../../data/appData.js';

export default function WorkoutsPage() {
  const { startWorkout, setPreviewExercise } = useApp();

  const [selectedEx, setSelectedEx] = useState([
    'Jumping jacks',
    'Bodyweight squats',
    'Plank hold'
  ]);
  const [workSec, setWorkSec] = useState(40);
  const [restSec, setRestSec] = useState(15);

  const toggleExercise = (name) => {
    setSelectedEx((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const totalSeconds = selectedEx.length * workSec + Math.max(0, selectedEx.length - 1) * restSec + 3;
  const totalMinutes = (totalSeconds / 60).toFixed(1);

  const prebuiltRoutines = [
    {
      title: '7-Minute Quick Full Body',
      desc: 'High energy metabolic booster designed for busy days.',
      exercises: ['Jumping jacks', 'Push-ups', 'Bodyweight squats', 'Plank hold', 'Glute bridges'],
      work: 40,
      rest: 15
    },
    {
      title: 'Core & Stability Ignition',
      desc: 'Build abdominal strength and protect your lower back.',
      exercises: ['Plank hold', 'Dead bug', 'Glute bridges', 'Bird dog'],
      work: 35,
      rest: 15
    },
    {
      title: 'Lower Body & Leg Power',
      desc: 'Quads, hamstrings, and calves for functional walking stamina.',
      exercises: ['Bodyweight squats', 'Lunges', 'Calf raises', 'Glute bridges'],
      work: 45,
      rest: 20
    }
  ];

  return (
    <div>
      {/* Active Workout Builder Card */}
      <div className="pn" style={{ marginBottom: '32px' }}>
        <div className="pt">
          <div>
            <h3>Interactive Routine Builder</h3>
            <small className="muted">Customize intervals, exercises &amp; rest periods</small>
          </div>
          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--g)' }}>
            Est. Time: {totalMinutes} min
          </span>
        </div>

        {/* Sliders / Duration settings */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', margin: '20px 0 28px' }}>
          <div style={{ background: 'var(--sf)', padding: '16px 20px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: 600 }}>Work Interval</label>
              <b style={{ color: 'var(--g)' }}>{workSec}s</b>
            </div>
            <div className="cps">
              {[30, 40, 45, 60].map((s) => (
                <button
                  key={s}
                  className={`cp ${workSec === s ? 'on' : ''}`}
                  onClick={() => setWorkSec(s)}
                >
                  {s}s
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--sf)', padding: '16px 20px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: 600 }}>Rest Interval</label>
              <b style={{ color: 'var(--cor)' }}>{restSec}s</b>
            </div>
            <div className="cps">
              {[10, 15, 20, 30].map((s) => (
                <button
                  key={s}
                  className={`cp ${restSec === s ? 'on' : ''}`}
                  onClick={() => setRestSec(s)}
                >
                  {s}s
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Exercise Checklist */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '15px', marginBottom: '12px', color: 'var(--sub)' }}>
            Selected Exercises ({selectedEx.length})
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '10px' }}>
            {LIB.map((ex, i) => {
              const isSelected = selectedEx.includes(ex[0]);
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: '14px',
                    background: isSelected ? 'var(--mint)' : 'var(--sf)',
                    border: `1.5px solid ${isSelected ? 'var(--g)' : 'var(--ln)'}`,
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleExercise(ex[0])}
                >
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '6px',
                      border: `2px solid ${isSelected ? 'var(--g)' : 'var(--sub)'}`,
                      background: isSelected ? 'var(--g)' : 'transparent',
                      color: '#fff',
                      display: 'grid',
                      placeItems: 'center',
                      flex: 'none'
                    }}
                  >
                    {isSelected && <SvgIcon name="chk" size={14} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <b style={{ fontSize: '14px', color: isSelected ? 'var(--gd)' : 'var(--tx)' }}>{ex[0]}</b>
                    <small className="muted" style={{ display: 'block', fontSize: '11px' }}>{ex[1]}</small>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewExercise(ex);
                    }}
                    style={{ background: 'none', border: 0, color: 'var(--sub)', cursor: 'pointer', padding: '4px' }}
                    title="Preview technique"
                  >
                    <SvgIcon name="eye" size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <button
          className="btn"
          style={{ width: '100%', height: '54px', fontSize: '18px' }}
          disabled={selectedEx.length === 0}
          onClick={() => startWorkout(selectedEx, workSec, restSec)}
        >
          <SvgIcon name="play" size={22} />
          Start Interactive Workout ({selectedEx.length} exercises)
        </button>
      </div>

      {/* Pre-built routine templates */}
      <div className="pn">
        <div className="pt">
          <div>
            <h3>Pre-Built Routine Templates</h3>
            <small className="muted">Curated by certified trainers</small>
          </div>
        </div>

        <div className="grid" style={{ marginTop: '16px' }}>
          {prebuiltRoutines.map((routine, idx) => (
            <div key={idx} className="card wt" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="ico" style={{ background: 'var(--mint)', color: 'var(--gd)' }}>
                <SvgIcon name="dumb" size={24} />
              </div>
              <h3 style={{ fontSize: '19px' }}>{routine.title}</h3>
              <p className="muted" style={{ fontSize: '14px', margin: '8px 0 16px', lineHeight: 1.5 }}>
                {routine.desc}
              </p>
              <div style={{ background: 'var(--sf)', padding: '12px 14px', borderRadius: '12px', fontSize: '13px', marginBottom: '20px' }}>
                <b>{routine.exercises.length} exercises</b> · {routine.work}s work / {routine.rest}s rest
              </div>
              <button
                className="btn sm"
                style={{ marginTop: 'auto', width: '100%' }}
                onClick={() => startWorkout(routine.exercises, routine.work, routine.rest)}
              >
                Launch Routine &rarr;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

