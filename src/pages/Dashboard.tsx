/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Wallet, DollarSign, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchBitcoinPrices } from '../services/priceService';
import { Currency, User } from '../types';
import { formatCurrency, getCurrencySymbol } from '../utils';
import CurrencySelector from '../components/CurrencySelector';

interface DashboardProps {
  user: User;
  onCurrencyChange: (currency: Currency) => void;
}

export default function Dashboard({ user, onCurrencyChange }: DashboardProps) {
  const [prices, setPrices] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const loadPrices = async () => {
      const data = await fetchBitcoinPrices();
      setPrices(data.bitcoin);
      
      // Generate some mock chart data
      const basePrice = data.bitcoin[user.preferredCurrency.toLowerCase() as keyof typeof data.bitcoin] || 65000;
      const mockData = Array.from({ length: 20 }, (_, i) => ({
        time: `${i}:00`,
        price: basePrice + (Math.random() - 0.5) * 2000,
      }));
      setChartData(mockData);
    };

    loadPrices();
    const interval = setInterval(loadPrices, 60000);
    return () => clearInterval(interval);
  }, [user.preferredCurrency]);

  const currentBtcPrice = prices ? prices[user.preferredCurrency.toLowerCase()] : 0;
  const balanceInPreferred = user.balance * (currentBtcPrice / (prices?.usd || 1)); // This is a bit simplified, better use exchange rates

  // For simplicity in this demo, let's assume user.balance is in USD and we convert it
  // In a real app, we'd fetch exchange rates
  const exchangeRates: Record<Currency, number> = {
    USD: 1,
    EUR: 0.92,
    AUD: 1.52,
    CAD: 1.35
  };
  
  const convertedBalance = user.balance * exchangeRates[user.preferredCurrency];
  const totalProfit = (user.balance * 0.15) * exchangeRates[user.preferredCurrency]; // Mock profit

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Welcome back, {user.displayName || 'Investor'}</h1>
          <p className="text-white/40 mt-1">Here's what's happening with your investments today.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-mono text-white/60 uppercase tracking-wider">Live Market</span>
          </div>
          <CurrencySelector current={user.preferredCurrency} onChange={onCurrencyChange} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Balance', value: formatCurrency(convertedBalance, user.preferredCurrency), icon: Wallet, color: 'text-brand-orange' },
          { label: 'Total Profit', value: formatCurrency(totalProfit, user.preferredCurrency), icon: TrendingUp, color: 'text-emerald-500' },
          { label: 'Active Investments', value: '2', icon: Activity, color: 'text-blue-500' },
          { label: 'BTC Price', value: formatCurrency(currentBtcPrice, user.preferredCurrency), icon: DollarSign, color: 'text-purple-500' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-brand-dark border border-white/5 p-6 rounded-2xl group hover:border-brand-orange/20 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-center gap-1 text-emerald-500 text-sm font-bold">
                <ArrowUpRight size={16} />
                <span>+12.5%</span>
              </div>
            </div>
            <p className="text-white/40 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1 tracking-tight">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-brand-dark border border-white/5 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold font-display">Bitcoin Performance</h3>
            <div className="flex gap-2">
              {['1H', '1D', '1W', '1M'].map((t) => (
                <button key={t} className={`px-3 py-1 rounded-lg text-xs font-bold ${t === '1D' ? 'bg-brand-orange text-black' : 'bg-white/5 text-white/40'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="time" stroke="#ffffff20" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#FF6321' }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#FF6321"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6, fill: '#FF6321' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-brand-dark border border-white/5 rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-6 font-display">Recent Activity</h3>
          <div className="space-y-6">
            {[
              { type: 'Investment', amount: 500, date: '2 hours ago', status: 'Completed' },
              { type: 'Withdrawal', amount: 120, date: 'Yesterday', status: 'Pending' },
              { type: 'Profit', amount: 45, date: '2 days ago', status: 'Completed' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'Withdrawal' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'
                  }`}>
                    {activity.type === 'Withdrawal' ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
                  </div>
                  <div>
                    <p className="font-bold">{activity.type}</p>
                    <p className="text-xs text-white/40">{activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold">{formatCurrency(activity.amount * exchangeRates[user.preferredCurrency], user.preferredCurrency)}</p>
                  <p className={`text-[10px] uppercase tracking-widest font-bold ${
                    activity.status === 'Pending' ? 'text-brand-orange' : 'text-white/40'
                  }`}>{activity.status}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-4 border border-white/10 rounded-2xl text-sm font-bold hover:bg-brand-orange hover:text-black transition-all">
            View All History
          </button>
        </div>
      </div>
    </div>
  );
}
