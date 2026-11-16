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
      user: 'David Okonkwo',
      exportedAt: new Date().toISOString(),
      streakDays: 7,
      totalSteps: 62400,
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
    <div style={{ paddingBottom: '90px' }}>
      <span className="sec-label">PREFERENCES</span>
      <div className="card-box" style={{ marginBottom: '24px' }}>
        <div className="pt" style={{ marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '18px', margin: 0 }}>App Preferences</h3>
            <small className="muted">Customize your experience and audio settings</small>
          </div>
        </div>

        {/* Theme Setting */}
        <div className="card-row">
          <div className="flat-sq sq-blue">
            <SvgIcon name="globe" size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: '15px', display: 'block', color: 'var(--tx)' }}>Interface Theme</b>
            <small className="muted" style={{ fontSize: '13px' }}>Switch between dark and light appearance</small>
          </div>
          <div className="cps">
            <button
              className={`cp ${theme === 'light' ? 'on' : ''}`}
              onClick={toggleTheme}
            >
              Light
            </button>
            <button
              className={`cp ${theme === 'dark' ? 'on' : ''}`}
              onClick={toggleTheme}
            >
              Dark
            </button>
          </div>
        </div>

        {/* Audio Cues */}
        <div className="card-row">
          <div className="flat-sq sq-purple">
            <SvgIcon name="vol" size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: '15px', display: 'block', color: 'var(--tx)' }}>Audio Beeps &amp; Chimes</b>
            <small className="muted" style={{ fontSize: '13px' }}>Interval countdown sounds in workouts</small>
          </div>
          <button
            className={`tgl ${soundEnabled ? 'on' : ''}`}
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              showToast(`Workout audio cues ${!soundEnabled ? 'enabled' : 'muted'}`);
            }}
            aria-label="Toggle workout sounds"
          />
        </div>

        {/* Units of Measure */}
        <div className="card-row">
          <div className="flat-sq sq-teal">
            <SvgIcon name="act" size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: '15px', display: 'block', color: 'var(--tx)' }}>Units of Measurement</b>
            <small className="muted" style={{ fontSize: '13px' }}>Distance and hydration calculation</small>
          </div>
          <div className="cps">
            <button
              className={`cp ${units === 'metric' ? 'on' : ''}`}
              onClick={() => {
                setUnits('metric');
                showToast('Units set to Metric (km, ml)');
              }}
            >
              Metric (km, ml)
            </button>
            <button
              className={`cp ${units === 'imperial' ? 'on' : ''}`}
              onClick={() => {
                setUnits('imperial');
                showToast('Units set to Imperial (miles, fl oz)');
              }}
            >
              Imperial (mi, oz)
            </button>
          </div>
        </div>
      </div>

      {/* Data Management Section */}
      <span className="sec-label">DATA & PRIVACY</span>
      <div className="card-box">
        <div className="card-row">
          <div className="flat-sq sq-green">
            <SvgIcon name="shield" size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: '15px', display: 'block', color: 'var(--tx)' }}>Export Health Data</b>
            <small className="muted" style={{ fontSize: '13px' }}>Download your step and points history in JSON</small>
          </div>
          <button className="pill-btn pill-outline" onClick={handleExportData}>
            Export JSON
          </button>
        </div>

        <div className="card-row">
          <div className="flat-sq sq-red">
            <SvgIcon name="close" size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: '15px', display: 'block', color: '#EF4444' }}>Delete Account</b>
            <small className="muted" style={{ fontSize: '13px' }}>Permanently remove your account and streak</small>
          </div>
          <button
            className="pill-btn pill-locked"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="md" onClick={() => setShowDeleteModal(false)}>
          <div className="mc" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#FEE2E2',
                color: '#DC2626',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 16px'
              }}
            >
              <SvgIcon name="close" size={28} />
            </div>
            <h2 style={{ fontSize: '22px', marginBottom: '8px' }}>Are you sure?</h2>
            <p className="muted" style={{ fontSize: '14px', lineHeight: 1.5, marginBottom: '20px' }}>
              Deleting your account will forfeit your current 7-day streak, unspent points, and Health Fund eligibility.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="pill-btn pill-outline"
                style={{ flex: 1 }}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="pill-btn pill-locked"
                style={{ flex: 1 }}
                onClick={handleDeleteAccount}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
