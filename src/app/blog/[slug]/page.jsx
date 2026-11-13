'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SceneSvg from '../../../components/SceneSvg.jsx';
import { BLOG } from '../../../data/appData.js';

export default function SingleArticlePage({ params }) {
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;

  const article = BLOG.find((item) => item[0] === slug);
  if (!article) {
    return notFound();
  }

  const [
    articleSlug,
    title,
    category,
    readTime,
    date,
    color,
    sceneType,
    excerpt,
    takeaways,
    introBody,
    sections,
    citations
  ] = article;

  const relatedArticles = BLOG.filter((item) => item[0] !== articleSlug).slice(0, 3);

  return (
    <div className="pg">
      <article className="s" style={{ paddingTop: '40px' }}>
        <div className="w" style={{ maxWidth: '820px' }}>
          {/* Breadcrumb */}
          <div className="bcr">
            <Link href="/blog">&larr; Back to all articles</Link>
          </div>

          {/* Category & Title */}
          <div style={{ margin: '20px 0 16px' }}>
            <span className="bct">{category}</span>
          </div>

          <h1 style={{ fontSize: 'clamp(30px, 4.5vw, 48px)', lineHeight: 1.15, marginBottom: '18px' }}>
            {title}
          </h1>

          <p className="lead" style={{ fontSize: '20px', maxWidth: '100%', marginBottom: '24px' }}>
            {excerpt}
          </p>

          <div className="bau" style={{ marginBottom: '32px' }}>
            <div className="bav">FP</div>
            <div>
              <b style={{ display: 'block', fontSize: '15px' }}>FitPadi Health Editorial</b>
              <small className="muted">Published on {date} · {readTime}</small>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="bhero">
            <SceneSvg type={sceneType || 'walk'} color={color || '#15803D'} />
          </div>

          {/* Key Takeaways */}
          {takeaways && takeaways.length > 0 && (
            <div className="tk">
              <h3 style={{ fontSize: '18px', color: 'var(--gd)' }}>Key Takeaways</h3>
              <ul>
                {takeaways.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Table of Contents */}
          {sections && sections.length > 0 && (
            <div className="toc">
              <b>In this article</b>
              <ol>
                {sections.map((sec, i) => (
                  <li key={i}>
                    <a href={`#section-${i}`} className="lk">
                      {sec[0]}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Main Body */}
          <div className="bd2" style={{ marginTop: '36px' }}>
            {introBody && <p>{introBody}</p>}

            {sections && sections.map((sec, i) => (
              <div key={i} id={`section-${i}`} style={{ marginTop: '36px' }}>
                <h2>{sec[0]}</h2>
                <p>{sec[1]}</p>
              </div>
            ))}

            {citations && citations.length > 0 && (
              <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--ln)' }}>
                <h4 style={{ fontSize: '16px', marginBottom: '12px' }}>References &amp; Evidence</h4>
                <ul style={{ paddingLeft: '20px', fontSize: '14px', color: 'var(--sub)', lineHeight: 1.7 }}>
                  {citations.map((c, i) => (
                    <li key={i}>
                      {c[1] ? (
                        <a href={c[1]} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--g)', textDecoration: 'underline' }}>
                          {c[0]}
                        </a>
                      ) : (
                        c[0]
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Author Box */}
            <div className="bab">
              <div className="bav" style={{ width: '48px', height: '48px', fontSize: '16px' }}>
                FP
              </div>
              <div>
                <b style={{ fontSize: '16px' }}>Written by the FitPadi Clinical &amp; Fitness Team</b>
                <p style={{ marginTop: '4px' }}>
                  Our team brings together certified exercise physiologists, registered dietitians, and lifestyle medicine researchers to translate peer-reviewed health science into realistic daily habits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="s alt">
        <div className="w">
          <h2 style={{ marginBottom: '28px' }}>Related Health Guides</h2>
          <div className="g3">
            {relatedArticles.map((art, idx) => (
              <Link key={idx} href={`/blog/${art[0]}`} className="bpc">
                <div className="bim">
                  <SceneSvg type={art[6] || 'walk'} color={art[5] || '#15803D'} />
                </div>
                <div className="bbd">
                  <span className="bct">{art[2]}</span>
                  <h3>{art[1]}</h3>
                  <p>{art[7]}</p>
                  <div className="bmt">
                    {art[3]} · Read article &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
