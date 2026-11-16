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
  const [showFullLeaderboard, setShowFullLeaderboard] = useState(false);
  const [searchCompetitor, setSearchCompetitor] = useState('');

  const filteredChallenges = CH.map((c, j) => [c, j]).filter(
    (x) => filter === 'all' || x[0][0] === filter
  );

  const activeLeaderboard = LB[lbFilter] || LB.global;

  // Find user's index in the active leaderboard
  const myIndex = activeLeaderboard.findIndex((r) => r[0].includes('(you)'));
  const myEntry = myIndex !== -1 ? activeLeaderboard[myIndex] : null;
  const myRank = myIndex !== -1 ? myIndex + 1 : 14;

  // Compact view: top 4 entries + user's ranking
  const compactEntries = activeLeaderboard.slice(0, 4);

  // Filtered full list (if searching)
  const fullDisplayList = searchCompetitor.trim()
    ? activeLeaderboard
        .map((r, idx) => ({ ...r, rank: idx + 1 }))
        .filter(
          (r) =>
            r[0].toLowerCase().includes(searchCompetitor.toLowerCase()) ||
            r[1].toLowerCase().includes(searchCompetitor.toLowerCase())
        )
    : activeLeaderboard.map((r, idx) => ({ ...r, rank: idx + 1 }));

  return (
    <div className="gr" style={{ paddingBottom: '90px' }}>
      {/* 4 KPIs with Flat Squircle Icons */}
      <div className="kp s3" style={{ '--c': '#0F766E' }}>
        <span className="flat-sq" style={{ background: 'rgba(255,255,255,.22)', width: '44px', height: '44px' }}>
          <SvgIcon name="trophy" size={22} />
        </span>
        <div>
          <small>Active sprints</small>
          <b>{Object.keys(joinedChallenges).length} joined</b>
          <em>In progress</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#16A34A' }}>
        <span className="flat-sq" style={{ background: 'rgba(255,255,255,.22)', width: '44px', height: '44px' }}>
          <SvgIcon name="coin" size={22} />
        </span>
        <div>
          <small>Potential rewards</small>
          <b>+450 pts</b>
          <em>Across sprints</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#2563EB' }}>
        <span className="flat-sq" style={{ background: 'rgba(255,255,255,.22)', width: '44px', height: '44px' }}>
          <SvgIcon name="act" size={22} />
        </span>
        <div>
          <small>Competitors</small>
          <b>{activeLeaderboard.length} active</b>
          <em>{lbFilter === 'global' ? 'Worldwide' : lbFilter === 'country' ? 'Nigeria' : 'Friends circle'}</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#EF5A3C' }}>
        <span className="flat-sq" style={{ background: 'rgba(255,255,255,.22)', width: '44px', height: '44px' }}>
          <SvgIcon name="flame" size={22} />
        </span>
        <div>
          <small>Your Standing</small>
          <b>Rank #{myRank}</b>
          <em>Top {Math.max(5, Math.round((myRank / activeLeaderboard.length) * 100))}% tier</em>
        </div>
      </div>

      {!showFullLeaderboard ? (
        <>
          {/* Challenges List (span 8) */}
          <div className="s8">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '0 4px' }}>
              <span className="sec-label" style={{ margin: 0 }}>ACTIVE CHALLENGES</span>
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

            <div className="card-box">
              <div className="pgd" style={{ marginTop: 0 }}>
                {filteredChallenges.map(([c, j]) => {
                  const isJoined = joinedChallenges[j];
                  const pct = isJoined ? c[5] : 0;
                  return (
                    <div key={j} className="pcd" style={{ cursor: 'default' }}>
                      <div className="im" style={{ height: '96px' }}>
                        <SceneSvg type={c[1]} color={c[6]} />
                      </div>
                      <div className="bd">
                        <b style={{ fontSize: '16px', display: 'block', color: 'var(--tx)' }}>{c[2]}</b>
                        <small style={{ display: 'block', margin: '3px 0 10px' }}>
                          {c[3]} joined · <b style={{ color: '#D97706' }}>{c[4]} points</b>
                        </small>
                        <div className="pgb">
                          <i style={{ width: `${pct}%` }} />
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '12px',
                            alignItems: 'center'
                          }}
                        >
                          <small className="muted">{isJoined ? `${pct}% complete` : 'Not started'}</small>
                          {isJoined ? (
                            <span className="pill-btn pill-done" style={{ height: '32px', fontSize: '13px' }}>
                              Active ✓
                            </span>
                          ) : (
                            <button
                              className="pill-btn pill-blue"
                              style={{ height: '32px', fontSize: '13px' }}
                              onClick={() => joinChallenge(j)}
                            >
                              Join
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Normal Compact Leaderboard Card (span 4 - Image 6) */}
          <div className="s4">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '0 4px' }}>
              <span className="sec-label" style={{ margin: 0 }}>LEADERBOARD</span>
              <button
                className="lk"
                style={{ fontSize: '13px', fontWeight: 700, color: 'var(--g)', background: 'none', border: '0', cursor: 'pointer' }}
                onClick={() => setShowFullLeaderboard(true)}
              >
                Top 50 &rarr;
              </button>
            </div>

            <div className="card-box">
              {/* Filter pills */}
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

              {/* Top 4 Competitors with Laurel Medals (Image 6) */}
              <div id="lb" style={{ display: 'flex', flexDirection: 'column' }}>
                {compactEntries.map((r, j) => {
                  const isMe = r[0].includes('(you)');
                  const rank = j + 1;
                  const medal = rank === 1 ? '🥇 (1)' : rank === 2 ? '🥈 (2)' : rank === 3 ? '🥉 (3)' : `${rank}`;
                  return (
                    <div
                      key={j}
                      className="card-row"
                      style={{
                        background: isMe ? 'var(--mint)' : 'transparent',
                        margin: isMe ? '0 -8px' : 0,
                        padding: isMe ? '10px 8px' : '11px 0',
                        borderRadius: isMe ? '14px' : 0
                      }}
                    >
                      {/* Laurel Rank */}
                      <span
                        style={{
                          width: rank <= 3 ? '46px' : '30px',
                          fontSize: rank <= 3 ? '15px' : '14px',
                          fontWeight: 800,
                          color: rank === 1 ? '#CA8A04' : rank === 2 ? '#64748B' : rank === 3 ? '#B45309' : 'var(--sub)',
                          textAlign: 'center',
                          flex: 'none'
                        }}
                      >
                        {medal}
                      </span>

                      {/* Squircle Avatar */}
                      <div
                        className="flat-sq"
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '12px',
                          background: COL[j % COL.length],
                          fontSize: '14px'
                        }}
                      >
                        {r[0][0]}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <b style={{ fontSize: '14px', display: 'block', color: 'var(--tx)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {r[0]} <span style={{ color: '#16A34A', fontSize: '10px' }}>●</span>
                        </b>
                        <small className="muted" style={{ display: 'block', fontSize: '12px' }}>
                          {r[1]} · Verified competitor
                        </small>
                      </div>

                      <b style={{ color: 'var(--g)', fontSize: '14px' }}>{r[2].toLocaleString()}</b>
                    </div>
                  );
                })}
              </div>

              {/* Dedicated "Your Ranking" Row */}
              {myEntry && myIndex >= 4 && (
                <div
                  style={{
                    marginTop: '14px',
                    padding: '12px 14px',
                    borderRadius: '16px',
                    background: 'var(--mint)',
                    border: '1.5px solid var(--g)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--gd)' }}>
                      Your Ranking
                    </span>
                    <span className="pill-tag" style={{ background: 'var(--wh)', fontSize: '11px' }}>
                      Rank #{myRank} of {activeLeaderboard.length}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="num-badge">#{myRank}</div>
                    <div style={{ flex: 1 }}>
                      <b style={{ fontSize: '14px' }}>{myEntry[0]}</b>
                      <small className="muted" style={{ display: 'block', fontSize: '12px' }}>
                        {myEntry[1]} · Top 10% standing
                      </small>
                    </div>
                    <b style={{ color: 'var(--gd)', fontSize: '15px' }}>
                      {myEntry[2].toLocaleString()} pts
                    </b>
                  </div>
                </div>
              )}

              {/* View More Button (Top 50) */}
              <button
                className="pill-btn pill-blue"
                style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}
                onClick={() => setShowFullLeaderboard(true)}
              >
                View full leaderboard (Top 50) &rarr;
              </button>
            </div>
          </div>
        </>
      ) : (
        /* Full Leaderboard View (Top 50 - Image 6) */
        <div className="s12">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '0 4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                className="pill-btn pill-outline"
                onClick={() => setShowFullLeaderboard(false)}
                style={{ height: '36px', padding: '0 14px' }}
              >
                &larr; Back
              </button>
              <h2 style={{ fontSize: '24px', margin: 0, letterSpacing: '-0.02em' }}>
                TOP 50 LEADERBOARD
              </h2>
            </div>

            {/* Scope tabs */}
            <div className="cps">
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
          </div>

          <div className="card-box">
            {/* Sticky Your Ranking Bar */}
            {myEntry && (
              <div
                style={{
                  marginBottom: '18px',
                  padding: '16px 20px',
                  borderRadius: '18px',
                  background: 'linear-gradient(135deg, var(--mint), #E0F2FE)',
                  border: '2px solid var(--g)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div className="num-badge" style={{ width: '44px', height: '44px', fontSize: '18px' }}>
                    #{myRank}
                  </div>
                  <div>
                    <b style={{ fontSize: '17px', color: 'var(--tx)' }}>{myEntry[0]} (Your Position)</b>
                    <div className="muted" style={{ fontSize: '13px', marginTop: '2px' }}>
                      {myEntry[1]} · Next milestone: Rank #{Math.max(1, myRank - 1)} (+
                      {(activeLeaderboard[Math.max(0, myIndex - 1)][2] - myEntry[2]).toLocaleString()} pts needed)
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="pill-tag" style={{ background: '#fff', padding: '6px 14px', fontSize: '13px' }}>
                    🔥 7-Day Active Streak
                  </span>
                  <b style={{ fontSize: '20px', color: 'var(--gd)' }}>
                    {myEntry[2].toLocaleString()} pts
                  </b>
                </div>
              </div>
            )}

            {/* Search bar inside leaderboard */}
            <div style={{ marginBottom: '16px', maxWidth: '320px' }}>
              <div className="bsr" style={{ height: '40px' }}>
                <SvgIcon name="search" size={16} />
                <input
                  placeholder="Search competitor name..."
                  value={searchCompetitor}
                  onChange={(e) => setSearchCompetitor(e.target.value)}
                />
              </div>
            </div>

            {/* 50-person Leaderboard List */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '680px',
                overflowY: 'auto',
                paddingRight: '6px'
              }}
            >
              {fullDisplayList.map((r) => {
                const rank = r.rank;
                const isMe = r[0].includes('(you)');
                const isTop3 = rank <= 3;
                const medal = rank === 1 ? '🥇 (1)' : rank === 2 ? '🥈 (2)' : rank === 3 ? '🥉 (3)' : `${rank}`;

                return (
                  <div
                    key={rank}
                    className="card-row"
                    style={{
                      background: isMe ? 'var(--mint)' : 'transparent',
                      padding: '12px 10px',
                      borderRadius: isMe ? '14px' : 0
                    }}
                  >
                    {/* Laurel medal / Rank badge */}
                    <span
                      style={{
                        width: isTop3 ? '48px' : '30px',
                        fontSize: isTop3 ? '15px' : '14px',
                        fontWeight: 800,
                        color: rank === 1 ? '#CA8A04' : rank === 2 ? '#64748B' : rank === 3 ? '#B45309' : 'var(--sub)',
                        textAlign: 'center',
                        flex: 'none'
                      }}
                    >
                      {medal}
                    </span>

                    {/* Squircle Avatar */}
                    <div
                      className="flat-sq"
                      style={{
                        background: COL[(rank - 1) % COL.length],
                        width: '40px',
                        height: '40px',
                        fontSize: '15px'
                      }}
                    >
                      {r[0][0]}
                    </div>

                    {/* Name & country */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <b style={{ fontSize: '15px', color: isMe ? 'var(--gd)' : 'var(--tx)' }}>
                          {r[0]}
                        </b>
                        <span style={{ color: '#16A34A', fontSize: '10px' }}>●</span>
                        {isMe && (
                          <span className="pill-tag" style={{ background: 'var(--g)', color: '#fff', fontSize: '11px', padding: '2px 8px' }}>
                            YOU
                          </span>
                        )}
                      </div>
                      <small className="muted" style={{ display: 'block', fontSize: '12px' }}>
                        {r[1]} · Verified competitor
                      </small>
                    </div>

                    {/* Points */}
                    <div style={{ textAlign: 'right' }}>
                      <b style={{ fontSize: '16px', color: isMe ? 'var(--gd)' : 'var(--tx)' }}>
                        {r[2].toLocaleString()}
                      </b>
                      <small className="muted" style={{ display: 'block', fontSize: '11px' }}>
                        points
                      </small>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                marginTop: '16px',
                paddingTop: '14px',
                borderTop: '1px solid var(--ln)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <small className="muted">Showing {fullDisplayList.length} of 50 active rankings</small>
              <button className="pill-btn pill-blue" onClick={() => setShowFullLeaderboard(false)}>
                Back to Sprints
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
