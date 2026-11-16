'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SvgIcon from '../../../../components/SvgIcon.jsx';
import { useApp } from '../../../../context/AppContext.jsx';
import { FUND } from '../../../../data/appData.js';

export default function DedicatedWithdrawalPage() {
  const { cash, points, streak, showToast } = useApp();
  const [method, setMethod] = useState('USDT');
  const [amount, setAmount] = useState('10.00');
  const [usdtAddress, setUsdtAddress] = useState('');
  const [bankName, setBankName] = useState('Access Bank');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const poolTotal = FUND.pool || 500000000;
  const paidOut = FUND.paid || 18420000;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (method === 'USDT' && !usdtAddress.trim()) {
      showToast('Please enter your TRC-20 wallet address');
      return;
    }
    if (method === 'Bank' && (!accountNumber.trim() || !accountName.trim())) {
      showToast('Please enter your account number and name');
      return;
    }
    setSubmittedNotice(true);
    showToast('Payout details registered! Status: Verification Pending (Ineligible)');
  };

  return (
    <div className="gr">
      {/* Top Banner Navigation */}
      <div className="pn s12" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link href="/app/rewards" className="btn sm o">
              &larr; Back to Rewards
            </Link>
            <h2 style={{ fontSize: '24px', margin: 0 }}>
              Health Fund Withdrawal Portal
            </h2>
          </div>
          <small className="muted" style={{ display: 'block', marginTop: '6px' }}>
            Direct cash disbursement system powered by the $500,000,000 FitPadi Health Fund pool
          </small>
        </div>

        <span
          className="pp2"
          style={{
            background: '#FEF3C7',
            color: '#B45309',
            border: '1px solid #FCD34D',
            padding: '6px 14px',
            fontSize: '13px'
          }}
        >
          Status: Ineligible (Tier 1 Member)
        </span>
      </div>

      {/* 4 KPIs */}
      <div className="kp s3" style={{ '--c': '#16A34A' }}>
        <span className="ki">
          <SvgIcon name="wallet" size={22} />
        </span>
        <div>
          <small>Available Balance</small>
          <b>${cash.toFixed(2)}</b>
          <em>Ready upon unlock</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#D97706' }}>
        <span className="ki">
          <SvgIcon name="coin" size={22} />
        </span>
        <div>
          <small>Pending Payout</small>
          <b>$3.00</b>
          <em>Clearing next cycle</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#2563EB' }}>
        <span className="ki">
          <SvgIcon name="trophy" size={22} />
        </span>
        <div>
          <small>Current Points</small>
          <b>{(2450 + points - 240).toLocaleString()}</b>
          <em>Goal: 3,000 pts</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#0F766E' }}>
        <span className="ki">
          <SvgIcon name="shield" size={22} />
        </span>
        <div>
          <small>Total Pool Size</small>
          <b>$500,000,000</b>
          <em>${(paidOut / 1000000).toFixed(2)}M disbursed</em>
        </div>
      </div>

      {/* Left Column: Withdrawal Form (span 7) */}
      <div className="pn s7">
        <div className="pt">
          <h3>Request Payout</h3>
          <small className="muted">Minimum withdrawal: $5.00</small>
        </div>

        {submittedNotice && (
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '16px',
              background: '#EFF6FF',
              border: '1.5px solid #3B82F6',
              marginBottom: '20px',
              color: '#1E40AF',
              fontSize: '14px'
            }}
          >
            <b>✓ Payout Destination Saved!</b>
            <p style={{ margin: '4px 0 0', fontSize: '13px', lineHeight: 1.5 }}>
              Your {method} details have been bound to your FitPadi account. Your withdrawal request of ${parseFloat(amount).toFixed(2)} is queued. Once your 14-day streak and KYC Tier 2 are verified, disbursements will execute automatically.
            </p>
          </div>
        )}

        {/* Method selection */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
          <div
            className={`opt ${method === 'USDT' ? 'on' : ''}`}
            onClick={() => setMethod('USDT')}
          >
            <SvgIcon name="wallet" size={22} />
            <div>
              <b>USDT (TRC-20)</b>
              <small className="muted" style={{ display: 'block', fontSize: '12px' }}>
                Crypto wallet · TRON network
              </small>
            </div>
          </div>

          <div
            className={`opt ${method === 'Bank' ? 'on' : ''}`}
            onClick={() => setMethod('Bank')}
          >
            <SvgIcon name="users" size={22} />
            <div>
              <b>Nigerian Bank</b>
              <small className="muted" style={{ display: 'block', fontSize: '12px' }}>
                Direct NGN bank transfer
              </small>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Amount field */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>
              Withdrawal Amount (USD)
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="number"
                step="0.01"
                min="5"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ flex: 1 }}
              />
              {[5, 10, 20, 'Max'].map((val) => (
                <button
                  type="button"
                  key={val}
                  className="btn sm o"
                  onClick={() => setAmount(val === 'Max' ? cash.toFixed(2) : Number(val).toFixed(2))}
                >
                  {val === 'Max' ? 'Max' : `$${val}`}
                </button>
              ))}
            </div>
          </div>

          {method === 'USDT' ? (
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>
                USDT TRC-20 Destination Address
              </label>
              <input
                type="text"
                placeholder="T..."
                value={usdtAddress}
                onChange={(e) => setUsdtAddress(e.target.value)}
                required
              />
              <small className="muted" style={{ display: 'block', marginTop: '4px', fontSize: '12px' }}>
                Ensure your wallet supports TRC-20 (TRON). Do not send to ERC-20 or BEP-20 addresses.
              </small>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>
                  Select Bank
                </label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '14px',
                    border: '1.5px solid var(--ln)',
                    background: 'var(--wh)',
                    color: 'var(--tx)',
                    fontFamily: 'inherit',
                    fontSize: '15px'
                  }}
                >
                  <option value="Access Bank">Access Bank</option>
                  <option value="GTBank">Guaranty Trust Bank (GTBank)</option>
                  <option value="Zenith Bank">Zenith Bank</option>
                  <option value="First Bank">First Bank of Nigeria</option>
                  <option value="UBA">United Bank for Africa (UBA)</option>
                  <option value="Kuda Bank">Kuda Microfinance Bank</option>
                  <option value="OPay">OPay Digital Services</option>
                  <option value="Palmpay">Palmpay</option>
                </select>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>
                  10-Digit Account Number
                </label>
                <input
                  type="text"
                  maxLength="10"
                  placeholder="0123456789"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>
                  Account Holder Full Name
                </label>
                <input
                  type="text"
                  placeholder="Must match your verified government ID"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button className="btn" type="submit">
              Submit Withdrawal Request (${parseFloat(amount || '0').toFixed(2)})
            </button>
            <span className="muted" style={{ fontSize: '13px' }}>
              Pending verification checks
            </span>
          </div>
        </form>
      </div>

      {/* Right Column: Eligibility Checklist & Verification Progress (span 5) */}
      <div className="pn s5">
        <div className="pt">
          <h3>Eligibility Criteria</h3>
          <span className="pp2" style={{ background: '#FEF3C7', color: '#92400E' }}>
            2 of 5 Met
          </span>
        </div>

        <p className="muted" style={{ fontSize: '13px', lineHeight: 1.5 }}>
          To prevent Sybil attacks and reward authentic healthy habits, the $500,000,000 Health Fund enforces strict milestone gates before cash can be disbursed.
        </p>

        {/* Progress bar */}
        <div style={{ margin: '16px 0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
            <span>Account Unlock Progress</span>
            <b>40%</b>
          </div>
          <div className="pgb">
            <i style={{ width: '40%' }} />
          </div>
        </div>

        {/* Requirements items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ color: '#16A34A', fontSize: '16px' }}>✓</span>
            <div>
              <b>Email &amp; Account Setup Verified</b>
              <small className="muted" style={{ display: 'block', fontSize: '12px' }}>
                Basic member registration completed
              </small>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ color: '#16A34A', fontSize: '16px' }}>✓</span>
            <div>
              <b>Payout Destination Bound</b>
              <small className="muted" style={{ display: 'block', fontSize: '12px' }}>
                TRC-20 wallet or bank linked to profile
              </small>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ color: '#EF4444', fontSize: '16px' }}>✕</span>
            <div>
              <b>14-Day Consistency Streak</b>
              <small className="muted" style={{ display: 'block', fontSize: '12px' }}>
                Current streak: <b>{streak} of 14 days</b> (7 days remaining)
              </small>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ color: '#EF4444', fontSize: '16px' }}>✕</span>
            <div>
              <b>3,000 Verified Activity Points</b>
              <small className="muted" style={{ display: 'block', fontSize: '12px' }}>
                Current points: <b>{(2450 + points - 240).toLocaleString()} / 3,000 pts</b>
              </small>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ color: '#F59E0B', fontSize: '16px' }}>⏳</span>
            <div>
              <b>KYC Tier 2 Identity Verification</b>
              <small className="muted" style={{ display: 'block', fontSize: '12px' }}>
                Verification opens once 14-day streak is achieved
              </small>
            </div>
          </div>
        </div>

        <div className="note" style={{ marginTop: '20px' }}>
          <p style={{ fontSize: '13px' }}>
            <b>Distribution Window:</b> The next $500M community pool release window begins in <b>18 days</b>. Continue logging daily walks and completing missions to qualify!
          </p>
        </div>
      </div>

      {/* Bottom Section: Health Fund Transparency & FAQs (span 12) */}
      <div className="pn s12">
        <div className="pt">
          <h3>Frequently Asked Questions about Health Fund Payouts</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '10px' }}>
          <div style={{ background: 'var(--sf)', padding: '18px', borderRadius: '16px' }}>
            <b style={{ fontSize: '15px', display: 'block', marginBottom: '6px' }}>
              Where do the rewards come from?
            </b>
            <p className="muted" style={{ fontSize: '13px', margin: 0, lineHeight: 1.5 }}>
              The rewards are disbursed from the dedicated $500,000,000 FitPadi Health Fund, endowed to incentivize health longevity and preventative lifestyle habits in Nigeria and Africa.
            </p>
          </div>

          <div style={{ background: 'var(--sf)', padding: '18px', borderRadius: '16px' }}>
            <b style={{ fontSize: '15px', display: 'block', marginBottom: '6px' }}>
              Why is my account currently ineligible?
            </b>
            <p className="muted" style={{ fontSize: '13px', margin: 0, lineHeight: 1.5 }}>
              Eligibility requires a 14-day consecutive active streak and 3,000 activity points. This ensures rewards are distributed only to authentic community members building genuine daily routines.
            </p>
          </div>

          <div style={{ background: 'var(--sf)', padding: '18px', borderRadius: '16px' }}>
            <b style={{ fontSize: '15px', display: 'block', marginBottom: '6px' }}>
              How fast are approved withdrawals paid?
            </b>
            <p className="muted" style={{ fontSize: '13px', margin: 0, lineHeight: 1.5 }}>
              USDT (TRC-20) transfers process instantly with zero network fees. Nigerian bank transfers disburse within 1 to 2 business hours during payout windows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

