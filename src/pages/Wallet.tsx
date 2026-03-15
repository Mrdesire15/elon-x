/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, History } from 'lucide-react';
import { User } from '../types';
import { formatCurrency } from '../utils';

interface WalletProps {
  user: User;
}

export default function Wallet({ user }: WalletProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">My Wallet</h1>
          <p className="text-white/40">Manage your funds and withdrawals.</p>
        </div>
        <button className="bg-brand-orange text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 orange-glow-hover transition-all">
          <ArrowUpRight size={20} />
          Withdraw Funds
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 space-y-4"
        >
          <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
            <WalletIcon size={24} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40">Available Balance</p>
            <p className="text-3xl font-bold mt-1">{formatCurrency(user.balance, user.preferredCurrency)}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 space-y-4"
        >
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
            <ArrowDownLeft size={24} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40">Total Invested</p>
            <p className="text-3xl font-bold mt-1">{formatCurrency(15000, user.preferredCurrency)}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 space-y-4"
        >
          <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40">Total Profit</p>
            <p className="text-3xl font-bold mt-1 text-emerald-500">+{formatCurrency(7500, user.preferredCurrency)}</p>
          </div>
        </motion.div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-bold flex items-center gap-2">
            <History size={18} className="text-brand-orange" />
            Recent Transactions
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-white/20 font-bold border-b border-white/5">
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { type: 'Deposit', amount: 5000, status: 'Completed', date: '2024-03-10' },
                { type: 'Withdrawal', amount: 1200, status: 'Pending', date: '2024-03-12' },
                { type: 'Profit', amount: 350, status: 'Completed', date: '2024-03-14' },
              ].map((tx, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-bold">{tx.type}</td>
                  <td className={`px-6 py-4 font-mono font-bold ${tx.type === 'Withdrawal' ? 'text-brand-orange' : 'text-emerald-500'}`}>
                    {tx.type === 'Withdrawal' ? '-' : '+'}{formatCurrency(tx.amount, user.preferredCurrency)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                      tx.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-brand-orange/10 text-brand-orange border-brand-orange/20'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/40 text-sm font-medium">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { TrendingUp } from 'lucide-react';
