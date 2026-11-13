'use client';

import { useState, useCallback } from 'react';

interface WorkoutPlayerProps {
  videoUrl: string;
  exerciseName: string;
}

export default function WorkoutPlayer({ videoUrl, exerciseName }: WorkoutPlayerProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  const handleLoadedData = useCallback(() => {
    setHasError(false);
    setIsLoaded(true);
  }, []);

  return (
    <div className="workout-player-wrap">
      {/* Loading skeleton — hidden once video loads */}
      {!isLoaded && (
        <div className="workout-player-skeleton" aria-hidden="true">
          <div className="workout-player-pulse" />
          <p className="workout-player-loading-text">Loading video…</p>
        </div>
      )}

      {hasError ? (
        /* Fallback UI when video file is missing */
        <div className="workout-player-fallback" role="img" aria-label={`${exerciseName} animation placeholder`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="workout-player-fallback-icon"
            aria-hidden="true"
          >
            <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
            <path
              d="M24 20 L24 44 M40 20 L40 44 M24 20 C24 16 40 16 40 20 M24 44 C24 48 40 48 40 44"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p className="workout-player-fallback-title">{exerciseName}</p>
          <p className="workout-player-fallback-hint">
            Upload <strong>{videoUrl.split('/').pop()}</strong> to{' '}
            <code>public/workouts/</code>
          </p>
        </div>
      ) : (
        <video
          key={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={handleLoadedData}
          onError={handleError}
          className={`workout-player-video${isLoaded ? ' loaded' : ''}`}
          aria-label={`${exerciseName} animation`}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}

