'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { WORKOUT_LIBRARY, WorkoutExercise } from '../../data/workouts';
import WorkoutPlayer from '../../components/WorkoutPlayer';

const DIFFICULTY_COLORS: Record<WorkoutExercise['difficulty'], string> = {
  Beginner: '#16A34A',
  Intermediate: '#D97706',
  Advanced: '#EF5A3C',
};

const MUSCLE_ICONS: Record<string, string> = {
  Chest: '💪', Triceps: '💪', Shoulders: '🏋️', Quads: '🦵', Glutes: '🍑',
  Hamstrings: '🦵', Core: '🎯', Cardio: '❤️', Abs: '🎯', Obliques: '🎯',
  'Hip Flexors': '🦵', Full: '🏃',
};

function getMuscleIcon(targetMuscle: string): string {
  const first = targetMuscle.split(',')[0].trim();
  return MUSCLE_ICONS[first] ?? '🏋️';
}

export default function WorkoutPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const current = WORKOUT_LIBRARY[currentIndex];

  useEffect(() => {
    // Staggered reveal animation for list items
    const timers = WORKOUT_LIBRARY.map((_, i) =>
      setTimeout(() => setVisibleItems((prev) => [...prev, i]), i * 60)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  function switchTo(index: number) {
    if (index === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 220);
  }

  function prev() {
    if (currentIndex > 0) switchTo(currentIndex - 1);
  }

  function next() {
    if (currentIndex < WORKOUT_LIBRARY.length - 1) switchTo(currentIndex + 1);
  }

  return (
    <>
      {/* Page header */}
      <div className="ph">
        <div className="w">
          <span className="eb">Workout Session</span>
          <h1 style={{ fontSize: 'clamp(28px,4vw,40px)' }}>Exercise Library</h1>
          <p className="lead" style={{ marginTop: 10 }}>
            {WORKOUT_LIBRARY.length} essential full-body exercises · looping animation guides
          </p>
        </div>
      </div>

      {/* Main layout */}
      <div className="w" style={{ padding: '48px 24px 80px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32, alignItems: 'start' }}>

        {/* ── Left: Player + controls ── */}
        <div>
          {/* Exercise info */}
          <div
            className="wc rv in"
            style={{
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                width: 56, height: 56, borderRadius: 18,
                background: 'var(--mint)', display: 'grid', placeItems: 'center', fontSize: 26, flexShrink: 0,
              }}
            >
              {getMuscleIcon(current.targetMuscle)}
            </div>
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: 'clamp(22px,3vw,32px)',
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating ? 'translateY(8px)' : 'none',
                  transition: 'opacity .22s ease, transform .22s ease',
                }}
              >
                {current.name}
              </h2>
              <p className="muted" style={{ marginTop: 4, fontSize: 15 }}>
                {current.targetMuscle}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0, flexWrap: 'wrap' }}>
              <span
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '6px 14px', borderRadius: 999, fontSize: 13, fontWeight: 700,
                  background: DIFFICULTY_COLORS[current.difficulty] + '18',
                  color: DIFFICULTY_COLORS[current.difficulty],
                  border: `1.5px solid ${DIFFICULTY_COLORS[current.difficulty]}40`,
                }}
              >
                ● {current.difficulty}
              </span>
              <span
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '6px 14px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                  background: 'var(--sf)', color: 'var(--sub)',
                  border: '1.5px solid var(--ln)',
                }}
              >
                ⏱ {current.durationSeconds}s
              </span>
            </div>
          </div>

          {/* Video player */}
          <div
            className="wc"
            style={{
              borderRadius: 28, overflow: 'hidden', padding: 0,
              aspectRatio: '16 / 9',
              background: 'var(--sf)',
              opacity: isAnimating ? 0 : 1,
              transition: 'opacity .22s ease',
            }}
          >
            <WorkoutPlayer videoUrl={current.videoUrl} exerciseName={current.name} />
          </div>

          {/* Previous / Next controls */}
          <div
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginTop: 24, gap: 12,
            }}
          >
            <button
              className="btn o"
              onClick={prev}
              disabled={currentIndex === 0}
              style={{ opacity: currentIndex === 0 ? 0.4 : 1, cursor: currentIndex === 0 ? 'default' : 'pointer' }}
              aria-label="Previous exercise"
            >
              ← Previous
            </button>

            {/* Progress dots */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
              {WORKOUT_LIBRARY.map((_, i) => (
                <button
                  key={i}
                  onClick={() => switchTo(i)}
                  aria-label={`Go to exercise ${i + 1}`}
                  style={{
                    width: i === currentIndex ? 24 : 8,
                    height: 8,
                    borderRadius: 999,
                    border: 0,
                    background: i === currentIndex ? 'var(--g)' : 'var(--ln)',
                    cursor: 'pointer',
                    transition: 'width .3s ease, background .3s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <button
              className="btn"
              onClick={next}
              disabled={currentIndex === WORKOUT_LIBRARY.length - 1}
              style={{
                opacity: currentIndex === WORKOUT_LIBRARY.length - 1 ? 0.4 : 1,
                cursor: currentIndex === WORKOUT_LIBRARY.length - 1 ? 'default' : 'pointer',
              }}
              aria-label="Next exercise"
            >
              Next →
            </button>
          </div>
        </div>

        {/* ── Right: Exercise selector list ── */}
        <div
          className="wc"
          style={{
            padding: 16, borderRadius: 24,
            position: 'sticky', top: 88,
            maxHeight: 'calc(100vh - 120px)', overflowY: 'auto',
          }}
        >
          <p style={{ fontWeight: 700, fontSize: 14, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--sub)', padding: '4px 10px 12px' }}>
            All Exercises
          </p>
          {WORKOUT_LIBRARY.map((ex, i) => (
            <button
              key={ex.id}
              onClick={() => switchTo(i)}
              style={{
                width: '100%', textAlign: 'left', border: 0, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px',
                borderRadius: 16, marginBottom: 4, fontFamily: 'var(--f)',
                background: i === currentIndex ? 'var(--mint)' : 'transparent',
                color: i === currentIndex ? 'var(--g)' : 'var(--tx)',
                fontWeight: i === currentIndex ? 700 : 500,
                transition: 'background .2s, color .2s, transform .3s ease, opacity .3s ease',
                transform: visibleItems.includes(i) ? 'none' : 'translateX(16px)',
                opacity: visibleItems.includes(i) ? 1 : 0,
              }}
              aria-current={i === currentIndex ? 'true' : undefined}
            >
              <span
                style={{
                  width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                  display: 'grid', placeItems: 'center', fontSize: 16,
                  background: i === currentIndex ? 'var(--g)' : 'var(--sf)',
                  color: i === currentIndex ? '#fff' : 'var(--sub)',
                  transition: 'background .2s, color .2s',
                }}
              >
                {i + 1}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, lineHeight: 1.2 }}>{ex.name}</div>
                <div style={{ fontSize: 12, color: 'var(--sub)', marginTop: 2, fontWeight: 500 }}>
                  {ex.durationSeconds}s · {ex.difficulty}
                </div>
              </div>
              {i === currentIndex && (
                <span style={{ color: 'var(--g)', fontSize: 18, lineHeight: 1 }}>▶</span>
              )}
            </button>
          ))}

          {/* CTA at bottom of list */}
          <div style={{ marginTop: 16, padding: '14px 12px', borderTop: '1px solid var(--ln)' }}>
            <Link href="/programs" className="btn sm" style={{ width: '100%', justifyContent: 'center' }}>
              View Full Programs
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 860px) {
          .workout-layout { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .workout-layout { gap: 20px !important; padding: 24px 16px 60px !important; }
        }
      `}</style>
    </>
  );
}
