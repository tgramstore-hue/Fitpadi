'use client';

import React from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function Toast() {
  const { toasts } = useApp();

  if (!toasts || !toasts.length) return null;

  return (
    <div className="toast-wrap" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="tst">
          {t.message}
        </div>
      ))}
    </div>
  );
}

