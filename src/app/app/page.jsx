'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SvgIcon from '../../components/SvgIcon.jsx';
import SceneSvg from '../../components/SceneSvg.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { PRG, SCN, DAYS, LB, MS, BLOG, COL } from '../../data/appData.js';

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

  return (
    <div className="gr">
      {/* 4 Vibrant KPIs with authentic --c colors and translucent .ki circle */}
      <div className="kp s3" style={{ '--c': '#16A34A' }}>
        <span className="ki">
          <SvgIcon name="wallet" size={22} />
        </span>
        <div>
          <small>Cash balance</small>
          <b>${cash.toFixed(2)}</b>
          <em>+$2.00 this week</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#2563EB' }}>
        <span className="ki">
          <SvgIcon name="coin" size={22} />
        </span>
        <div>
          <small>Points</small>
          <b>{(2450 + points - 240).toLocaleString()}</b>
          <em>+{points} today</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#EF5A3C' }}>
        <span className="ki">
          <SvgIcon name="flame" size={22} />
        </span>
        <div>
          <small>Day streak</small>
          <b>7 days</b>
          <em>Personal best: 12d</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#6D3AE8' }}>
        <span className="ki">
          <SvgIcon name="trophy" size={22} />
        </span>
        <div>
          <small>Rank</small>
          <b>#4</b>
          <em>Global leaderboard</em>
        </div>
      </div>

      {/* Weekly Activity (span 8) */}
      <div className="pn s8">
        <div className="pt">
          <div>
            <h3>Weekly activity</h3>
            <small className="muted">Last 7 days</small>
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

      {/* Daily Goal (span 4) */}
      <div className="pn s4">
        <div className="pt">
          <h3>Daily goal</h3>
          <span className="pp2">{activeMissionsDoneCount} of 5 done</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{ position: 'relative', width: '120px', height: '120px', flex: 'none' }}>
            <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--sf)" strokeWidth="12" />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="var(--g)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="314"
                strokeDashoffset={strokeOffset}
                style={{ transition: 'stroke-dashoffset .8s var(--ease)' }}
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
              <b style={{ fontSize: '22px' }}>{ringPct}%</b>
            </div>
          </div>
          <div>
            <b style={{ fontSize: '18px', display: 'block' }}>{currentMins} of 30 min</b>
            <small className="muted" style={{ display: 'block', marginTop: '4px' }}>
              Target: 30 daily minutes
            </small>
            <button
              className="btn sm o"
              style={{ marginTop: '10px' }}
              onClick={() => logQuickActivity(5, 5)}
            >
              +5 min walk
            </button>
          </div>
        </div>
      </div>

      {/* Today's Missions (span 8) */}
      <div className="pn s8">
        <div className="pt">
          <h3>Today&apos;s missions</h3>
          <Link className="lk" href="/app/activities">
            All activities
          </Link>
        </div>
        {MS.map((m, j) => {
          const isDone = completedMissions[j];
          return (
            <div key={j} className="mi">
              <div className="t">
                <SvgIcon name={m[0]} size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <b>{m[1]}</b>
                <small style={{ display: 'block' }}>
                  {m[2]} · +{m[3]} pts
                </small>
              </div>
              <button
                className={`go ${isDone ? 'd' : ''}`}
                onClick={() => markMissionDone(j)}
              >
                {isDone ? 'Done ✓' : 'Start'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Leaderboard (span 4) */}
      <div className="pn s4">
        <div className="pt">
          <h3>Leaderboard</h3>
          <Link className="lk" href="/app/challenges">
            View all
          </Link>
        </div>
        <div className="cps" style={{ marginBottom: '12px' }}>
          {['global', 'country', 'friends'].map((k) => (
            <button
              key={k}
              className={`cp ${lbFilter === k ? 'on' : ''}`}
              onClick={() => setLbFilter(k)}
            >
              {k === 'global' ? 'Global' : k === 'country' ? 'Nigeria' : 'Friends'}
            </button>
          ))}
        </div>
        <div id="lb">
          {activeLeaderboard.slice(0, 5).map((r, j) => {
            const isMe = r[0].includes('(you)');
            return (
              <div key={j} className={`lr ${isMe ? 'me' : ''}`}>
                <span className={`rk r${j + 1}`}>{j + 1}</span>
                <span className="av2" style={{ background: COL[j % 5] }}>
                  {r[0][0]}
                </span>
                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: '15px', display: 'block' }}>{r[0]}</b>
                  <small className="muted" style={{ display: 'block', fontSize: '12px' }}>
                    {r[1]}
                  </small>
                </div>
                <b>{r[2].toLocaleString()}</b>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended for you (span 12) */}
      <div className="s12">
        <div className="pt" style={{ marginTop: '6px' }}>
          <h3 style={{ fontSize: '20px' }}>Recommended for you</h3>
          <Link className="lk" href="/app/programmes">
            Browse all
          </Link>
        </div>
        <div className="pgd" style={{ marginTop: 0 }}>
          {PRG.slice(0, 4).map((p, i) => (
            <Link
              key={i}
              href={`/app/programmes/${i}`}
              className="pcd"
              style={{ textDecoration: 'none' }}
            >
              <div className="im">
                <SceneSvg type={SCN[i]} color={p[4]} />
              </div>
              <div className="bd">
                <b style={{ fontSize: '17px', display: 'block' }}>{p[1]}</b>
                <small style={{ display: 'block', margin: '4px 0 12px' }}>{p[3]}</small>
                <div className="pgb">
                  <i style={{ width: i === 0 ? '50%' : i === 3 ? '66%' : '0%' }} />
                </div>
                <small style={{ display: 'block', marginTop: '8px' }}>
                  {i === 0 ? '3 of 6 lessons' : i === 3 ? '4 of 6 lessons' : '0 of 6 lessons'}
                </small>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* From the Health Academy (span 12) */}
      <div className="pn s12">
        <div className="pt">
          <h3>From the Health Academy</h3>
          <Link className="lk" href="/blog">
            All articles
          </Link>
        </div>
        <div className="pgd" style={{ marginTop: 0 }}>
          {BLOG.slice(0, 4).map((p, j) => (
            <Link
              key={j}
              href={`/blog/${p[0]}`}
              className="pcd"
              style={{ textDecoration: 'none' }}
            >
              <div className="im">
                <SceneSvg type={p[6] || 'walk'} color={p[5] || '#16A34A'} />
              </div>
              <div className="bd">
                <span className="bct" style={{ fontSize: '11px', padding: '3px 9px' }}>
                  {p[2]}
                </span>
                <b style={{ fontSize: '16px', display: 'block', margin: '6px 0 4px' }}>
                  {p[1]}
                </b>
                <small>{p[3]}</small>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
