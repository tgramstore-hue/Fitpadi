'use client';

import React, { useState } from 'react';
import SvgIcon from '../../components/SvgIcon.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function ContactPage() {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all fields');
      return;
    }
    setSent(true);
    showToast('Message sent. We will reply within two business days.');
  };

  return (
    <div className="pg">
      <div className="ph">
        <div className="w">
          <span className="eb">Contact</span>
          <h1 style={{ fontSize: 'clamp(34px, 5vw, 52px)' }}>We’d love to hear from you</h1>
        </div>
      </div>

      <section className="s">
        <div className="w two">
          <div>
            <h2 style={{ fontSize: '28px' }}>Get in touch</h2>
            <p className="muted" style={{ margin: '12px 0 22px' }}>
              Send us a question, suggestion or privacy request. We usually reply within two business days.
            </p>
            <p>
              <b>General support</b>
              <br />
              <span className="muted">support@fitpadi.com</span>
            </p>
            <p style={{ marginTop: '14px' }}>
              <b>Privacy requests</b>
              <br />
              <span className="muted">privacy@fitpadi.com</span>
            </p>
            <p style={{ marginTop: '14px' }}>
              <b>Location</b>
              <br />
              <span className="muted">Nigeria</span>
            </p>
          </div>

          <div className="wc">
            {sent ? (
              <div className="rv in" style={{ textAlign: 'center', padding: '30px 0' }}>
                <div
                  className="ico"
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: 'var(--g)',
                    color: '#fff',
                    display: 'grid',
                    placeItems: 'center',
                    margin: '0 auto 18px'
                  }}
                >
                  <SvgIcon name="chk" size={36} />
                </div>
                <h3>Message sent</h3>
                <p className="muted" style={{ marginTop: '8px' }}>
                  Thank you. We will reply within two business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="f" style={{ marginBottom: '16px' }}>
                  <label>Your name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="f" style={{ marginBottom: '16px' }}>
                  <label>Email address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="f" style={{ marginBottom: '16px' }}>
                  <label>Message</label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button className="btn" style={{ width: '100%' }}>
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
