import React from 'react';
import Link from 'next/link';

export default function DisclaimerPage() {
  return (
    <div className="pg">
      <div className="ph">
        <div className="w">
          <span className="eb">Legal</span>
          <h1 style={{ fontSize: 'clamp(34px, 5vw, 52px)' }}>Health &amp; Ad Disclaimer</h1>
          <p className="lead">Last updated: 1 November 2026</p>
        </div>
      </div>

      <article className="doc">
        <h2>Health and fitness disclaimer</h2>
        <p>
          The content on FitPadi, including programmes, exercises, lessons, calculators and advice, is for general informational and educational purposes only. It is not intended to be medical advice, diagnosis or treatment.
        </p>
        <p>
          Always seek the advice of a physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay seeking it because of something you have read on FitPadi.
        </p>
        <p>
          Physical exercise involves risk of injury. Start slowly, listen to your body, and stop immediately if you experience pain, dizziness, nausea, shortness of breath, or discomfort.
        </p>

        <div className="note">
          <p>
            <b>Safety reminder:</b> If you think you may have a medical emergency, call your local emergency services or doctor immediately.
          </p>
        </div>

        <h2>Advertising and sponsorship disclaimer</h2>
        <p>
          FitPadi is a free service supported by advertising and sponsorships. Advertisements and sponsored content are clearly labelled as &ldquo;Advertisement&rdquo; or &ldquo;Sponsored&rdquo;.
        </p>
        <p>
          The presence of an ad on FitPadi does not constitute an endorsement, recommendation or guarantee of the advertised product or service. FitPadi does not endorse any specific tests, physicians, products, procedures, opinions or other information that may be mentioned on the site.
        </p>

        <h2>Rewards disclaimer</h2>
        <p>
          Participation in FitPadi reward programmes, daily missions and community challenges is subject to our <Link href="/terms" style={{ color: 'var(--g)', fontWeight: 600 }}>Terms of Service</Link>. Rewards are not guaranteed, require verified activity, and are funded from a finite pool.
        </p>
      </article>
    </div>
  );
}
