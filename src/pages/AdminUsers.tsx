/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, UserPlus, MoreVertical, Shield, CreditCard, Ban, X } from 'lucide-react';
import { User } from '../types';
import { formatCurrency } from '../utils';

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [topUpAmount, setTopUpAmount] = useState('');

  // Mock users
  const users: User[] = [
    { uid: '1', email: 'user1@example.com', displayName: 'John Doe', balance: 1250, preferredCurrency: 'USD', role: 'user' },
    { uid: '2', email: 'user2@example.com', displayName: 'Jane Smith', balance: 5000, preferredCurrency: 'EUR', role: 'user' },
    { uid: '3', email: 'admin@elonx.com', displayName: 'Admin One', balance: 0, preferredCurrency: 'USD', role: 'admin' },
  ];

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTopUp = () => {
    if (selectedUser && topUpAmount) {
      // Use a custom modal or toast instead of alert
      console.log(`Successfully topped up ${selectedUser.displayName} with $${topUpAmount}`);
      setSelectedUser(null);
      setTopUpAmount('');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight font-display uppercase italic">User Management</h1>
          <p className="text-white/40 mt-1">View and manage all registered users on the platform.</p>
        </div>
        <button className="bg-brand-orange text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-[1.02] transition-all orange-glow-hover">
          <UserPlus size={20} />
          <span>Add New User</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-brand-dark border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-orange transition-all"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-brand-dark border border-white/5 rounded-3xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">User</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Status</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Balance (USD)</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Role</th>
              <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-white/40 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredUsers.map((user) => (
              <tr key={user.uid} className="hover:bg-white/5 transition-colors group">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange font-bold">
                      {user.displayName?.[0] || user.email[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold">{user.displayName || 'Unnamed User'}</p>
                      <p className="text-xs text-white/40">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase rounded-full border border-emerald-500/20">Active</span>
                </td>
                <td className="p-6 font-mono font-bold">
                  {formatCurrency(user.balance, 'USD')}
                </td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
                    user.role === 'admin' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-all text-white/40 hover:text-brand-orange"
                      title="Top-up Balance"
                    >
                      <CreditCard size={18} />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-all text-white/40 hover:text-red-400" title="Suspend User">
                      <Ban size={18} />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-all text-white/40 hover:text-white">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top-up Modal */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-brand-dark border border-white/10 rounded-3xl p-8 max-w-md w-full space-y-8 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold font-display">Manual Top-up</h3>
                <button onClick={() => setSelectedUser(null)} className="text-white/40 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange font-bold text-xl">
                  {selectedUser.displayName?.[0] || selectedUser.email[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-bold">{selectedUser.displayName}</p>
                  <p className="text-xs text-white/40">{selectedUser.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Amount to Credit (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-orange font-bold text-xl">$</span>
                  <input
                    type="number"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-brand-black border border-white/10 rounded-xl py-4 pl-10 pr-4 text-xl font-bold focus:outline-none focus:border-brand-orange transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 py-4 rounded-xl font-bold text-white/40 hover:bg-white/5 transition-all uppercase tracking-widest text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTopUp}
                  className="flex-1 py-4 bg-brand-orange text-black rounded-xl font-bold hover:scale-[1.02] transition-all orange-glow-hover uppercase tracking-widest text-xs"
                >
                  Confirm Top-up
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
