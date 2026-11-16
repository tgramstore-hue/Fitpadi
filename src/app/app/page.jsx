'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SvgIcon from '../../components/SvgIcon.jsx';
import SceneSvg from '../../components/SceneSvg.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { PRG, DAYS, LB, MS, BLOG, COL } from '../../data/appData.js';

export default function DashboardPage() {
  const {
    cash,
    points,
    completedMissions,
    markMissionDone,
    logQuickActivity
  } = useApp();

  const [metric, setMetric] = useState('steps'); // 'steps' | 'min'
  const [lbFilter, setLbFilter] = useState('global'); // 'global' | 'country' | 'friends'

  // Weekly data from the original HTML
  const DS = {
    steps: [5200, 7100, 4300, 8800, 6400, 3900, 6420],
    min: [28, 35, 18, 42, 30, 20, 12]
  };

  const chartData = DS[metric] || DS.steps;
  const maxVal = metric === 'steps' ? 10000 : 45;

  const activeLeaderboard = LB[lbFilter] || LB.global;
  const activeMissionsDoneCount = Object.keys(completedMissions).length;
  const targetMins = 30;
  const currentMins = Math.min(30, 12 + activeMissionsDoneCount * 5);
  const ringPct = Math.round((currentMins / targetMins) * 100);
  const strokeOffset = 314 * (1 - Math.min(1, currentMins / targetMins));

  // Flat squircle icon colors for each mission
  const missionColors = ['sq-green', 'sq-purple', 'sq-blue', 'sq-teal', 'sq-orange'];

  return (
    <div className="gr" style={{ paddingBottom: '90px' }}>
      {/* 4 KPIs with authentic brand colors & modern squircle icon */}
      <div className="kp s3" style={{ '--c': '#16A34A' }}>
        <span className="flat-sq" style={{ background: 'rgba(255,255,255,.22)', width: '44px', height: '44px' }}>
          <SvgIcon name="wallet" size={22} />
        </span>
        <div>
          <small>Cash balance</small>
          <b>${cash.toFixed(2)}</b>
          <em>+$2.00 this week</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#2563EB' }}>
        <span className="flat-sq" style={{ background: 'rgba(255,255,255,.22)', width: '44px', height: '44px' }}>
          <SvgIcon name="coin" size={22} />
        </span>
        <div>
          <small>Points wallet</small>
          <b>{(2450 + points - 240).toLocaleString()}</b>
          <em>+{points} today</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#EF5A3C' }}>
        <span className="flat-sq" style={{ background: 'rgba(255,255,255,.22)', width: '44px', height: '44px' }}>
          <SvgIcon name="flame" size={22} />
        </span>
        <div>
          <small>Day streak</small>
          <b>7 days</b>
          <em>1.25x pool bonus</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#6D3AE8' }}>
        <span className="flat-sq" style={{ background: 'rgba(255,255,255,.22)', width: '44px', height: '44px' }}>
          <SvgIcon name="trophy" size={22} />
        </span>
        <div>
          <small>Standing</small>
          <b>Rank #14</b>
          <em>Top 10% global</em>
        </div>
      </div>

      {/* Sunset Epic Feature Banner (Image 1, 3) */}
      <div className="s12" style={{ marginTop: '4px', marginBottom: '4px' }}>
        <div className="banner-orange">
          <div className="banner-icon">
            <SvgIcon name="flame" size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: '16px', display: 'block', lineHeight: 1.25 }}>
              Epic Streak Bonus Active — 7 Days Consistent!
            </b>
            <p style={{ margin: '3px 0 0', fontSize: '13px', opacity: 0.95 }}>
              Earn +50 bonus Health Fund points on every mission completed today.
            </p>
          </div>
          <Link href="/app/challenges" className="banner-btn" style={{ textDecoration: 'none' }}>
            View Sprints &rarr;
          </Link>
        </div>
      </div>

      {/* Weekly Activity (span 8) */}
      <div className="s8">
        <span className="sec-label">ACTIVITY CADENCE</span>
        <div className="card-box">
          <div className="pt" style={{ marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '18px', margin: 0 }}>Weekly activity</h3>
              <small className="muted">Last 7 days movement</small>
            </div>
            <div className="cps">
              <button
                className={`cp ${metric === 'steps' ? 'on' : ''}`}
                onClick={() => setMetric('steps')}
              >
                Steps
              </button>
              <button
                className={`cp ${metric === 'min' ? 'on' : ''}`}
                onClick={() => setMetric('min')}
              >
                Active min
              </button>
            </div>
          </div>

          <div className="ch">
            {chartData.map((v, j) => {
              const hPct = Math.round((v / maxVal) * 100);
              const isToday = j === 6;
              return (
                <div
                  key={j}
                  className={`bc ${isToday ? 't' : ''}`}
                  title={`${v.toLocaleString()} ${metric === 'steps' ? 'steps' : 'min'}`}
                >
                  <div className="bw">
                    <i style={{ height: `${hPct}%` }} />
                  </div>
                  <span>{DAYS[j] ? DAYS[j][0] : `D${j + 1}`}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Daily Goal Circular Progress (span 4) */}
      <div className="s4">
        <span className="sec-label">DAILY TARGET</span>
        <div className="card-box">
          <div className="pt" style={{ marginBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', margin: 0 }}>Daily goal</h3>
            <span className="pill-tag">{activeMissionsDoneCount} of 5 done</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', padding: '10px 0' }}>
            <div style={{ position: 'relative', width: '110px', height: '110px', flex: 'none' }}>
              <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--mint)" strokeWidth="11" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="var(--g)"
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeDasharray="314"
                  strokeDashoffset={strokeOffset}
                  style={{ transition: 'stroke-dashoffset .8s var(--ease)' }}
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
                <b style={{ fontSize: '22px', letterSpacing: '-0.02em' }}>{ringPct}%</b>
              </div>
            </div>

            <div>
              <b style={{ fontSize: '17px', display: 'block' }}>{currentMins} of 30 min</b>
              <small className="muted" style={{ display: 'block', margin: '4px 0 10px' }}>
                Active streak preserved
              </small>
              <button
                className="pill-btn pill-blue"
                style={{ height: '32px', fontSize: '13px', padding: '0 14px' }}
                onClick={() => logQuickActivity(5, 5)}
              >
                +5 min walk
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Missions - Grouped Card Pattern with Flat Squircles (span 8 - Images 1, 3, 4) */}
      <div className="s8">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '0 4px' }}>
          <span className="sec-label" style={{ margin: 0 }}>TODAY&apos;S MISSIONS</span>
          <Link className="lk" href="/app/activities" style={{ fontSize: '13px', fontWeight: 700 }}>
            All activities &rarr;
          </Link>
        </div>

        <div className="card-box">
          {MS.map((m, j) => {
            const isDone = completedMissions[j];
            const colorClass = missionColors[j % missionColors.length];
            return (
              <div key={j} className="card-row">
                {/* Flat Saturated Squircle Icon (Images 1, 3, 4) */}
                <div className={`flat-sq ${colorClass}`}>
                  <SvgIcon name={m[0]} size={22} />
                </div>

                {/* Mission Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <b style={{ fontSize: '15px', display: 'block', color: 'var(--tx)' }}>
                    {m[1]}
                  </b>
                  <small className="muted" style={{ display: 'block', marginTop: '2px', fontSize: '13px' }}>
                    {m[2]} · <b style={{ color: '#D97706' }}>+{m[3]} pts</b>
                  </small>
                </div>

                {/* Right Action: Checkmark Circle or Blue Pill Button */}
                {isDone ? (
                  <div className="chk-circle" title="Completed!">
                    ✓
                  </div>
                ) : (
                  <button
                    className="pill-btn pill-blue"
                    onClick={() => markMissionDone(j)}
                  >
                    Start
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard Preview (span 4 - Image 6) */}
      <div className="s4">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '0 4px' }}>
          <span className="sec-label" style={{ margin: 0 }}>LEADERBOARD</span>
          <Link className="lk" href="/app/challenges" style={{ fontSize: '13px', fontWeight: 700 }}>
            Top 50 &rarr;
          </Link>
        </div>

        <div className="card-box">
          {/* Scope pills */}
          <div className="cps" style={{ marginBottom: '12px' }}>
            {['global', 'country', 'friends'].map((k) => (
              <button
                key={k}
                className={`cp ${lbFilter === k ? 'on' : ''}`}
                style={{ height: '30px', fontSize: '12px', padding: '0 12px' }}
                onClick={() => setLbFilter(k)}
              >
                {k === 'global' ? 'Global' : k === 'country' ? 'Nigeria' : 'Friends'}
              </button>
            ))}
          </div>

          {/* Top 5 list with laurel medals */}
          {activeLeaderboard.slice(0, 5).map((r, j) => {
            const isMe = r[0].includes('(you)');
            const rank = j + 1;
            const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : null;
            return (
              <div
                key={j}
                className="card-row"
                style={{
                  background: isMe ? 'var(--mint)' : 'transparent',
                  margin: isMe ? '0 -10px' : 0,
                  padding: isMe ? '10px 10px' : '10px 0',
                  borderRadius: isMe ? '14px' : 0
                }}
              >
                {/* Laurel Rank */}
                <span
                  style={{
                    width: '28px',
                    fontSize: medal ? '16px' : '13px',
                    fontWeight: 800,
                    color: medal ? 'inherit' : 'var(--sub)',
                    textAlign: 'center',
                    flex: 'none'
                  }}
                >
                  {medal || rank}
                </span>

                {/* Squircle Avatar */}
                <div
                  className="flat-sq"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '11px',
                    background: COL[j % COL.length],
                    fontSize: '14px',
                    fontWeight: 700
                  }}
                >
                  {r[0][0]}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <b style={{ fontSize: '14px', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {r[0]} <span style={{ color: '#16A34A', fontSize: '10px' }}>●</span>
                  </b>
                  <small className="muted" style={{ display: 'block', fontSize: '12px' }}>
                    {r[1]} · Verified
                  </small>
                </div>

                <b style={{ color: 'var(--g)', fontSize: '14px' }}>
                  {r[2].toLocaleString()}
                </b>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Programmes Section (span 12) */}
      <div className="s12" style={{ marginTop: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 4px' }}>
          <div>
            <span className="sec-label" style={{ margin: 0 }}>RECOMMENDED FOR YOU</span>
            <h3 style={{ fontSize: '20px', margin: '2px 0 0' }}>Guided Health Programmes</h3>
          </div>
          <Link className="lk" href="/app/programmes" style={{ fontSize: '14px', fontWeight: 700 }}>
            Browse all 9 programmes &rarr;
          </Link>
        </div>

        <div className="pgd" style={{ marginTop: 0 }}>
          {[0, 1, 3].map((pIdx) => {
            const p = PRG[pIdx];
            if (!p) return null;
            return (
              <Link
                key={pIdx}
                href={`/app/programmes/${pIdx}`}
                className="pcd"
                style={{ textDecoration: 'none' }}
              >
                <div className="im" style={{ height: '110px' }}>
                  <SceneSvg type={['walk', 'strength', 'shield'][pIdx % 3]} color={p[4]} />
                </div>
                <div className="bd">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span className="pp2">{p[3]}</span>
                  </div>
                  <b style={{ fontSize: '16px', display: 'block', color: 'var(--tx)' }}>
                    {p[1]}
                  </b>
                  <small className="muted" style={{ display: 'block', marginTop: '4px', lineHeight: 1.4 }}>
                    {p[2]}
                  </small>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
