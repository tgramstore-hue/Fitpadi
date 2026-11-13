'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SceneSvg from '../../components/SceneSvg.jsx';
import SvgIcon from '../../components/SvgIcon.jsx';
import { BLOG, BCATS } from '../../data/appData.js';

export default function BlogListingPage() {
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');

  const featured = BLOG[0];

  const filtered = BLOG.filter((art) => {
    const matchesCat = activeCat === 'All' || art[3].toLowerCase() === activeCat.toLowerCase();
    const matchesQ =
      !search ||
      art[1].toLowerCase().includes(search.toLowerCase()) ||
      art[2].toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesQ;
  });

  return (
    <div className="pg">
      <section className="s" style={{ paddingBottom: '32px' }}>
        <div className="w">
          <div className="hd">
            <span className="eb">FitPadi Blog</span>
            <h1>Science-backed wellness guides</h1>
            <p className="lead">
              Practical guides on fitness, nutrition, habit science, and recovery—written in plain language to help you live healthier every single day.
            </p>
          </div>

          {/* Search & Categories Bar */}
          <div className="bbar">
            <div className="bsr">
              <SvgIcon name="search" size={20} />
              <input
                placeholder="Search articles by title or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="cps" style={{ flexWrap: 'wrap' }}>
              <button
                className={`cp ${activeCat === 'All' ? 'on' : ''}`}
                onClick={() => setActiveCat('All')}
              >
                All Articles
              </button>
              {BCATS.map((cat, i) => (
                <button
                  key={i}
                  className={`cp ${activeCat === cat ? 'on' : ''}`}
                  onClick={() => setActiveCat(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Article Banner */}
          {!search && activeCat === 'All' && featured && (
            <Link href={`/blog/${featured[0]}`} className="bfe">
              <div className="bfi">
                <SceneSvg type="walk" color="#15803D" />
              </div>
              <div className="bfb">
                <span className="bct">{featured[3]}</span>
                <h2>{featured[1]}</h2>
                <p>{featured[2]}</p>
                <div className="bmt">
                  By {featured[5]} · {featured[4]} min read · Featured Guide &rarr;
                </div>
              </div>
            </Link>
          )}

          {/* Articles Grid */}
          <div className="g3" style={{ marginTop: '24px' }}>
            {filtered.map((art, idx) => (
              <Link key={idx} href={`/blog/${art[0]}`} className="bpc">
                <div className="bim">
                  <SceneSvg
                    type={idx % 3 === 0 ? 'walk' : (idx % 3 === 1 ? 'food' : 'mind')}
                    color={idx % 2 === 0 ? '#15803D' : '#0F766E'}
                  />
                </div>
                <div className="bbd">
                  <span className="bct">{art[3]}</span>
                  <h3>{art[1]}</h3>
                  <p>{art[2]}</p>
                  <div className="bmt">
                    By {art[5]} · {art[4]} min read
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p className="muted">No articles found matching &quot;{search}&quot;.</p>
              <button
                className="btn sm o"
                style={{ marginTop: '16px' }}
                onClick={() => {
                  setSearch('');
                  setActiveCat('All');
                }}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

