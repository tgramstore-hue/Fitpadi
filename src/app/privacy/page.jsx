import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="pg">
      <div className="ph">
        <div className="w">
          <span className="eb">Legal</span>
          <h1 style={{ fontSize: 'clamp(34px, 5vw, 52px)' }}>Privacy Policy</h1>
          <p className="lead">Last updated: 1 November 2026</p>
        </div>
      </div>

      <article className="doc">
        <p>
          This Privacy Policy explains how FitPadi (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses and protects information when you use our website and web application.
        </p>

        <h2>1. Information we collect</h2>
        <ul>
          <li>Account information: name, email address, password hash.</li>
          <li>Activity and habit data: steps, workouts, lessons completed, challenges, points and referrals.</li>
          <li>Technical data: IP address, device, browser, and essential session identifiers.</li>
        </ul>

        <h2>2. How we use information</h2>
        <ul>
          <li>To provide, personalise and improve the Service.</li>
          <li>To operate points, challenges, referrals and community features.</li>
          <li>To communicate with you about your account and security.</li>
          <li>To detect and prevent fraud, abuse and security incidents.</li>
        </ul>

        <h2>3. Cookies and similar technologies</h2>
        <p>
          We use essential cookies that are needed to run the Service, and, with your consent where required by law, non-essential cookies for analytics and advertising.
        </p>

        <h2>4. Advertising and Google AdSense</h2>
        <p>
          We may use Google AdSense and other third-party advertising vendors to display ads. Third-party vendors use cookies to serve ads based on your visits to this and other websites. You can opt out of personalised advertising by visiting Google Ads Settings.
        </p>

        <h2>5. How we share information</h2>
        <p>
          We do not sell your personal information. We share it only with service providers who help us operate the platform under confidentiality terms, to comply with law, or with your consent.
        </p>

        <h2>6. Security</h2>
        <p>
          We use reasonable technical and organisational measures to protect information. No online service is completely secure, and you are responsible for keeping your password private.
        </p>

        <h2>7. Your rights and choices</h2>
        <p>
          You may access, update or correct your information in your <Link href="/app/settings" style={{ color: 'var(--g)', fontWeight: 600 }}>account settings</Link>, or request account deletion by emailing <a href="mailto:privacy@fitpadi.com" style={{ color: 'var(--g)', fontWeight: 600 }}>privacy@fitpadi.com</a>.
        </p>
      </article>
    </div>
  );
}
