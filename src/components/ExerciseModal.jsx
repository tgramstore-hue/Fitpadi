'use client';

import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import SvgIcon from './SvgIcon.jsx';

export default function ExerciseModal() {
  const { previewExercise, setPreviewExercise } = useApp();

  if (!previewExercise) return null;

  return (
    <div className="md" onClick={() => setPreviewExercise(null)}>
      <div className="mc" onClick={(e) => e.stopPropagation()}>
        <button
          className="cl"
          aria-label="Close"
          onClick={() => setPreviewExercise(null)}
        >
          <SvgIcon name="close" size={20} />
        </button>

        <span className="eb" style={{ marginBottom: '8px' }}>
          {previewExercise[2] || 'Full Body'}
        </span>
        <h2>{previewExercise[0]}</h2>
        <p className="muted" style={{ margin: '6px 0 20px', fontSize: '15px' }}>
          Target: <b>{previewExercise[3]}</b> · Level: <b>{previewExercise[1]}</b>
        </p>

        <div style={{ background: 'var(--sf)', padding: '20px', borderRadius: '18px', marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '10px' }}>Instructions</h4>
          <ol style={{ paddingLeft: '20px', lineHeight: 1.7, color: 'var(--tx)', opacity: 0.9 }}>
            {(previewExercise[4] || [
              'Start in a controlled standing or lying position with neutral spine.',
              'Engage your core muscles throughout the entire range of motion.',
              'Breathe rhythmically: exhale during exertion, inhale during recovery.',
              'Maintain consistent tempo and finish all prescribed reps.'
            ]).map((step, idx) => (
              <li key={idx} style={{ marginBottom: '6px' }}>{step}</li>
            ))}
          </ol>
        </div>

        <button
          className="btn"
          style={{ width: '100%' }}
          onClick={() => setPreviewExercise(null)}
        >
          Got it
        </button>
      </div>
    </div>
  );
}

