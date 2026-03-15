/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, ExternalLink, Search } from 'lucide-react';
import { Withdrawal } from '../types';
import { formatCurrency } from '../utils';

export default function AdminWithdrawals() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  // Mock withdrawals
  const withdrawals: Withdrawal[] = [
    { id: '1', userId: '1', amount: 500, walletAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', status: 'pending', createdAt: '2024-03-14T10:00:00Z' },
    { id: '2', userId: '2', amount: 1200, walletAddress: 'bc1p5d7rjq7uhv6vyd3u0a3s8t0u0a3s8t0u0a3s8t', status: 'completed', createdAt: '2024-03-13T15:30:00Z', processedAt: '2024-03-13T16:00:00Z' },
    { id: '3', userId: '1', amount: 50, walletAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', status: 'rejected', createdAt: '2024-03-12T09:00:00Z', reason: 'Invalid wallet address format' },
  ];

  const filteredWithdrawals = withdrawals.filter(w => filter === 'all' || w.status === filter);

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    console.log(`${action.toUpperCase()} withdrawal ${id}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight font-display uppercase italic">Withdrawal Requests</h1>
        <p className="text-white/40 mt-1">Review and process user withdrawal requests manually.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 p-1 bg-brand-dark border border-white/5 rounded-xl w-fit">
        {['all', 'pending', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
              filter === f ? 'bg-brand-orange text-black orange-glow' : 'text-white/40 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Withdrawals List */}
      <div className="space-y-4">
        {filteredWithdrawals.map((w) => (
          <div key={w.id} className="bg-brand-dark border border-white/5 p-6 rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-white/10 transition-all">
            <div className="flex items-center gap-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                w.status === 'pending' ? 'bg-brand-orange/10 text-brand-orange border-brand-orange/20' : 
                w.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
              }`}>
                {w.status === 'pending' ? <Clock size={24} /> : 
                 w.status === 'completed' ? <CheckCircle size={24} /> : <XCircle size={24} />}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold">{formatCurrency(w.amount, 'USD')}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                    w.status === 'pending' ? 'bg-brand-orange/10 text-brand-orange border-brand-orange/20' : 
                    w.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                  }`}>
                    {w.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-white/40">
                  <code className="text-xs bg-brand-black/50 px-2 py-0.5 rounded border border-white/5">{w.walletAddress}</code>
                  <ExternalLink size={14} className="hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="text-right lg:mr-8">
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Requested On</p>
                <p className="text-sm font-mono font-bold">{new Date(w.createdAt).toLocaleDateString()}</p>
              </div>
              
              {w.status === 'pending' && (
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleAction(w.id, 'reject')}
                    className="flex-1 sm:flex-none px-6 py-3 border border-red-500/20 text-red-500 rounded-xl font-bold hover:bg-red-500/10 transition-all uppercase tracking-widest text-xs"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction(w.id, 'approve')}
                    className="flex-1 sm:flex-none px-6 py-3 bg-emerald-500 text-black rounded-xl font-bold hover:scale-[1.02] transition-all uppercase tracking-widest text-xs"
                  >
                    Approve
                  </button>
                </div>
              )}

              {w.status === 'rejected' && w.reason && (
                <p className="text-xs text-red-400 italic font-medium">Reason: {w.reason}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
