'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SvgIcon from '../../../components/SvgIcon.jsx';
import { useApp } from '../../../context/AppContext.jsx';

export default function SettingsPage() {
  const router = useRouter();
  const {
    theme,
    toggleTheme,
    units,
    setUnits,
    soundEnabled,
    setSoundEnabled,
    showToast
  } = useApp();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleExportData = () => {
    const data = {
      user: 'David Adeleke',
      exportedAt: new Date().toISOString(),
      streakDays: 7,
      totalSteps: 48290,
      rewardPoints: 2450
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitpadi-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('Your health activity data has been downloaded');
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    showToast('Account scheduled for deletion. We are sorry to see you go!');
    setTimeout(() => {
      router.push('/');
    }, 1200);
  };

  return (
    <div>
      <div className="pn" style={{ marginBottom: '28px' }}>
        <h3 style={{ marginBottom: '20px' }}>App Preferences</h3>

        {/* Theme Setting */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--ln)' }}>
          <div>
            <b style={{ fontSize: '16px', display: 'block' }}>Interface Theme</b>
            <small className="muted">Switch between dark mode and light mode</small>
          </div>
          <div className="cps">
            <button
              className={`cp ${theme === 'light' ? 'on' : ''}`}
              onClick={() => theme === 'dark' && toggleTheme()}
            >
              Light
            </button>
            <button
              className={`cp ${theme === 'dark' ? 'on' : ''}`}
              onClick={() => theme === 'light' && toggleTheme()}
            >
              Dark
            </button>
          </div>
        </div>

        {/* Sound Setting */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--ln)' }}>
          <div>
            <b style={{ fontSize: '16px', display: 'block' }}>Audio Workout Cues</b>
            <small className="muted">Play audio chimes during workout intervals and rest</small>
          </div>
          <div className="cps">
            <button
              className={`cp ${soundEnabled ? 'on' : ''}`}
              onClick={() => setSoundEnabled(true)}
            >
              Enabled
            </button>
            <button
              className={`cp ${!soundEnabled ? 'on' : ''}`}
              onClick={() => setSoundEnabled(false)}
            >
              Muted
            </button>
          </div>
        </div>

        {/* Units Setting */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
          <div>
            <b style={{ fontSize: '16px', display: 'block' }}>Measurement Units</b>
            <small className="muted">Metric (km, ml, kg) or Imperial (mi, oz, lbs)</small>
          </div>
          <div className="cps">
            <button
              className={`cp ${units === 'metric' ? 'on' : ''}`}
              onClick={() => setUnits('metric')}
            >
              Metric
            </button>
            <button
              className={`cp ${units === 'imperial' ? 'on' : ''}`}
              onClick={() => setUnits('imperial')}
            >
              Imperial
            </button>
          </div>
        </div>
      </div>

      {/* Data & Privacy Actions */}
      <div className="pn">
        <h3 style={{ marginBottom: '20px' }}>Data &amp; Privacy</h3>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--ln)' }}>
          <div>
            <b style={{ fontSize: '16px', display: 'block' }}>Download Health Data</b>
            <small className="muted">Export all your steps, missions, and points history as JSON</small>
          </div>
          <button className="btn sm o" onClick={handleExportData}>
            Export Data
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
          <div>
            <b style={{ fontSize: '16px', display: 'block', color: 'var(--cor)' }}>Delete FitPadi Account</b>
            <small className="muted">Permanently remove your account and all associated habit data</small>
          </div>
          <button
            className="btn sm o"
            style={{ borderColor: 'var(--cor)', color: 'var(--cor)' }}
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="md" onClick={() => setShowDeleteModal(false)}>
          <div className="mc" onClick={(e) => e.stopPropagation()}>
            <button className="cl" onClick={() => setShowDeleteModal(false)}>
              <SvgIcon name="close" size={20} />
            </button>

            <h2 style={{ color: 'var(--cor)' }}>Delete Account?</h2>
            <p className="muted" style={{ margin: '12px 0 24px', lineHeight: 1.6 }}>
              Are you sure you want to permanently delete your FitPadi account? Any unclaimed cash balance from the Health Fund and streak badges will be lost.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn sm o" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button
                className="btn sm"
                style={{ background: 'var(--cor)' }}
                onClick={handleDeleteAccount}
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

