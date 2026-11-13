'use client';

import React, { useState } from 'react';
import SvgIcon from '../../../components/SvgIcon.jsx';
import SceneSvg from '../../../components/SceneSvg.jsx';
import { useApp } from '../../../context/AppContext.jsx';

export default function NutritionPage() {
  const { hydration, addHydration, logQuickActivity, showToast } = useApp();
  const [glasses, setGlasses] = useState(hydration || 4);

  const setWater = (count) => {
    setGlasses(count);
    showToast(`${count} glasses logged (${count * 250} ml)`);
    logQuickActivity(5, 5);
  };

  const mealGuides = [
    ['Balanced Nigerian plate', 'Portion carbs, proteins and vegetables using familiar local meals.', 'food', '#EF5A3C'],
    ['Hydration & electrolytes', 'How much fluid you really need in warm climates.', 'water', '#2563EB'],
    ['Smarter snacking', 'Easy swaps to reduce ultra-processed food and added sugars.', 'food', '#16A34A']
  ];

  return (
    <div className="gr">
      {/* 4 KPIs with authentic colors */}
      <div className="kp s3" style={{ '--c': '#2563EB' }}>
        <span className="ki">
          <SvgIcon name="water" size={22} />
        </span>
        <div>
          <small>Water today</small>
          <b>{glasses * 250} ml</b>
          <em>{glasses} of 8 glasses</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#16A34A' }}>
        <span className="ki">
          <SvgIcon name="leaf" size={22} />
        </span>
        <div>
          <small>Hydration score</small>
          <b>{Math.round((glasses / 8) * 100)}%</b>
          <em>Daily goal</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#EF5A3C' }}>
        <span className="ki">
          <SvgIcon name="food" size={22} />
        </span>
        <div>
          <small>Nutrient balance</small>
          <b>Optimal</b>
          <em>Plate guidelines</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#D97706' }}>
        <span className="ki">
          <SvgIcon name="flame" size={22} />
        </span>
        <div>
          <small>Streak</small>
          <b>7 days</b>
          <em>Hydration record</em>
        </div>
      </div>

      {/* Hydration Tracker (span 8) */}
      <div className="pn s8">
        <div className="pt">
          <h3>Hydration tracker</h3>
          <span className="pp2">{glasses} of 8 glasses ({glasses * 250} ml)</span>
        </div>
        <p className="muted" style={{ fontSize: '15px' }}>
          Tap a glass to log your water intake today.
        </p>

        <div className="hy" style={{ margin: '20px 0' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((j) => (
            <button
              key={j}
              type="button"
              className={j <= glasses ? 'on' : ''}
              onClick={() => setWater(j)}
              aria-label={`Log ${j} glasses`}
            >
              <SvgIcon name="water" size={22} />
            </button>
          ))}
        </div>

        <div className="note" style={{ margin: '18px 0 0' }}>
          <p style={{ fontSize: '14px' }}>
            <b>Why hydration matters:</b> Drinking water helps regulate body temperature, aids digestion, keeps joints lubricated, and supports focus throughout the day.
          </p>
        </div>
      </div>

      {/* Daily Quick Bites (span 4) */}
      <div className="pn s4">
        <div className="pt">
          <h3>Daily nutrition tip</h3>
        </div>
        <div style={{ background: 'var(--sf)', padding: '18px', borderRadius: '18px', marginBottom: '16px' }}>
          <b style={{ fontSize: '15px', display: 'block', marginBottom: '6px' }}>The Half-Plate Rule</b>
          <p className="muted" style={{ fontSize: '13px', lineHeight: 1.5 }}>
            Fill half your plate with colorful vegetables and salads, one quarter with lean protein, and one quarter with complex carbs.
          </p>
        </div>
        <div style={{ background: 'var(--sf)', padding: '18px', borderRadius: '18px' }}>
          <b style={{ fontSize: '15px', display: 'block', marginBottom: '6px' }}>Fiber Boost</b>
          <p className="muted" style={{ fontSize: '13px', lineHeight: 1.5 }}>
            Beans, lentils, vegetables and whole grains keep you full longer and support heart and gut wellness.
          </p>
        </div>
      </div>

      {/* Meal Guides (span 12) */}
      <div className="s12">
        <div className="pt" style={{ marginTop: '6px' }}>
          <h3 style={{ fontSize: '20px' }}>Meal guides &amp; nutrition education</h3>
        </div>
        <div className="pgd" style={{ marginTop: 0 }}>
          {mealGuides.map((guide, idx) => (
            <div key={idx} className="pcd" style={{ cursor: 'default' }}>
              <div className="im">
                <SceneSvg type={guide[2]} color={guide[3]} />
              </div>
              <div className="bd">
                <span className="bct" style={{ fontSize: '11px', padding: '3px 9px' }}>
                  Nutrition Guide
                </span>
                <b style={{ fontSize: '16px', display: 'block', margin: '6px 0 4px' }}>
                  {guide[0]}
                </b>
                <small>{guide[1]}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
