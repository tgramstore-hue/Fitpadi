'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SvgIcon from '../../../components/SvgIcon.jsx';
import { useApp } from '../../../context/AppContext.jsx';
import { FUND } from '../../../data/appData.js';

export default function RewardsPage() {
  const { cash, points, history, showToast } = useApp();
  const [method, setMethod] = useState('USDT');
  const [amount, setAmount] = useState('10.00');
  const [destination, setDestination] = useState('');
  const [showIneligibleModal, setShowIneligibleModal] = useState(false);

  const poolTotal = FUND.pool || 500000000;
  const paidOut = FUND.paid || 18420000;
  const pctDistributed = ((paidOut / poolTotal) * 100).toFixed(1);

  const handleWithdrawClick = (e) => {
    e.preventDefault();
    if (!destination.trim()) {
      showToast('Please enter your payout destination (wallet address or bank details)');
      return;
    }
    // As requested: users can enter details, but are informed they are currently not eligible
    setShowIneligibleModal(true);
  };

  return (
    <div className="gr">
      {/* 4 KPIs with authentic brand colors */}
      <div className="kp s3" style={{ '--c': '#16A34A' }}>
        <span className="ki">
          <SvgIcon name="wallet" size={22} />
        </span>
        <div>
          <small>Available cash</small>
          <b>${cash.toFixed(2)}</b>
          <em>Health Fund balance</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#D97706' }}>
        <span className="ki">
          <SvgIcon name="coin" size={22} />
        </span>
        <div>
          <small>Pending</small>
          <b>$3.00</b>
          <em>Next payout cycle</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#2563EB' }}>
        <span className="ki">
          <SvgIcon name="act" size={22} />
        </span>
        <div>
          <small>Lifetime earned</small>
          <b>${(cash + 14.5).toFixed(2)}</b>
          <em>Total member rewards</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#6D3AE8' }}>
        <span className="ki">
          <SvgIcon name="trophy" size={22} />
        </span>
        <div>
          <small>Points balance</small>
          <b>{(2450 + points - 240).toLocaleString()}</b>
          <em>Convertible in cycles</em>
        </div>
      </div>

      {/* Withdraw Cash Card (span 8) */}
      <div className="pn s8">
        <div className="pt">
          <div>
            <h3>Withdraw cash</h3>
            <small className="muted">Direct disbursement from the $500M Health Fund</small>
          </div>
          <Link href="/app/rewards/withdraw" className="btn sm o">
            Full withdrawal page &rarr;
          </Link>
        </div>

        {/* Ineligibility Warning Alert */}
        <div
          style={{
            margin: '14px 0 20px',
            padding: '14px 18px',
            borderRadius: '16px',
            background: '#FEF3C7',
            border: '1.5px solid #F59E0B',
            color: '#92400E',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}
        >
          <span style={{ fontSize: '20px', lineHeight: 1 }}>⚠️</span>
          <div>
            <b style={{ display: 'block', fontSize: '15px', marginBottom: '2px' }}>
              Tier 1 Account — Withdrawal Locked (Pending Verification)
            </b>
            <span>
              You can save your payout credentials below. However, cash withdrawals require a 14-day consistency streak and KYC Tier 2 approval before funds unlock.
            </span>
          </div>
        </div>

        {/* Payment Rail Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <div
            className={`opt ${method === 'USDT' ? 'on' : ''}`}
            onClick={() => setMethod('USDT')}
          >
            <SvgIcon name="wallet" size={22} />
            <div>
              <b>USDT (TRC-20)</b>
              <small className="muted" style={{ display: 'block', fontSize: '12px' }}>
                Instant · Zero network fee
              </small>
            </div>
          </div>

          <div
            className={`opt ${method === 'Bank' ? 'on' : ''}`}
            onClick={() => setMethod('Bank')}
          >
            <SvgIcon name="users" size={22} />
            <div>
              <b>Nigerian Bank Transfer</b>
              <small className="muted" style={{ display: 'block', fontSize: '12px' }}>
                NGN direct · 1–2 hours
              </small>
            </div>
          </div>
        </div>

        {/* Withdrawal Form */}
        <form onSubmit={handleWithdrawClick}>
          <div style={{ marginBottom: '14px' }}>
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
              {[5, 10, 'Max'].map((val) => (
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

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>
              {method === 'USDT' ? 'USDT TRC-20 Wallet Address' : 'Bank Name & Account Number'}
            </label>
            <input
              type="text"
              placeholder={method === 'USDT' ? 'e.g. TR7NHcorqTeJQNYWZ71X...' : 'e.g. Access Bank - 0123456789 - David Okon'}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button className="btn" type="submit">
              Request Withdrawal (${parseFloat(amount || '0').toFixed(2)})
            </button>
            <Link href="/app/rewards/withdraw" className="lk" style={{ fontSize: '14px' }}>
              View qualification requirements &rarr;
            </Link>
          </div>
        </form>
      </div>

      {/* Health Fund Info (span 4) */}
      <div className="pn s4">
        <div className="pt">
          <h3>Health Fund status</h3>
        </div>
        <p className="muted" style={{ fontSize: '14px', lineHeight: 1.5 }}>
          Rewards come from the community Health Fund pool backed by transparent health partners and donors.
        </p>

        <div style={{ margin: '20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
            <span>Fund Distributed</span>
            <b style={{ color: 'var(--g)' }}>{pctDistributed}%</b>
          </div>
          <div className="pgb">
            <i style={{ width: `${pctDistributed}%` }} />
          </div>
          <small className="muted" style={{ display: 'block', marginTop: '6px' }}>
            ${paidOut.toLocaleString()} of ${poolTotal.toLocaleString()} pool
          </small>
        </div>

        <div
          style={{
            background: 'var(--sf)',
            borderRadius: '16px',
            padding: '16px',
            border: '1px solid var(--ln)'
          }}
        >
          <b style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>
            $500 Million Global Allocation
          </b>
          <p className="muted" style={{ fontSize: '13px', margin: 0 }}>
            Distributions unlock every 30 days for members with verified streaks and completed missions.
          </p>
        </div>

        <div className="note" style={{ margin: '14px 0 0' }}>
          <p style={{ fontSize: '13px' }}>
            Points reset monthly into payout cycles. Maintain your 7+ day streak to climb the disbursement tiers!
          </p>
        </div>
      </div>

      {/* Transaction History (span 12) */}
      <div className="pn s12">
        <div className="pt">
          <h3>Payout &amp; reward history</h3>
        </div>

        <div className="feed">
          {history.map((tx, idx) => (
            <div key={idx} className="it">
              <span
                className="ico"
                style={{
                  margin: 0,
                  width: '42px',
                  height: '42px',
                  borderRadius: '13px',
                  background: 'var(--mint)',
                  color: 'var(--gd)',
                  display: 'grid',
                  placeItems: 'center'
                }}
              >
                <SvgIcon name={tx[1].startsWith('−') ? 'wallet' : 'coin'} size={20} />
              </span>
              <div style={{ flex: 1 }}>
                <b>{tx[0]}</b>
                <div className="muted" style={{ fontSize: '13px' }}>
                  {tx[2]} · Verified ledger
                </div>
              </div>
              <b style={{ color: tx[1].startsWith('−') ? 'var(--tx)' : 'var(--g)' }}>
                {tx[1]}
              </b>
            </div>
          ))}
        </div>
      </div>

      {/* Ineligibility Modal */}
      {showIneligibleModal && (
        <div className="md" onClick={() => setShowIneligibleModal(false)}>
          <div className="mc" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <button
              className="cl"
              aria-label="Close"
              onClick={() => setShowIneligibleModal(false)}
            >
              <SvgIcon name="close" size={20} />
            </button>

            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#FEF3C7',
                color: '#D97706',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 16px'
              }}
            >
              <SvgIcon name="shield" size={32} />
            </div>

            <h2 style={{ textAlign: 'center', fontSize: '24px' }}>
              Withdrawal Locked: Ineligible
            </h2>
            <p className="muted" style={{ textAlign: 'center', margin: '8px 0 20px', fontSize: '15px' }}>
              Your payout destination ({method}) has been noted, but your account is currently not eligible for instant cash-out from the <b>$500,000,000 Health Fund</b>.
            </p>

            <div
              style={{
                background: 'var(--sf)',
                border: '1px solid var(--ln)',
                borderRadius: '16px',
                padding: '16px 20px',
                marginBottom: '20px'
              }}
            >
              <b style={{ display: 'block', marginBottom: '10px', fontSize: '14px' }}>
                Eligibility Requirements Checklist:
              </b>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#EF4444' }}>❌</span>
                  <span>14-day consecutive active streak (Current: <b>7 days</b>)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#EF4444' }}>❌</span>
                  <span>Identity verification (KYC Tier 2 pending submission)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#EF4444' }}>❌</span>
                  <span>Minimum 3,000 activity points (Current: <b>2,450 pts</b>)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#F59E0B' }}>⏳</span>
                  <span>Next pool disbursement cycle: <b>18 days remaining</b></span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Link
                href="/app/rewards/withdraw"
                className="btn"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => setShowIneligibleModal(false)}
              >
                Go to Withdrawal Portal
              </Link>
              <button
                className="btn o"
                style={{ flex: 1 }}
                onClick={() => setShowIneligibleModal(false)}
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
