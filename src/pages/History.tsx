/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { History as HistoryIcon, Search, Filter, Download } from 'lucide-react';
import { User } from '../types';
import { formatCurrency } from '../utils';

interface HistoryProps {
  user: User;
}

export default function History({ user }: HistoryProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">Investment History</h1>
          <p className="text-white/40">View all your past investments and returns.</p>
        </div>
        <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/10 transition-all">
          <Download size={20} />
          Export Data
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full bg-brand-dark border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-orange transition-all"
          />
        </div>
        <button className="bg-brand-dark border border-white/10 px-6 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-white/5 transition-all">
          <Filter size={20} className="text-brand-orange" />
          Filter
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-white/20 font-bold border-b border-white/5">
                <th className="px-6 py-4">Investment ID</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Profit Earned</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { id: 'INV-8821', amount: 10000, profit: 5000, status: 'Active', date: '2024-02-15' },
                { id: 'INV-7742', amount: 5000, profit: 2500, status: 'Completed', date: '2024-01-10' },
                { id: 'INV-6631', amount: 2500, profit: 1250, status: 'Completed', date: '2023-12-05' },
                { id: 'INV-5520', amount: 1000, profit: 500, status: 'Completed', date: '2023-11-20' },
              ].map((inv, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-mono text-sm text-brand-orange font-bold">{inv.id}</td>
                  <td className="px-6 py-4 font-bold">{formatCurrency(inv.amount, user.preferredCurrency)}</td>
                  <td className="px-6 py-4 font-bold text-emerald-500">+{formatCurrency(inv.profit, user.preferredCurrency)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                      inv.status === 'Active' ? 'bg-brand-orange/10 text-brand-orange border-brand-orange/20' : 'bg-white/5 text-white/40 border-white/10'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/40 text-sm font-medium">{inv.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
