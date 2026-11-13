'use client';

import React, { useState } from 'react';
import SceneSvg from '../../../components/SceneSvg.jsx';
import SvgIcon from '../../../components/SvgIcon.jsx';
import { useApp } from '../../../context/AppContext.jsx';
import { CH, LB, COL } from '../../../data/appData.js';

export default function ChallengesPage() {
  const { joinedChallenges, joinChallenge } = useApp();
  const [filter, setFilter] = useState('daily');
  const [lbFilter, setLbFilter] = useState('global');

  const filteredChallenges = CH.map((c, j) => [c, j]).filter(
    (x) => filter === 'all' || x[0][0] === filter
  );

  const activeLeaderboard = LB[lbFilter] || LB.global;

  return (
    <div className="gr">
      {/* 4 KPIs with authentic colors */}
      <div className="kp s3" style={{ '--c': '#0F766E' }}>
        <span className="ki">
          <SvgIcon name="trophy" size={22} />
        </span>
        <div>
          <small>Active sprints</small>
          <b>{Object.keys(joinedChallenges).length} joined</b>
          <em>In progress</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#16A34A' }}>
        <span className="ki">
          <SvgIcon name="coin" size={22} />
        </span>
        <div>
          <small>Potential rewards</small>
          <b>+450 pts</b>
          <em>Across sprints</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#2563EB' }}>
        <span className="ki">
          <SvgIcon name="act" size={22} />
        </span>
        <div>
          <small>Participants</small>
          <b>1,840</b>
          <em>Competing today</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#EF5A3C' }}>
        <span className="ki">
          <SvgIcon name="flame" size={22} />
        </span>
        <div>
          <small>Rank badge</small>
          <b>Top 10%</b>
          <em>Global standing</em>
        </div>
      </div>

      {/* Challenges List (span 8) */}
      <div className="pn s8">
        <div className="pt">
          <h3>Community challenges</h3>
          <div className="cps">
            {['daily', 'weekly', 'all'].map((tab) => (
              <button
                key={tab}
                className={`cp ${filter === tab ? 'on' : ''}`}
                onClick={() => setFilter(tab)}
              >
                {tab === 'daily' ? 'Daily' : tab === 'weekly' ? 'Weekly' : 'All'}
              </button>
            ))}
          </div>
        </div>

        <div className="pgd" style={{ marginTop: '12px' }}>
          {filteredChallenges.map(([c, j]) => {
            const isJoined = joinedChallenges[j];
            const pct = isJoined ? c[5] : 0;
            return (
              <div key={j} className="pcd" style={{ cursor: 'default' }}>
                <div className="im" style={{ height: '96px' }}>
                  <SceneSvg type={c[1]} color={c[6]} />
                </div>
                <div className="bd">
                  <b style={{ fontSize: '16px', display: 'block' }}>{c[2]}</b>
                  <small style={{ display: 'block', margin: '3px 0 10px' }}>
                    {c[3]} joined · {c[4]} points
                  </small>
                  <div className="pgb">
                    <i style={{ width: `${pct}%` }} />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '10px',
                      alignItems: 'center'
                    }}
                  >
                    <small>{isJoined ? `${pct}% complete` : 'Not started'}</small>
                    <button
                      className={`btn sm ${isJoined ? 'o' : ''}`}
                      onClick={() => joinChallenge(j)}
                    >
                      {isJoined ? 'Active ✓' : 'Join'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Challenge Leaderboard (span 4) */}
      <div className="pn s4">
        <div className="pt">
          <h3>Challenge Leaderboard</h3>
        </div>
        <div className="cps" style={{ marginBottom: '14px' }}>
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
          {activeLeaderboard.map((r, j) => {
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
    </div>
  );
}
