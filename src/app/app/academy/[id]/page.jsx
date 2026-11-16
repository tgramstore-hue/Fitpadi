'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SvgIcon from '../../../../components/SvgIcon.jsx';
import { useApp } from '../../../../context/AppContext.jsx';
import { CRS, QZ } from '../../../../data/appData.js';

export default function CourseDetailPage({ params }) {
  const unwrappedParams = use(params);
  const courseId = parseInt(unwrappedParams.id, 10);
  const course = CRS[courseId];

  const { showToast, logQuickActivity } = useApp();

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!course) return notFound();

  const qData = QZ[activeQuestion] || QZ[0];
  const questionText = qData[0];
  const options = qData[1];
  const correctIdx = qData[2];

  const handleSelectOption = (idx) => {
    if (selectedAnswers[activeQuestion] !== undefined) return;
    const isCorrect = idx === correctIdx;
    setSelectedAnswers({ ...selectedAnswers, [activeQuestion]: idx });

    if (isCorrect) {
      showToast('Correct! +10 points');
    } else {
      showToast('Not quite, but great effort! Review the lesson on the left.');
    }
  };

  const handleFinishQuiz = () => {
    setSubmitted(true);
    logQuickActivity(10, 50);
    showToast('Course Quiz completed! +50 Health Fund points credited!');
  };

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="pg">
      <div className="bcr">
        <Link href="/app/academy" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span>&larr;</span> Back to Academy
        </Link>
      </div>

      {/* Course Header */}
      <div className="card-box" style={{ margin: '16px 0 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
          <div className="flat-sq sq-blue" style={{ width: '52px', height: '52px', borderRadius: '16px' }}>
            <SvgIcon name={course[0] || 'book'} size={28} />
          </div>
          <div>
            <div className="sec-label">COURSE MODULE</div>
            <h1 style={{ fontSize: '28px', margin: '2px 0 4px', letterSpacing: '-0.02em' }}>{course[1]}</h1>
            <p className="muted" style={{ fontSize: '15px' }}>{course[2]}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', borderTop: '1px solid var(--ln)', paddingTop: '16px', marginTop: '16px', fontSize: '13px' }}>
          <span><b>{course[3]}</b> Lessons</span>
          <span><b>{course[4]}</b> Minutes reading</span>
          <span>Interactive Knowledge Check</span>
          <span style={{ color: 'var(--g)', fontWeight: 800 }}>+50 Pool Points Available</span>
        </div>
      </div>

      {/* Two columns: Course Content & Quiz */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Lesson Material */}
        <div className="card-box">
          <div className="sec-label">CURRICULUM MATERIAL</div>
          <h3 style={{ fontSize: '20px', margin: '2px 0 8px' }}>Lesson Notes &amp; Core Concepts</h3>
          <small className="muted" style={{ display: 'block', marginBottom: '14px' }}>Study the key takeaways before testing your retention</small>

          <div className="bd2" style={{ lineHeight: 1.7, fontSize: '15px' }}>
            <p>
              Evidence shows that sustainable lifestyle health relies on predictable daily micro-habits rather than sudden dramatic overhauls. When building a balanced diet or workout routine, aim for gradual habit stacking:
            </p>
            <ul style={{ paddingLeft: '20px', margin: '16px 0' }}>
              <li><b>The 50% Plate Rule:</b> Fill approximately half your plate with colorful vegetables and dietary fiber to stabilize blood sugar and gut microbiome biodiversity.</li>
              <li><b>Daily Step Anchoring:</b> Complete at least 20 minutes of moderate continuous walking per day to stimulate lymphatic circulation and cardiovascular elasticity.</li>
              <li><b>Sleep Synchronization:</b> Maintain consistent sleep and wake hours within a 30-minute window to align your circadian melatonin rhythm.</li>
            </ul>
            <p>
              Review the questions on the right to test your retention and claim your course reward credits.
            </p>
          </div>
        </div>

        {/* Interactive Quiz */}
        <div className="card-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div>
              <div className="sec-label">KNOWLEDGE CHECK</div>
              <h3 style={{ fontSize: '20px', margin: '2px 0 0' }}>Interactive Quiz</h3>
            </div>
            <span className="pill-tag" style={{ background: 'rgba(0,122,255,0.08)', color: '#007AFF' }}>
              Question {activeQuestion + 1} of {QZ.length}
            </span>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '36px 16px' }}>
              <div className="chk-circle" style={{ width: '56px', height: '56px', fontSize: '28px', margin: '0 auto 16px' }}>
                ✓
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Course Completed!</h3>
              <p className="muted" style={{ fontSize: '14px', marginBottom: '24px' }}>
                You scored well and reinforced vital health habits. +50 points have been added to your Health Fund balance.
              </p>
              <Link href="/app/academy" className="pill-btn pill-blue" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '42px', textDecoration: 'none' }}>
                Explore More Courses
              </Link>
            </div>
          ) : (
            <div>
              <p style={{ fontWeight: 700, fontSize: '16px', margin: '14px 0 18px', color: 'var(--tx)', lineHeight: 1.4 }}>
                {questionText}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {options.map((opt, i) => {
                  const userAns = selectedAnswers[activeQuestion];
                  const hasAnswered = userAns !== undefined;
                  const isSelected = userAns === i;
                  const isCorrect = i === correctIdx;

                  let bg = 'var(--sf)';
                  let border = 'var(--ln)';
                  let textColor = 'var(--tx)';

                  if (hasAnswered) {
                    if (isCorrect) {
                      bg = 'var(--mint)';
                      border = 'var(--g)';
                      textColor = 'var(--gd)';
                    } else if (isSelected && !isCorrect) {
                      bg = '#FEE2E2';
                      border = '#EF4444';
                      textColor = '#B91C1C';
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={hasAnswered}
                      onClick={() => handleSelectOption(i)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '16px',
                        background: bg,
                        border: `1.5px solid ${border}`,
                        color: textColor,
                        fontWeight: 600,
                        fontSize: '14px',
                        textAlign: 'left',
                        cursor: hasAnswered ? 'default' : 'pointer',
                        transition: 'all .2s'
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Navigation controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--ln)' }}>
                <button
                  className="pill-btn pill-outline"
                  disabled={activeQuestion === 0}
                  onClick={() => setActiveQuestion((q) => q - 1)}
                >
                  &larr; Previous
                </button>

                {activeQuestion < QZ.length - 1 ? (
                  <button
                    className="pill-btn pill-blue"
                    disabled={selectedAnswers[activeQuestion] === undefined}
                    onClick={() => setActiveQuestion((q) => q + 1)}
                  >
                    Next Question &rarr;
                  </button>
                ) : (
                  <button
                    className="pill-btn pill-green"
                    disabled={answeredCount < QZ.length}
                    onClick={handleFinishQuiz}
                  >
                    Finish &amp; Claim +50 pts
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
