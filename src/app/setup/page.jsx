'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '../../components/AuthLayout.jsx';
import { useApp } from '../../context/AppContext.jsx';

const GOALS = [
  'Be more active',
  'Improve flexibility',
  'Build strength',
  'Improve cardio fitness',
  'Maintain a healthy weight',
  'Improve mobility',
  'Eat better',
  'Reduce stress',
  'Sleep better'
];

export default function SetupPage() {
  const router = useRouter();
  const { showToast } = useApp();
  const [step, setStep] = useState(0); // 0 or 1
  const [selectedGoals, setSelectedGoals] = useState(['Be more active', 'Improve cardio fitness']);
  const [ageRange, setAgeRange] = useState('30–44');
  const [experience, setExperience] = useState('Beginner');
  const [timeCommitment, setTimeCommitment] = useState('20 min');

  const toggleGoal = (goal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleNext = () => {
    if (step === 0) {
      if (selectedGoals.length === 0) {
        showToast('Please pick at least one goal');
        return;
      }
      setStep(1);
    } else {
      showToast('You are all set! Welcome to your dashboard.');
      router.push('/app');
    }
  };

  return (
    <AuthLayout>
      <div className="pgb" style={{ height: '8px' }}>
        <i style={{ width: step === 0 ? '50%' : '100%' }} />
      </div>
      <small className="muted" style={{ display: 'block', margin: '8px 0 16px', fontWeight: 600 }}>
        Step {step + 1} of 2
      </small>

      {step === 0 ? (
        <div>
          <h1 style={{ fontSize: '30px', marginBottom: '8px' }}>What are your goals?</h1>
          <p className="muted" style={{ marginBottom: '24px', fontSize: '15px' }}>
            Pick all that apply. We will personalize your daily missions and challenge recommendations.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}>
            {GOALS.map((goal) => {
              const isSelected = selectedGoals.includes(goal);
              return (
                <button
                  key={goal}
                  type="button"
                  className={`cp ${isSelected ? 'on' : ''}`}
                  onClick={() => toggleGoal(goal)}
                  style={{ padding: '10px 18px', fontSize: '14px' }}
                >
                  {goal}
                </button>
              );
            })}
          </div>

          <button className="btn" style={{ width: '100%' }} onClick={handleNext}>
            Continue to Profile &rarr;
          </button>
        </div>
      ) : (
        <div>
          <h1 style={{ fontSize: '30px', marginBottom: '8px' }}>A little about you</h1>
          <p className="muted" style={{ marginBottom: '24px', fontSize: '15px' }}>
            You choose what to share. This is used solely to tailor workout pacing and calorie goals.
          </p>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sub)', display: 'block', marginBottom: '8px' }}>
              Age Range
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['18–29', '30–44', '45–59', '60+'].map((range) => (
                <button
                  key={range}
                  type="button"
                  className={`cp ${ageRange === range ? 'on' : ''}`}
                  onClick={() => setAgeRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sub)', display: 'block', marginBottom: '8px' }}>
              Fitness Experience
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  className={`cp ${experience === lvl ? 'on' : ''}`}
                  onClick={() => setExperience(lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sub)', display: 'block', marginBottom: '8px' }}>
              Daily Time Commitment
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['10 min', '20 min', '30 min', '45+ min'].map((tm) => (
                <button
                  key={tm}
                  type="button"
                  className={`cp ${timeCommitment === tm ? 'on' : ''}`}
                  onClick={() => setTimeCommitment(tm)}
                >
                  {tm}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn sm o" onClick={() => setStep(0)}>
              &larr; Back
            </button>
            <button className="btn sm" style={{ flex: 1 }} onClick={handleNext}>
              Finish &amp; Open Dashboard &rarr;
            </button>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}

