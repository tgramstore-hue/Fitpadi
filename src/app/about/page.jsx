import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="pg">
      <div className="ph">
        <div className="w">
          <span className="eb">About Us</span>
          <h1 style={{ fontSize: 'clamp(34px, 5vw, 52px)' }}>About FitPadi</h1>
          <p className="lead">
            Making healthy living achievable, enjoyable and rewarding for everyday people.
          </p>
        </div>
      </div>

      <article className="doc">
        <h2>Our mission</h2>
        <p>
          FitPadi exists to make healthy living feel achievable and rewarding. &ldquo;Padi&rdquo; is a friendly word for a companion, and that is the spirit of the product: a supportive companion that helps you build small, sustainable habits.
        </p>

        <h2>What we offer</h2>
        <p>
          FitPadi combines daily missions, guided programmes, a walking tracker, breathing exercises, health education articles and community challenges. People earn points for genuine healthy activity and can take part in friendly competitions.
        </p>
        <p>
          We are starting in Nigeria, with plans to support Ghana, Cameroon, South Africa and other markets.
        </p>

        <h2>How we create content</h2>
        <p>
          Our articles and lessons are written in plain language and are designed to be educational. We aim to reflect widely accepted public health guidance, we avoid claims that anything prevents, diagnoses or cures disease, and we encourage readers to speak to qualified professionals about their own situation.
        </p>

        <h2>How we are funded</h2>
        <p>
          FitPadi is free to use. We may display advertising, which is always labelled and kept separate from our own interface. We never place ads next to exercise controls, and we never reward anyone for viewing or clicking ads.
        </p>

        <h2>Get in touch</h2>
        <p>
          Questions or feedback? Visit our <Link href="/contact" style={{ color: 'var(--g)', fontWeight: 600 }}>contact page</Link> and we will be happy to help.
        </p>

        <div className="band rv" style={{ marginTop: '48px' }}>
          <h2>Start your healthier routine today</h2>
          <p>Join FitPadi for free and take the first step.</p>
          <Link className="btn wt" href="/signup">
            Create free account
          </Link>
        </div>
      </article>
    </div>
  );
}
