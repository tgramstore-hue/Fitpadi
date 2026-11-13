'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.jsx';
import SvgIcon from './SvgIcon.jsx';

export default function WorkoutModal() {
  const { activeWorkout, finishWorkout, closeWorkout, soundEnabled } = useApp();
  const [phase, setPhase] = useState('prepare'); // 'prepare' | 'work' | 'rest' | 'done'
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3);
  const [isRunning, setIsRunning] = useState(true);

  const exercises = activeWorkout?.exercises || [];
  const workDuration = activeWorkout?.duration || 40;
  const restDuration = activeWorkout?.rest || 15;

  // Sound beep
  const playBeep = (freq = 600, dur = 0.15) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + dur);
    } catch (e) {}
  };

  useEffect(() => {
    if (!activeWorkout) {
      setPhase('prepare');
      setCurrentIdx(0);
      setTimeLeft(3);
      setIsRunning(true);
      return;
    }

    if (!isRunning || phase === 'done') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Transition
          if (phase === 'prepare') {
            playBeep(880, 0.3);
            setPhase('work');
            return workDuration;
          } else if (phase === 'work') {
            if (currentIdx < exercises.length - 1) {
              playBeep(440, 0.2);
              setPhase('rest');
              return restDuration;
            } else {
              playBeep(988, 0.5);
              setPhase('done');
              return 0;
            }
          } else if (phase === 'rest') {
            playBeep(880, 0.3);
            setCurrentIdx((i) => i + 1);
            setPhase('work');
            return workDuration;
          }
          return 0;
        }
        if (prev <= 4) {
          playBeep(520, 0.1);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeWorkout, isRunning, phase, currentIdx, exercises.length, workDuration, restDuration, soundEnabled]);

  if (!activeWorkout) return null;

  const currentExercise = exercises[currentIdx] || 'Exercise';
  const nextExercise = exercises[currentIdx + 1] || null;

  const totalTime = phase === 'work' ? workDuration : (phase === 'rest' ? restDuration : 3);
  const progressPct = phase === 'done' ? 100 : Math.round(((totalTime - timeLeft) / totalTime) * 100);

  return (
    <div className="md" onClick={closeWorkout}>
      <div className="mc" style={{ textAlign: 'center', maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
        <button className="cl" aria-label="Close" onClick={closeWorkout}>
          <SvgIcon name="close" size={20} />
        </button>

        {phase === 'done' ? (
          <div>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--mint)', color: 'var(--gd)', display: 'grid', placeItems: 'center', margin: '0 auto 18px' }}>
              <SvgIcon name="chk" size={36} />
            </div>
            <h2>Workout Completed!</h2>
            <p className="muted" style={{ margin: '10px 0 24px' }}>
              Awesome effort! You finished all {exercises.length} exercises and earned <b>+50 points</b>.
            </p>
            <button className="btn" style={{ width: '100%' }} onClick={finishWorkout}>
              Claim Rewards &amp; Finish
            </button>
          </div>
        ) : (
          <div>
            <span className="eb" style={{ letterSpacing: '0.12em' }}>
              {phase === 'prepare' ? 'GET READY' : (phase === 'work' ? `EXERCISE ${currentIdx + 1} OF ${exercises.length}` : 'REST TIME')}
            </span>

            <h2 style={{ fontSize: '32px', margin: '12px 0 20px' }}>
              {phase === 'prepare' ? 'Starting in...' : (phase === 'work' ? currentExercise : 'Take a Breath')}
            </h2>

            {/* Circular/Big Timer display */}
            <div style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              margin: '0 auto 24px',
              background: phase === 'work' ? 'var(--mint)' : 'var(--sf)',
              border: `4px solid ${phase === 'work' ? 'var(--g)' : 'var(--ln)'}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: phase === 'work' ? 'var(--gd)' : 'var(--tx)'
            }}>
              <span style={{ fontSize: '54px', fontWeight: 800, lineHeight: 1 }}>{timeLeft}</span>
              <small style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', opacity: 0.8 }}>seconds</small>
            </div>

            {nextExercise && phase === 'work' && (
              <p className="muted" style={{ fontSize: '14px', marginBottom: '20px' }}>
                Next up: <b>{nextExercise}</b>
              </p>
            )}

            {/* Progress bar */}
            <div className="pgb" style={{ height: '8px', marginBottom: '24px' }}>
              <i style={{ width: `${progressPct}%` }} />
            </div>

            {/* Control buttons */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                className="btn o sm"
                onClick={() => setIsRunning(!isRunning)}
              >
                {isRunning ? 'Pause' : 'Resume'}
              </button>
              {currentIdx < exercises.length - 1 && (
                <button
                  className="btn sm"
                  onClick={() => {
                    setCurrentIdx((i) => i + 1);
                    setPhase('work');
                    setTimeLeft(workDuration);
                  }}
                >
                  Skip
                </button>
              )}
              <button
                className="btn sm o"
                onClick={closeWorkout}
                style={{ borderColor: 'var(--sub)', color: 'var(--sub)' }}
              >
                End
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

