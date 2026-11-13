'use client';

import React, { useState } from 'react';
import SvgIcon from '../../../components/SvgIcon.jsx';
import { useApp } from '../../../context/AppContext.jsx';

export default function RewardsPage() {
  const { cash, points, history, requestWithdrawal, showToast } = useApp();
  const [method, setMethod] = useState('USDT');
  const [destination, setDestination] = useState('');

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (cash < 10) {
      showToast('Minimum withdrawal is $10.00');
      return;
    }
    if (!destination.trim()) {
      showToast('Please enter your wallet address or bank account');
      return;
    }
    const success = requestWithdrawal(10, method, destination);
    if (success) {
      setDestination('');
    }
  };

  return (
    <div className="gr">
      {/* 4 KPIs with authentic colors */}
      <div className="kp s3" style={{ '--c': '#16A34A' }}>
        <span className="ki">
          <SvgIcon name="wallet" size={22} />
        </span>
        <div>
          <small>Available cash</small>
          <b>${cash.toFixed(2)}</b>
          <em>Ready to withdraw</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#D97706' }}>
        <span className="ki">
          <SvgIcon name="coin" size={22} />
        </span>
        <div>
          <small>Pending</small>
          <b>$3.00</b>
          <em>Clearing soon</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#2563EB' }}>
        <span className="ki">
          <SvgIcon name="act" size={22} />
        </span>
        <div>
          <small>Lifetime earned</small>
          <b>${(cash + 14.5).toFixed(2)}</b>
          <em>Total rewards</em>
        </div>
      </div>

      <div className="kp s3" style={{ '--c': '#6D3AE8' }}>
        <span className="ki">
          <SvgIcon name="trophy" size={22} />
        </span>
        <div>
          <small>Points balance</small>
          <b>{(2450 + points - 240).toLocaleString()}</b>
          <em>From habits</em>
        </div>
      </div>

      {/* Withdraw Cash (span 8) */}
      <div className="pn s8">
        <div className="pt">
          <h3>Withdraw cash</h3>
        </div>
        <p className="muted" style={{ marginBottom: '18px', fontSize: '15px' }}>
          Convert earned cash into crypto or Nigerian bank transfer. Minimum withdrawal: $10.00.
        </p>

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
              <b>Nigerian Bank</b>
              <small className="muted" style={{ display: 'block', fontSize: '12px' }}>
                NGN direct · 1–2 hours
              </small>
            </div>
          </div>
        </div>

        <form onSubmit={handleWithdraw}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>
              {method === 'USDT' ? 'USDT TRC-20 Wallet Address' : 'Bank Name & Account Number'}
            </label>
            <div className="fi">
              <input
                type="text"
                placeholder={method === 'USDT' ? 'T...' : 'e.g. Access Bank - 0123456789'}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button className="btn" disabled={cash < 10}>
              Withdraw $10.00
            </button>
            <span className="muted" style={{ fontSize: '14px' }}>
              {cash < 10 ? `Need $${(10 - cash).toFixed(2)} more to reach threshold` : 'Eligible for instant withdrawal'}
            </span>
          </div>
        </form>
      </div>

      {/* Health Fund Info (span 4) */}
      <div className="pn s4">
        <div className="pt">
          <h3>Health Fund status</h3>
        </div>
        <p className="muted" style={{ fontSize: '14px', lineHeight: 1.5 }}>
          Rewards come from the community Health Fund pool backed by transparent health partners.
        </p>

        <div style={{ margin: '20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
            <span>Fund Distributed</span>
            <b style={{ color: 'var(--g)' }}>4.2%</b>
          </div>
          <div className="pgb">
            <i style={{ width: '4.2%' }} />
          </div>
          <small className="muted" style={{ display: 'block', marginTop: '6px' }}>
            $420,000 of $10,000,000 pool
          </small>
        </div>

        <div className="note" style={{ margin: '14px 0 0' }}>
          <p style={{ fontSize: '13px' }}>
            Points reset monthly into raffle and payout cycles. Keep your streak active to maximize earnings!
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
    </div>
  );
}
