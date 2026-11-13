import React from 'react';
import Link from 'next/link';
import SvgIcon from '../../components/SvgIcon.jsx';
import { FUND } from '../../data/appData.js';

export default function ImpactPage() {
  const f = FUND;
  const rem = f.pool - f.paid;
  const pct = ((f.paid / f.pool) * 100).toFixed(1);
  const avg = Math.round(f.paid / f.members);

  const bars = (items) =>
    items.map(([label, val], idx) => (
      <div key={idx} className="brow">
        <span>{label}</span>
        <div className="fb">
          <i style={{ width: `${val}%` }} />
        </div>
        <b style={{ textAlign: 'right' }}>{val}%</b>
      </div>
    ));

  return (
    <div className="pg">
      <div className="ph">
        <div className="w" style={{ maxWidth: '900px' }}>
          <span className="eb">FitPadi Health Fund</span>
          <h1 style={{ fontSize: 'clamp(34px, 5vw, 56px)' }}>
            A planned $10 million fund to reward healthy living in Nigeria
          </h1>
          <p className="lead" style={{ maxWidth: '720px' }}>
            According to United Nations estimates, life expectancy at birth in Nigeria is around 55 years, compared with a global average of about 73. FitPadi rewards the everyday habits that support better health: walking, learning, eating well and staying active.
          </p>
          <div className="cta" style={{ marginTop: '26px' }}>
            <Link className="btn" href="/signup">
              Join free and start earning
            </Link>
            <a className="btn o" href="#how">
              How it works
            </a>
          </div>
        </div>
      </div>

      <section className="s">
        <div className="w">
          {f.sample && (
            <div className="note" style={{ margin: '0 0 28px' }}>
              <p>
                <b>Preview with sample figures.</b> The numbers on this page are placeholders that show how live fund data will appear. They will be replaced with verified figures from the fund ledger before launch.
              </p>
            </div>
          )}

          {/* 5 Authentic Colored Stat Cards */}
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <div className="card rv" style={{ '--c': '#16A34A', padding: '22px', minHeight: 0 }}>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Total fund (planned size)</p>
              <div style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.15, marginTop: '6px' }}>
                ${f.pool.toLocaleString()}
              </div>
              <p style={{ marginTop: '4px', fontSize: '13px' }}>Set aside for member rewards</p>
            </div>

            <div className="card rv" style={{ '--c': '#6D3AE8', padding: '22px', minHeight: 0 }}>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Paid out to members</p>
              <div style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.15, marginTop: '6px' }}>
                ${f.paid.toLocaleString()}
              </div>
              <p style={{ marginTop: '4px', fontSize: '13px' }}>{pct}% of the fund</p>
            </div>

            <div className="card rv" style={{ '--c': '#2563EB', padding: '22px', minHeight: 0 }}>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Remaining in the fund</p>
              <div style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.15, marginTop: '6px' }}>
                ${rem.toLocaleString()}
              </div>
              <p style={{ marginTop: '4px', fontSize: '13px' }}>Available for future rewards</p>
            </div>

            <div className="card rv" style={{ '--c': '#EF5A3C', padding: '22px', minHeight: 0 }}>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Members earning</p>
              <div style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.15, marginTop: '6px' }}>
                {f.members.toLocaleString()}
              </div>
              <p style={{ marginTop: '4px', fontSize: '13px' }}>Active this month</p>
            </div>

            <div className="card rv" style={{ '--c': '#0F766E', padding: '22px', minHeight: 0 }}>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Average earned per member</p>
              <div style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.15, marginTop: '6px' }}>
                ${avg}
              </div>
              <p style={{ marginTop: '4px', fontSize: '13px' }}>Across all paid members</p>
            </div>
          </div>

          {/* Fund Progress White Card */}
          <div className="wc rv" style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
              <h3>Fund progress</h3>
              <b style={{ color: 'var(--g)' }}>{pct}% distributed</b>
            </div>
            <div className="fb">
              <i style={{ width: `${pct}%` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '14px' }} className="muted">
              <span>$0</span>
              <span>$10,000,000</span>
            </div>
          </div>
        </div>
      </section>

      {/* Distribution Breakdowns */}
      <section className="s alt">
        <div className="w two">
          <div className="wc rv">
            <h3>Where rewards are earned</h3>
            <p className="muted" style={{ marginTop: '4px', fontSize: '15px' }}>
              Share of total payouts by activity
            </p>
            {bars([
              ['Walking', 38],
              ['Lessons', 22],
              ['Challenges', 20],
              ['Referrals', 12],
              ['Daily missions', 8]
            ])}
          </div>

          <div className="wc rv" style={{ '--d': '100ms' }}>
            <h3>Where members are</h3>
            <p className="muted" style={{ marginTop: '4px', fontSize: '15px' }}>
              Share of payouts by state
            </p>
            {bars([
              ['Lagos', 21],
              ['FCT Abuja', 14],
              ['Rivers', 9],
              ['Kano', 8],
              ['Oyo', 7],
              ['Other states', 41]
            ])}
          </div>
        </div>
      </section>

      {/* Recent Payouts Feed */}
      <section className="s">
        <div className="w two">
          <div>
            <span className="eb">Recent payouts</span>
            <h2>Rewards going to real habits</h2>
            <p className="lead" style={{ marginTop: '12px' }}>
              Every payout is tied to verified activity. Member names are never shown.
            </p>
          </div>
          <div className="wc feed">
            {[
              ['Lagos', 'Walking challenge', '$2.00', '2 min ago'],
              ['Abuja', 'Health lesson', '$0.50', '5 min ago'],
              ['Port Harcourt', 'Referral commission', '$2.00', '9 min ago'],
              ['Kano', 'Seven-day streak', '$1.50', '14 min ago'],
              ['Ibadan', 'Workout programme', '$1.00', '21 min ago']
            ].map((r, j) => (
              <div key={j} className="it rv" style={{ '--d': `${j * 80}ms` }}>
                <span
                  className="ico"
                  style={{
                    margin: 0,
                    width: '44px',
                    height: '44px',
                    borderRadius: '14px',
                    background: 'var(--mint)',
                    color: 'var(--gd)',
                    display: 'grid',
                    placeItems: 'center'
                  }}
                >
                  <SvgIcon name="coin" size={22} />
                </span>
                <div style={{ flex: 1 }}>
                  <b>{r[1]}</b>
                  <div className="muted" style={{ fontSize: '14px' }}>
                    {r[0]} · {r[3]}
                  </div>
                </div>
                <b style={{ color: 'var(--g)' }}>{r[2]}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - 4 Colorful Cards */}
      <section className="s alt" id="how">
        <div className="w">
          <div className="hd rv">
            <span className="eb">How it works</span>
            <h2>Earn by looking after yourself</h2>
          </div>
          <div className="grid">
            {[
              ['act', 'Be active', 'Walk, exercise and complete daily missions.', '#16A34A'],
              ['cap', 'Learn', 'Finish health lessons and quizzes.', '#2563EB'],
              ['trophy', 'Take part', 'Join challenges and climb the leaderboard.', '#6D3AE8'],
              ['wallet', 'Get rewarded', 'Qualifying activity earns rewards from the fund.', '#EF5A3C']
            ].map((s, j) => (
              <div
                key={j}
                className="card rv"
                style={{ '--c': s[3], '--d': `${j * 80}ms`, minHeight: '220px' }}
              >
                <div className="ico">
                  <SvgIcon name={s[0]} size={28} />
                </div>
                <h3>{s[1]}</h3>
                <p style={{ marginTop: '8px', opacity: 0.9 }}>{s[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="s">
        <div className="w two">
          <div className="rv">
            <span className="eb">Transparency</span>
            <h2>Open about where the money goes</h2>
            <ul style={{ margin: '18px 0 0 20px', color: 'var(--sub)' }}>
              <li style={{ marginBottom: '10px' }}>Fund figures come from a verified ledger, not estimates.</li>
              <li style={{ marginBottom: '10px' }}>Rewards are tied to genuine activity, and fraud is removed.</li>
              <li style={{ marginBottom: '10px' }}>Regular public reports on payouts and remaining funds.</li>
              <li>Rewards are never paid for viewing or clicking ads.</li>
            </ul>
          </div>
          <div className="wc rv" style={{ '--d': '100ms' }}>
            <h3>Our partners</h3>
            <p className="muted" style={{ margin: '6px 0 18px', fontSize: '15px' }}>
              We are working with organisations that share our goal. Partners will be announced here once confirmed.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[1, 2, 3, 4].map((p) => (
                <div
                  key={p}
                  style={{
                    border: '1.5px dashed var(--ln)',
                    borderRadius: '16px',
                    height: '76px',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--sub)',
                    fontSize: '13px'
                  }}
                >
                  Partner organisation
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="s alt">
        <div className="w" style={{ maxWidth: '820px' }}>
          <div className="hd rv">
            <span className="eb">FAQ</span>
            <h2>Common questions</h2>
          </div>
          {[
            [
              'Is it really free to join?',
              'Yes. Joining FitPadi is free. Members earn rewards by completing genuine healthy activities. Rewards are funded from the Health Fund and are subject to eligibility, verification and our Terms of Service.'
            ],
            [
              'How are rewards paid?',
              'Where cash rewards are available, Nigerian members can withdraw using USDT or bank transfer, subject to a minimum withdrawal and account verification.'
            ],
            [
              'What happens when the fund runs out?',
              'The fund is a finite pool. Once it has been fully distributed, rewards from it end. FitPadi’s health content and tools stay free to use.'
            ],
            [
              'Does FitPadi promise to increase life expectancy?',
              'No. FitPadi provides general wellness education and encourages healthy habits. It is not medical care, and we make no promise about any individual’s health or lifespan. See our Health & Ad Disclaimer.'
            ],
            [
              'Why Nigeria first?',
              'UN estimates put Nigeria’s life expectancy at birth at around 55 years, among the lowest in the world. Helping people build everyday healthy habits is one practical contribution we can make.'
            ]
          ].map((q, idx) => (
            <details key={idx} className="fq rv">
              <summary>{q[0]}</summary>
              <p>{q[1]}</p>
            </details>
          ))}
          <p className="muted" style={{ fontSize: '13px', marginTop: '22px' }}>
            Life expectancy figures: United Nations, World Population Prospects. Estimates vary slightly between editions.
          </p>
        </div>
      </section>

      {/* Brand Green CTA Banner */}
      <section className="s">
        <div className="w">
          <div className="band rv">
            <h2>Be part of a healthier Nigeria</h2>
            <p>Create your free account and start earning for the habits that matter.</p>
            <Link className="btn wt" href="/signup">
              Join FitPadi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
