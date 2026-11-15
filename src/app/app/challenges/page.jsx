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
    <div className="gr">
      {/* 4 KPIs with brand colors */}
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
          <small>Competitors</small>
          <b>{activeLeaderboard.length} active</b>
          <em>{lbFilter === 'global' ? 'Worldwide' : lbFilter === 'country' ? 'Nigeria' : 'Friends circle'}</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#EF5A3C' }}>
        <span className="ki">
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
          <div className="pn s8">
            <div className="pt">
              <div>
                <h3>Community challenges</h3>
                <small className="muted">Compete in sprints to earn verified Health Fund points</small>
              </div>
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

            <div className="pgd" style={{ marginTop: '16px' }}>
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

          {/* Normal Compact Leaderboard Card (span 4) */}
          <div className="pn s4">
            <div className="pt">
              <div>
                <h3>Leaderboard</h3>
                <small className="muted">Top performers</small>
              </div>
              <button
                className="lk"
                style={{ fontSize: '13px', fontWeight: 600, color: 'var(--g)', background: 'none', border: '0', cursor: 'pointer' }}
                onClick={() => setShowFullLeaderboard(true)}
              >
                Top 50 &rarr;
              </button>
            </div>

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

            {/* Top 4 Competitors */}
            <div id="lb" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {compactEntries.map((r, j) => {
                const isMe = r[0].includes('(you)');
                return (
                  <div
                    key={j}
                    className={`lr ${isMe ? 'me' : ''}`}
                    style={{
                      background: isMe ? 'var(--mint)' : 'var(--wh)',
                      border: isMe ? '1.5px solid var(--g)' : '1px solid var(--ln)',
                      padding: '10px 12px'
                    }}
                  >
                    <span className={`rk r${j + 1}`}>{j + 1}</span>
                    <span className="av2" style={{ background: COL[j % 5] }}>
                      {r[0][0]}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <b style={{ fontSize: '14px', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {r[0]}
                      </b>
                      <small className="muted" style={{ display: 'block', fontSize: '12px' }}>
                        {r[1]} · Active
                      </small>
                    </div>
                    <b style={{ color: 'var(--g)', fontSize: '14px' }}>{r[2].toLocaleString()}</b>
                  </div>
                );
              })}
            </div>

            {/* Dedicated "Your Ranking" Card if you are not in top 4 */}
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
                  <span className="pp2" style={{ background: 'var(--wh)', fontSize: '11px' }}>
                    Rank #{myRank} of {activeLeaderboard.length}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'var(--g)',
                      color: '#fff',
                      display: 'grid',
                      placeItems: 'center',
                      fontWeight: 700,
                      fontSize: '13px'
                    }}
                  >
                    #{myRank}
                  </span>
                  <div style={{ flex: 1 }}>
                    <b style={{ fontSize: '14px' }}>{myEntry[0]}</b>
                    <small className="muted" style={{ display: 'block', fontSize: '12px' }}>
                      {myEntry[1]} · Top 10% performer
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
              className="btn sm o"
              style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}
              onClick={() => setShowFullLeaderboard(true)}
            >
              View full leaderboard (Top 50) &rarr;
            </button>
          </div>
        </>
      ) : (
        /* Full Leaderboard View (Top 50) */
        <div className="pn s12">
          <div
            className="pt"
            style={{
              flexWrap: 'wrap',
              gap: '12px',
              paddingBottom: '16px',
              borderBottom: '1px solid var(--ln)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  className="btn sm o"
                  onClick={() => setShowFullLeaderboard(false)}
                  style={{ height: '36px', padding: '0 14px' }}
                >
                  &larr; Back to Challenges
                </button>
                <h3 style={{ fontSize: '22px', margin: 0 }}>
                  Full Leaderboard — Top 50
                </h3>
              </div>
              <small className="muted" style={{ display: 'block', marginTop: '4px' }}>
                Live member standings powered by verified Health Fund activity
              </small>
            </div>

            {/* Scope tabs */}
            <div className="cps">
              {['global', 'country', 'friends'].map((k) => (
                <button
                  key={k}
                  className={`cp ${lbFilter === k ? 'on' : ''}`}
                  onClick={() => setLbFilter(k)}
                >
                  {k === 'global' ? 'Global (Top 50)' : k === 'country' ? 'Nigeria (Top 50)' : 'Friends (Top 50)'}
                </button>
              ))}
            </div>
          </div>

          {/* Sticky Your Ranking Bar */}
          {myEntry && (
            <div
              style={{
                margin: '18px 0',
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
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '14px',
                    background: 'var(--g)',
                    color: '#fff',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 800,
                    fontSize: '18px'
                  }}
                >
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
                <span className="pp2" style={{ background: '#fff', padding: '6px 14px', fontSize: '13px' }}>
                  🔥 7-Day Active Streak
                </span>
                <b style={{ fontSize: '20px', color: 'var(--gd)' }}>
                  {myEntry[2].toLocaleString()} pts
                </b>
              </div>
            </div>
          )}

          {/* Search bar inside leaderboard */}
          <div style={{ margin: '14px 0 18px', maxWidth: '320px' }}>
            <div className="bsr" style={{ height: '40px' }}>
              <SvgIcon name="search" size={16} />
              <input
                placeholder="Search competitors in Top 50..."
                value={searchCompetitor}
                onChange={(e) => setSearchCompetitor(e.target.value)}
              />
            </div>
          </div>

          {/* 50-person Leaderboard Table / Cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              maxHeight: '680px',
              overflowY: 'auto',
              paddingRight: '6px'
            }}
          >
            {fullDisplayList.map((r) => {
              const rank = r.rank;
              const isMe = r[0].includes('(you)');
              const isTop3 = rank <= 3;
              const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : null;

              return (
                <div
                  key={rank}
                  className={`lr ${isMe ? 'me' : ''}`}
                  style={{
                    background: isMe ? 'var(--mint)' : isTop3 ? 'var(--sf)' : 'var(--wh)',
                    border: isMe
                      ? '2px solid var(--g)'
                      : isTop3
                      ? '1.5px solid rgba(22, 163, 74, 0.3)'
                      : '1px solid var(--ln)',
                    borderRadius: '16px',
                    padding: '12px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px'
                  }}
                >
                  {/* Rank badge */}
                  <span
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '12px',
                      background: rank === 1 ? '#FEF08A' : rank === 2 ? '#E2E8F0' : rank === 3 ? '#FFEDD5' : 'var(--sf)',
                      color: rank === 1 ? '#854D0E' : rank === 2 ? '#475569' : rank === 3 ? '#9A3412' : 'var(--tx)',
                      display: 'grid',
                      placeItems: 'center',
                      fontWeight: 800,
                      fontSize: isTop3 ? '16px' : '14px',
                      flex: 'none'
                    }}
                  >
                    {medal || rank}
                  </span>

                  {/* Avatar */}
                  <span
                    className="av2"
                    style={{
                      background: COL[(rank - 1) % COL.length],
                      width: '38px',
                      height: '38px',
                      fontSize: '15px'
                    }}
                  >
                    {r[0][0]}
                  </span>

                  {/* Name & country */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <b style={{ fontSize: '15px', color: isMe ? 'var(--gd)' : 'var(--tx)' }}>
                        {r[0]}
                      </b>
                      {isMe && (
                        <span
                          style={{
                            background: 'var(--g)',
                            color: '#fff',
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '999px'
                          }}
                        >
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
            <button className="btn sm" onClick={() => setShowFullLeaderboard(false)}>
              Close Full View
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
