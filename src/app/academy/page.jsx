import React from 'react';
import Link from 'next/link';
import SvgIcon from '../../components/SvgIcon.jsx';
import { ART } from '../../data/appData.js';

export default function AcademyPage() {
  return (
    <div className="pg">
      <div className="ph">
        <div className="w">
          <span className="eb">Health Academy</span>
          <h1 style={{ fontSize: 'clamp(34px, 5vw, 52px)' }}>
            Learn something healthy today
          </h1>
          <p className="lead">
            Practical guides on movement, nutrition and wellbeing written in plain language.
          </p>
        </div>
      </div>

      <section className="s">
        <div className="w">
          <div className="grid">
            {ART.map((a, j) => (
              <Link key={a[0]} href={`/blog/${a[0]}`} className="ac">
                <div
                  className="card rv"
                  style={{
                    '--c': a[4],
                    '--d': `${j * 90}ms`,
                    minHeight: '260px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div className="ico">
                      <SvgIcon name={a[5]} size={28} />
                    </div>
                    <span className="tag" style={{ margin: '0 0 10px', display: 'inline-block' }}>
                      {a[2]}
                    </span>
                    <h3>{a[1]}</h3>
                  </div>
                  <p style={{ marginTop: 'auto', paddingTop: '14px', fontSize: '14px', opacity: 0.9 }}>
                    {a[3]} · Read article &rarr;
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <aside className="ad" aria-label="Advertisement" style={{ marginTop: '36px' }}>
            <span>Advertisement</span>
            <div>FitPadi Health Education Partner</div>
          </aside>
        </div>
      </section>
    </div>
  );
}
