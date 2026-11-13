'use client';

import React, { useState } from 'react';
import SvgIcon from './SvgIcon.jsx';
import { VIDEO } from '../data/appData.js';

export default function VideoSection() {
  const [muted, setMuted] = useState(true);

  return (
    <div className="vf" id="vf0" data-m={muted ? 1 : 0}>
      {VIDEO.file ? (
        <video
          id="vfv"
          src={VIDEO.file}
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="metadata"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <iframe
          id="vyt"
          title="How FitPadi rewards healthy habits"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO.yt}?autoplay=1&mute=1&loop=1&playlist=${VIDEO.yt}&controls=0&modestbranding=1&rel=0&playsinline=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      )}
      <div className="ov">
        <button
          className="snd"
          id="sb"
          onClick={() => setMuted(!muted)}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
        >
          <SvgIcon name={muted ? 'mute' : 'vol'} size={20} />
          <span>{muted ? 'Tap to unmute' : 'Mute'}</span>
        </button>
      </div>
    </div>
  );
}

