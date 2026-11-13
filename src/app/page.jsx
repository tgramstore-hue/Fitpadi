import React from 'react';
import Link from 'next/link';
import SvgIcon from '../components/SvgIcon.jsx';
import SceneSvg from '../components/SceneSvg.jsx';
import VideoSection from '../components/VideoSection.jsx';
import { HERO } from '../data/hero.js';
import { BLOG } from '../data/appData.js';

export default function HomePage() {
  return (
    <div className="pg">
      {/* Hero Section */}
      <section className="hero">
        <div className="w">
          <div>
            <span className="eb">Free health &amp; wellness web app</span>
            <h1>
              Move better.<br />
              Live healthier.<br />
              <span style={{ color: 'var(--g)' }}>Earn rewards.</span>
            </h1>
            <p className="lead">
              Daily missions, guided programmes, health education and friendly challenges that fit around your day.
            </p>
            <div className="cta">
              <Link className="btn" href="/signup">
                Get started free
              </Link>
              <Link className="btn o" href="/programmes">
                Explore programmes
              </Link>
            </div>
          </div>

          <div className="vis">
            <div className="hb" aria-hidden="true" />
            <img
              className="hi"
              src={HERO}
              alt="Illustration of a man and a woman in green fitness clothes flexing"
              width={620}
              height={803}
            />
            <div className="fl" style={{ left: 0, top: '50px' }}>
              <i style={{ background: 'var(--cor)' }}>
                <SvgIcon name="flame" size={16} />
              </i>
              7-day streak
            </div>
            <div className="fl" style={{ right: 0, bottom: '90px', animationDelay: '1.4s' }}>
              <i style={{ background: 'var(--pur)' }}>
                <SvgIcon name="trophy" size={16} />
              </i>
              Weekly rank #4
            </div>
            <div className="fl" style={{ right: '6%', top: '24px', animationDelay: '0.7s' }}>
              <i style={{ background: 'var(--g)' }}>
                <SvgIcon name="chk" size={16} />
              </i>
              Daily goal 40%
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="s alt">
        <div className="w stats">
          {[
            ['20+', 'Programme topics'],
            ['5', 'Daily missions'],
            ['4', 'Launch countries'],
            ['$0', 'Cost to join']
          ].map((s, j) => (
            <div key={j} className="rv" style={{ '--d': `${j * 90}ms` }}>
              <b>{s[0]}</b>
              <span className="muted">{s[1]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Health Fund Feature Strip */}
      <section className="s" style={{ padding: '48px 0 0' }}>
        <div className="w">
          <Link href="/impact" className="fs rv" style={{ textDecoration: 'none' }}>
            <div style={{ maxWidth: '620px' }}>
              <span className="eb">New · FitPadi Health Fund</span>
              <h3 style={{ fontSize: '26px' }}>
                A planned $10 million fund to reward healthy living in Nigeria
              </h3>
              <p className="muted" style={{ marginTop: '6px', fontSize: '16px' }}>
                See how the fund works and how rewards will be shared.
              </p>
            </div>
            <span className="btn">See the fund</span>
          </Link>
        </div>
      </section>

      {/* Video Section */}
      <section className="s" style={{ paddingBottom: 0 }}>
        <div className="w rv" style={{ textAlign: 'center', maxWidth: '760px' }}>
          <span className="eb">See how it works</span>
          <h2>Get rewarded for staying healthy</h2>
          <p className="lead" style={{ margin: '14px auto 0' }}>
            Watch how FitPadi turns everyday walking, workouts and learning into points and rewards.
          </p>
        </div>

        <VideoSection />

        <div className="w rv" style={{ textAlign: 'center', paddingTop: '36px' }}>
          <Link className="btn" href="/signup">
            Start for free
          </Link>
          <p className="muted" style={{ fontSize: '13px', marginTop: '14px' }}>
            Rewards are not guaranteed and depend on eligibility and verification. See our{' '}
            <Link href="/terms" style={{ color: 'var(--g)', fontWeight: 600 }}>
              Terms of Service
            </Link>.
          </p>
        </div>
      </section>

      {/* Features Grid - Authentic Vibrant Colors */}
      <section className="s">
        <div className="w">
          <div className="hd rv">
            <span className="eb">Features</span>
            <h2>Everything you need to build a healthier routine</h2>
            <p className="lead">
              Practical tools and trustworthy education in one place.
            </p>
          </div>

          <div className="grid">
            <div className="card rv" style={{ '--c': '#16A34A', '--d': '0ms' }}>
              <div className="ico">
                <SvgIcon name="flame" size={28} />
              </div>
              <h3>Daily missions</h3>
              <p>Small daily activities for movement, nutrition and mind.</p>
            </div>

            <div className="card rv" style={{ '--c': '#6D3AE8', '--d': '80ms' }}>
              <div className="ico">
                <SvgIcon name="act" size={28} />
              </div>
              <h3>Walking tracker</h3>
              <p>Track steps, distance and streaks with weekly history.</p>
            </div>

            <div className="card rv" style={{ '--c': '#EF5A3C', '--d': '160ms' }}>
              <div className="ico">
                <SvgIcon name="dumb" size={28} />
              </div>
              <h3>Guided programmes</h3>
              <p>Structured plans from beginner to advanced.</p>
            </div>

            <div className="card rv" style={{ '--c': '#2563EB', '--d': '240ms' }}>
              <div className="ico">
                <SvgIcon name="cap" size={28} />
              </div>
              <h3>Health Academy</h3>
              <p>Short lessons, articles and myth-versus-fact quizzes.</p>
            </div>

            <div className="card rv" style={{ '--c': '#0F766E', '--d': '320ms' }}>
              <div className="ico">
                <SvgIcon name="trophy" size={28} />
              </div>
              <h3>Community challenges</h3>
              <p>Join daily and weekly challenges and climb the leaderboard.</p>
            </div>

            <div className="card rv" style={{ '--c': '#D97706', '--d': '400ms' }}>
              <div className="ico">
                <SvgIcon name="coin" size={28} />
              </div>
              <h3>Points and rewards</h3>
              <p>Earn points for genuine healthy activity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Three simple steps */}
      <section className="s alt">
        <div className="w two">
          <div className="rv">
            <span className="eb">How it works</span>
            <h2>Three simple steps</h2>
            <p className="lead" style={{ marginTop: '12px' }}>
              No equipment or experience needed.
            </p>
          </div>
          <div style={{ display: 'grid', gap: '26px' }}>
            {[
              ['Create your free account', 'Tell us your goals and the activities you enjoy.'],
              ['Complete daily activities', 'Walk, stretch, learn or breathe, then earn points.'],
              ['Grow with friends', 'Join challenges and invite friends to grow together.']
            ].map((step, j) => (
              <div key={j} className="step rv" style={{ '--d': `${j * 100}ms` }}>
                <span>{j + 1}</span>
                <div>
                  <h3>{step[0]}</h3>
                  <p className="muted">{step[1]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Health Guides from Blog */}
      <section className="s alt">
        <div className="w">
          <div
            className="hd rv"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              maxWidth: 'none',
              gap: '20px',
              flexWrap: 'wrap'
            }}
          >
            <div>
              <span className="eb">From the blog</span>
              <h2>Latest health guides</h2>
            </div>
            <Link className="btn o sm" href="/blog">
              View more articles
            </Link>
          </div>

          <div className="g3">
            {BLOG.slice(0, 3).map((art, idx) => (
              <Link key={idx} href={`/blog/${art[0]}`} className="bpc rv" style={{ '--d': `${(idx % 3) * 80}ms` }}>
                <div className="bim">
                  <SceneSvg type={art[6] || (idx % 2 === 0 ? 'walk' : 'mind')} color={art[5] || '#16A34A'} />
                </div>
                <div className="bbd">
                  <span className="bct">{art[2]}</span>
                  <h3>{art[1]}</h3>
                  <p>{art[7]}</p>
                  <div className="bmt">
                    {art[4]} · {art[3]}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link className="btn" href="/blog">
              View more articles
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Green CTA Banner */}
      <section className="s" style={{ paddingTop: 0 }}>
        <div className="w">
          <div className="band rv">
            <h2>Start your healthier routine today</h2>
            <p>Join FitPadi for free and take the first step.</p>
            <Link className="btn wt" href="/signup">
              Create free account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
