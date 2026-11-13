import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="pg">
      <div className="ph">
        <div className="w">
          <span className="eb">Legal</span>
          <h1 style={{ fontSize: 'clamp(34px, 5vw, 52px)' }}>Terms of Service</h1>
          <p className="lead">Last updated: 1 November 2026</p>
        </div>
      </div>

      <article className="doc">
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the FitPadi website, application and related services (the &ldquo;Service&rdquo;). By accessing or using the Service, you agree to be bound by these Terms.
        </p>

        <h2>1. Eligibility and accounts</h2>
        <p>
          You must be at least 18 years old to use the Service. You are responsible for keeping your account credentials secure and for all activity under your account.
        </p>

        <h2>2. Nature of the Service (not medical advice)</h2>
        <p>
          FitPadi is an educational and wellness product. It is not a medical provider and does not provide diagnosis, treatment or clinical advice. Always consult a doctor or healthcare professional before making health changes or starting a new fitness programme.
        </p>

        <h2>3. Rewards, points and the Health Fund</h2>
        <ul>
          <li>Points and rewards are discretionary and depend on genuine, verified healthy activity.</li>
          <li>FitPadi reserves the right to review, withhold or cancel points where fraud, manipulation or multiple accounts are suspected.</li>
          <li>The FitPadi Health Fund is a finite community pool. Rewards end when the pool is depleted or expired.</li>
        </ul>

        <h2>4. Acceptable use</h2>
        <p>
          You agree not to misuse the Service, including by attempting to access it unlawfully, disrupting its operation, reverse engineering it, or submitting false activity data.
        </p>

        <h2>5. Intellectual property</h2>
        <p>
          The Service, including its text, design, graphics, logos and software, is owned by FitPadi or its licensors and is protected by copyright and other intellectual property laws.
        </p>

        <h2>6. Termination</h2>
        <p>
          You may stop using the Service and delete your account at any time in your <Link href="/app/settings" style={{ color: 'var(--g)', fontWeight: 600 }}>account settings</Link>. We may suspend or terminate accounts that violate these Terms.
        </p>

        <h2>7. Contact</h2>
        <p>
          If you have questions about these Terms, contact us at <a href="mailto:support@fitpadi.com" style={{ color: 'var(--g)', fontWeight: 600 }}>support@fitpadi.com</a>.
        </p>
      </article>
    </div>
  );
}
