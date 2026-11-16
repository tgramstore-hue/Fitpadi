'use client';

import React, { useState } from 'react';
import SvgIcon from '../../../components/SvgIcon.jsx';
import { useApp } from '../../../context/AppContext.jsx';
import { LIB } from '../../../data/appData.js';

export default function WorkoutsPage() {
  const { startWorkout, setPreviewExercise, showToast } = useApp();

  const [workoutName, setWorkoutName] = useState('Morning Energiser');
  const [selectedEx, setSelectedEx] = useState([
    'Jumping jacks',
    'Bodyweight squats',
    'Plank hold',
    'Glute bridges'
  ]);
  const [workSec, setWorkSec] = useState(40);
  const [restSec, setRestSec] = useState(15);

  const addExercise = (name) => {
    setSelectedEx((prev) => [...prev, name]);
    showToast(`${name} added to routine`);
  };

  const removeExercise = (index) => {
    setSelectedEx((prev) => prev.filter((_, i) => i !== index));
  };

  const moveExerciseUp = (index) => {
    if (index === 0) return;
    setSelectedEx((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const totalSeconds =
    selectedEx.length * workSec + Math.max(0, selectedEx.length - 1) * restSec + 3;
  const totalMinutes = Math.max(1, Math.round(totalSeconds / 60));

  const prebuiltRoutines = [
    {
      title: '7-Minute Quick Full Body',
      desc: 'High energy metabolic booster designed for busy daily schedules.',
      exercises: ['Jumping jacks', 'Push-ups', 'Bodyweight squats', 'Plank hold', 'Glute bridges'],
      work: 40,
      rest: 15,
      color: 'sq-purple'
    },
    {
      title: 'Core & Stability Flow',
      desc: 'Build abdominal strength, deep posture stabilizers, and protect lower back.',
      exercises: ['Plank hold', 'Bicycle crunches', 'Glute bridges', 'Cat-cow stretch'],
      work: 35,
      rest: 15,
      color: 'sq-teal'
    },
    {
      title: 'Lower Body & Leg Stamina',
      desc: 'Quads, hamstrings, and calves for functional everyday walking endurance.',
      exercises: ['Bodyweight squats', 'Lunges', 'High knees', 'Glute bridges'],
      work: 45,
      rest: 20,
      color: 'sq-blue'
    }
  ];

  return (
    <div className="gr" style={{ paddingBottom: '90px' }}>
      {/* Left Column: Interactive Workout Builder (span 8 - HTML layout) */}
      <div className="s8">
        <span className="sec-label">ROUTINE BUILDER</span>
        <div className="card-box">
          <div className="pt" style={{ marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '18px', margin: 0 }}>Custom workout builder</h3>
              <small className="muted">Customize intervals, order &amp; rest periods</small>
            </div>
            <button
              className="lk"
              style={{ background: 'none', border: 0, fontSize: '13px', fontWeight: 700 }}
              onClick={() => showToast('Routine template saved!')}
            >
              Save routine
            </button>
          </div>

          {/* Routine Name input */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--sub)' }}>
              Workout name
            </label>
            <input
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              placeholder="e.g. Core & Cardio blast"
              style={{ height: '44px', borderRadius: '14px' }}
            />
          </div>

          {/* Interval selectors */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--sub)', marginBottom: '6px' }}>
                Exercise time
              </label>
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

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--sub)', marginBottom: '6px' }}>
                Rest interval
              </label>
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

          {/* Selected Exercises Sequence List */}
          <div style={{ marginTop: '16px', borderTop: '1px solid var(--ln)', paddingTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="sec-label" style={{ margin: 0 }}>
                EXERCISE QUEUE ({selectedEx.length})
              </span>
              <span className="muted" style={{ fontSize: '12px' }}>
                Est. {totalMinutes} min
              </span>
            </div>

            {selectedEx.length === 0 ? (
              <p className="muted" style={{ padding: '20px 0', textAlign: 'center', fontSize: '14px' }}>
                No exercises selected yet. Add movements from the Exercise Library on the right!
              </p>
            ) : (
              <div>
                {selectedEx.map((exName, idx) => (
                  <div key={idx} className="card-row">
                    <span className="num-badge">{idx + 1}</span>
                    <div className="flat-sq sq-purple" style={{ width: '38px', height: '38px', borderRadius: '12px' }}>
                      <SvgIcon name="dumb" size={18} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <b style={{ fontSize: '15px', display: 'block', color: 'var(--tx)' }}>
                        {exName}
                      </b>
                      <small className="muted" style={{ fontSize: '12px' }}>
                        {workSec}s work · {restSec}s rest
                      </small>
                    </div>

                    {/* Move up */}
                    {idx > 0 && (
                      <button
                        className="pill-btn pill-outline"
                        style={{ height: '32px', width: '32px', padding: 0 }}
                        onClick={() => moveExerciseUp(idx)}
                        title="Move up"
                      >
                        <SvgIcon name="up" size={16} />
                      </button>
                    )}

                    {/* Remove */}
                    <button
                      className="pill-btn pill-outline"
                      style={{ height: '32px', width: '32px', padding: 0, color: '#EF4444', borderColor: '#FECDD3' }}
                      onClick={() => removeExercise(idx)}
                      title="Remove from routine"
                    >
                      <SvgIcon name="close" size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Launch Workout button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
              marginTop: '22px',
              paddingTop: '16px',
              borderTop: '1px solid var(--ln)',
              flexWrap: 'wrap'
            }}
          >
            <button
              className="pill-btn pill-blue"
              style={{ height: '48px', padding: '0 26px', fontSize: '16px' }}
              disabled={selectedEx.length === 0}
              onClick={() => startWorkout(selectedEx, workSec, restSec)}
            >
              <SvgIcon name="play" size={20} />
              <span>Start Interactive Workout</span>
            </button>
            <span className="muted" style={{ fontSize: '14px' }}>
              Total runtime: <b style={{ color: 'var(--tx)' }}>{totalMinutes} min</b>
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Exercise Library Picker (span 4 - HTML layout) */}
      <div className="s4">
        <span className="sec-label">EXERCISE LIBRARY</span>
        <div className="card-box" style={{ maxHeight: '680px', overflowY: 'auto' }}>
          <div className="pt" style={{ marginBottom: '10px' }}>
            <h3 style={{ fontSize: '17px', margin: 0 }}>Available movements</h3>
            <span className="pill-tag">{LIB.length} items</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {LIB.map((ex, i) => (
              <div key={i} className="card-row">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <b style={{ fontSize: '14px', display: 'block', color: 'var(--tx)' }}>
                    {ex[0]}
                  </b>
                  <small className="muted" style={{ fontSize: '12px' }}>
                    {ex[1]} · {ex[2]}
                  </small>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    className="pill-btn pill-outline"
                    style={{ height: '30px', padding: '0 8px' }}
                    onClick={() => setPreviewExercise(ex)}
                    title="View technique cues"
                  >
                    <SvgIcon name="eye" size={14} />
                  </button>
                  <button
                    className="pill-btn pill-blue"
                    style={{ height: '30px', padding: '0 12px', fontSize: '12px' }}
                    onClick={() => addExercise(ex[0])}
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pre-Built Routine Templates Section (span 12) */}
      <div className="s12" style={{ marginTop: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 4px' }}>
          <div>
            <span className="sec-label" style={{ margin: 0 }}>PRE-BUILT TEMPLATES</span>
            <h3 style={{ fontSize: '20px', margin: '2px 0 0' }}>Curated Coach Routines</h3>
          </div>
          <span className="muted" style={{ fontSize: '13px' }}>Tap to load &amp; play</span>
        </div>

        <div className="pgd" style={{ marginTop: 0 }}>
          {prebuiltRoutines.map((routine, idx) => (
            <div key={idx} className="card-box" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div className={`flat-sq ${routine.color}`}>
                  <SvgIcon name="dumb" size={22} />
                </div>
                <div>
                  <b style={{ fontSize: '16px', display: 'block', color: 'var(--tx)' }}>
                    {routine.title}
                  </b>
                  <span className="pp2" style={{ fontSize: '11px' }}>
                    {routine.exercises.length} exercises · {routine.work}s/{routine.rest}s
                  </span>
                </div>
              </div>

              <p className="muted" style={{ fontSize: '13px', lineHeight: 1.5, margin: '0 0 16px' }}>
                {routine.desc}
              </p>

              <button
                className="pill-btn pill-blue"
                style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}
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
