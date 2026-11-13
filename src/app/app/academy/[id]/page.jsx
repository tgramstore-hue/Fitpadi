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
      showToast('Not quite, but great effort! Review the lesson below.');
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
        <Link href="/app/academy">&larr; Back to Academy</Link>
      </div>

      {/* Course Header */}
      <div style={{ background: 'var(--wh)', border: '1px solid var(--ln)', borderRadius: '24px', padding: '32px', margin: '16px 0 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
          <div className="lt" style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--mint)', color: 'var(--gd)' }}>
            <SvgIcon name={course[0]} size={28} />
          </div>
          <div>
            <h1 style={{ fontSize: '28px' }}>{course[1]}</h1>
            <p className="muted" style={{ fontSize: '15px' }}>{course[2]}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', borderTop: '1px solid var(--ln)', paddingTop: '18px', marginTop: '18px', fontSize: '14px' }}>
          <span><b>{course[3]}</b> Lessons</span>
          <span><b>{course[4]}</b> Minutes reading</span>
          <span>Interactive Knowledge Check</span>
          <span style={{ color: 'var(--g)', fontWeight: 700 }}>+50 Pool Points Available</span>
        </div>
      </div>

      {/* Two columns: Course Content & Quiz */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: '28px' }}>
        {/* Lesson Material */}
        <div className="pn">
          <div className="pt">
            <h3>Lesson Notes &amp; Core Concepts</h3>
            <small className="muted">Study before testing</small>
          </div>

          <div className="bd2" style={{ marginTop: '16px', lineHeight: 1.7, fontSize: '16px' }}>
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
        <div className="pn">
          <div className="pt">
            <h3>Interactive Quiz</h3>
            <small style={{ color: 'var(--g)', fontWeight: 700 }}>
              Question {activeQuestion + 1} of {QZ.length}
            </small>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '36px 16px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--mint)', color: 'var(--gd)', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
                <SvgIcon name="chk" size={32} />
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Course Completed!</h3>
              <p className="muted" style={{ fontSize: '15px', marginBottom: '24px' }}>
                You scored well and reinforced vital health habits. +50 points have been added to your Health Fund balance.
              </p>
              <Link href="/app/academy" className="btn sm" style={{ width: '100%' }}>
                Explore More Courses
              </Link>
            </div>
          ) : (
            <div>
              <p style={{ fontWeight: 600, fontSize: '17px', margin: '14px 0 20px', color: 'var(--tx)' }}>
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
                        padding: '14px 18px',
                        borderRadius: '14px',
                        background: bg,
                        border: `1.5px solid ${border}`,
                        color: textColor,
                        fontWeight: 600,
                        fontSize: '15px',
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
                  className="btn sm o"
                  disabled={activeQuestion === 0}
                  onClick={() => setActiveQuestion((q) => q - 1)}
                >
                  &larr; Previous
                </button>

                {activeQuestion < QZ.length - 1 ? (
                  <button
                    className="btn sm"
                    disabled={selectedAnswers[activeQuestion] === undefined}
                    onClick={() => setActiveQuestion((q) => q + 1)}
                  >
                    Next Question &rarr;
                  </button>
                ) : (
                  <button
                    className="btn sm"
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

