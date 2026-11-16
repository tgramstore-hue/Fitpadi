'use client';

import React, { useState } from 'react';
import SvgIcon from '../../../components/SvgIcon.jsx';
import SceneSvg from '../../../components/SceneSvg.jsx';
import { useApp } from '../../../context/AppContext.jsx';
import { QZ } from '../../../data/appData.js';

export default function NutritionPage() {
  const { hydration, addHydration, setPoints, showToast } = useApp();
  const [glasses, setGlasses] = useState(hydration || 4);

  // Quick Nutrition Quiz state (from original HTML)
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const setWater = (count) => {
    setGlasses(count);
    showToast(`${count} glasses logged (${count * 250} ml) · Hydration updated!`);
    addHydration(1);
  };

  const handleQuizAnswer = (optIdx, correctIdx) => {
    if (isAnswered) return;
    setSelectedAnswer(optIdx);
    setIsAnswered(true);

    const isCorrect = optIdx === correctIdx;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      showToast('Correct answer! +5 points 🥗');
    } else {
      showToast('Incorrect. Try to remember the right portion!');
    }

    setTimeout(() => {
      setQuizIdx((prev) => {
        const next = prev + 1;
        if (next >= QZ.length) {
          setPoints((p) => p + 15);
          showToast('Nutrition quiz completed! +15 bonus points earned 🎉');
        }
        return next;
      });
      setSelectedAnswer(null);
      setIsAnswered(false);
    }, 1200);
  };

  const resetQuiz = () => {
    setQuizIdx(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const mealGuides = [
    ['Balanced Nigerian plate', 'Portion carbs, proteins and vegetables using familiar local meals.', 'food', '#EF5A3C'],
    ['Portion sizes guide', 'Simple hand-size guides you can use anywhere for rice, swallow and meat.', 'water', '#2563EB'],
    ['Healthy cooking methods', 'Grill, steam and use less oil and salt without losing flavor.', 'food', '#16A34A'],
    ['Eating well on a budget', 'Nutritious market choices that stay affordable year-round.', 'walk', '#D97706']
  ];

  const currentQ = QZ[quizIdx];
  const isQuizDone = quizIdx >= QZ.length;

  return (
    <div className="gr" style={{ paddingBottom: '90px' }}>
      {/* 4 KPIs with Flat Squircle Icons */}
      <div className="kp s3" style={{ '--c': '#2563EB' }}>
        <span className="flat-sq" style={{ background: 'rgba(255,255,255,.22)', width: '44px', height: '44px' }}>
          <SvgIcon name="drop" size={22} />
        </span>
        <div>
          <small>Water today</small>
          <b>{glasses * 250} ml</b>
          <em>{glasses} of 8 glasses</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#16A34A' }}>
        <span className="flat-sq" style={{ background: 'rgba(255,255,255,.22)', width: '44px', height: '44px' }}>
          <SvgIcon name="leaf" size={22} />
        </span>
        <div>
          <small>Hydration score</small>
          <b>{Math.round((glasses / 8) * 100)}%</b>
          <em>Daily goal</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#EF5A3C' }}>
        <span className="flat-sq" style={{ background: 'rgba(255,255,255,.22)', width: '44px', height: '44px' }}>
          <SvgIcon name="heart" size={22} />
        </span>
        <div>
          <small>Nutrient balance</small>
          <b>Optimal</b>
          <em>Plate guidelines</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#D97706' }}>
        <span className="flat-sq" style={{ background: 'rgba(255,255,255,.22)', width: '44px', height: '44px' }}>
          <SvgIcon name="flame" size={22} />
        </span>
        <div>
          <small>Streak</small>
          <b>7 days</b>
          <em>Hydration record</em>
        </div>
      </div>

      {/* Hydration Tracker Card (span 6) */}
      <div className="s6">
        <span className="sec-label">DAILY HYDRATION</span>
        <div className="card-box">
          <div className="pt" style={{ marginBottom: '10px' }}>
            <div>
              <h3 style={{ fontSize: '18px', margin: 0 }}>Hydration tracker</h3>
              <small className="muted">8 glasses target (2,000 ml)</small>
            </div>
            <span className="pill-tag">{glasses} of 8 cups</span>
          </div>

          <p className="muted" style={{ fontSize: '14px', marginBottom: '16px' }}>
            Tap each cup as you drink water throughout the day.
          </p>

          {/* 8 Water cups */}
          <div className="hy" style={{ margin: '14px 0 16px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((j) => (
              <button
                key={j}
                type="button"
                className={j <= glasses ? 'on' : ''}
                onClick={() => setWater(j)}
                aria-label={`Log ${j} glasses`}
              >
                <SvgIcon name="drop" size={22} />
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="pgb" style={{ height: '8px', borderRadius: '999px', marginBottom: '18px' }}>
            <i style={{ width: `${(glasses / 8) * 100}%` }} />
          </div>

          <div
            style={{
              padding: '14px 16px',
              borderRadius: '16px',
              background: 'var(--sf)',
              border: '1px solid var(--ln)',
              fontSize: '13px',
              lineHeight: 1.5
            }}
          >
            <b>💡 Why hydration matters:</b> Drinking water regulates internal temperature, aids cellular digestion, and keeps joint fluid lubricated.
          </div>
        </div>
      </div>

      {/* Quick Nutrition Quiz Card (span 6 - HTML Feature) */}
      <div className="s6">
        <span className="sec-label">KNOWLEDGE CHECK</span>
        <div className="card-box">
          <div className="pt" style={{ marginBottom: '12px' }}>
            <div>
              <h3 style={{ fontSize: '18px', margin: 0 }}>Quick nutrition quiz</h3>
              <small className="muted">Earn points for healthy choices</small>
            </div>
            <span className="pp2">
              {isQuizDone ? 'Complete ✓' : `Question ${quizIdx + 1} of ${QZ.length}`}
            </span>
          </div>

          {!isQuizDone && currentQ ? (
            <div>
              <b style={{ fontSize: '16px', display: 'block', margin: '12px 0 14px', color: 'var(--tx)', lineHeight: 1.4 }}>
                {currentQ[0]}
              </b>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {currentQ[1].map((option, optIdx) => {
                  const isChosen = selectedAnswer === optIdx;
                  const isCorrect = optIdx === currentQ[2];
                  let btnClass = 'qo';
                  if (isAnswered) {
                    if (isCorrect) btnClass += ' ok';
                    else if (isChosen) btnClass += ' no';
                  }
                  return (
                    <button
                      key={optIdx}
                      className={btnClass}
                      onClick={() => handleQuizAnswer(optIdx, currentQ[2])}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px 16px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--mint)',
                  color: 'var(--gd)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '28px',
                  margin: '0 auto 14px'
                }}
              >
                🥗
              </div>
              <b style={{ fontSize: '28px', display: 'block', letterSpacing: '-0.02em' }}>
                {quizScore} / {QZ.length}
              </b>
              <p className="muted" style={{ margin: '6px 0 16px', fontSize: '14px' }}>
                {quizScore === QZ.length
                  ? 'Perfect score! +15 bonus points awarded.'
                  : 'Well done! Review the meal guides below to sharpen your knowledge.'}
              </p>
              <button className="pill-btn pill-blue" onClick={resetQuiz}>
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Meal Guides & Nutrition Education (span 12) */}
      <div className="s12" style={{ marginTop: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 4px' }}>
          <div>
            <span className="sec-label" style={{ margin: 0 }}>MEAL GUIDES</span>
            <h3 style={{ fontSize: '20px', margin: '2px 0 0' }}>Familiar, Balanced Nutrition</h3>
          </div>
          <span className="muted" style={{ fontSize: '13px' }}>General health education</span>
        </div>

        <div className="pgd" style={{ marginTop: 0 }}>
          {mealGuides.map((guide, idx) => (
            <div key={idx} className="pcd" style={{ cursor: 'default' }}>
              <div className="im" style={{ height: '110px' }}>
                <SceneSvg type={guide[2]} color={guide[3]} />
              </div>
              <div className="bd">
                <span className="pp2" style={{ fontSize: '11px', marginBottom: '6px', display: 'inline-block' }}>
                  Educational Guide
                </span>
                <b style={{ fontSize: '16px', display: 'block', margin: '4px 0 6px', color: 'var(--tx)' }}>
                  {guide[0]}
                </b>
                <small className="muted" style={{ lineHeight: 1.4 }}>
                  {guide[1]}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
