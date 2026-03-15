/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Save, Key, Globe, Shield, AlertCircle, CheckCircle } from 'lucide-react';

interface Settings {
  COINGECKO_API_KEY: string;
  BITCOIN_API_KEY: string;
  BITCOIN_WEBHOOK_SECRET: string;
  BITCOIN_NETWORK: string;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>({
    COINGECKO_API_KEY: '',
    BITCOIN_API_KEY: '',
    BITCOIN_WEBHOOK_SECRET: '',
    BITCOIN_NETWORK: 'mainnet'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (response.ok) {
        setMessage({ type: 'success', text: 'Settings saved successfully. Note: Sensitive keys are masked after saving.' });
        fetchSettings();
      } else {
        setMessage({ type: 'error', text: 'Failed to save settings.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while saving.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight font-display uppercase italic">System Settings</h1>
        <p className="text-white/40 mt-1 text-sm">Configure API keys and global platform parameters.</p>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl flex items-center gap-3 border ${
            message.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
              : 'bg-red-500/10 border-red-500/20 text-red-500'
          }`}
        >
          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="text-sm font-medium">{message.text}</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-8">
        {/* Market Data Section */}
        <div className="bg-brand-dark border border-white/5 p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <Globe className="text-brand-orange" size={24} />
            <h2 className="text-xl font-bold uppercase tracking-tight">Market Data</h2>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">CoinGecko API Key</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input
                  type="password"
                  value={settings.COINGECKO_API_KEY}
                  onChange={(e) => setSettings({ ...settings, COINGECKO_API_KEY: e.target.value })}
                  placeholder="Enter CoinGecko Pro API Key"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-orange transition-all font-mono text-sm"
                />
              </div>
              <p className="text-[10px] text-white/20 italic">Used for reliable real-time Bitcoin price tracking. Leave empty to use public demo API.</p>
            </div>
          </div>
        </div>

        {/* Payment Gateway Section */}
        <div className="bg-brand-dark border border-white/5 p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <Shield className="text-brand-orange" size={24} />
            <h2 className="text-xl font-bold uppercase tracking-tight">Payment Gateway</h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Bitcoin API Key (Block.io / Coinbase)</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input
                  type="password"
                  value={settings.BITCOIN_API_KEY}
                  onChange={(e) => setSettings({ ...settings, BITCOIN_API_KEY: e.target.value })}
                  placeholder="Enter Payment Gateway API Key"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-orange transition-all font-mono text-sm"
                />
              </div>
              <p className="text-[10px] text-white/20 italic">Required for generating real Bitcoin deposit addresses and tracking payments.</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Webhook Signing Secret</label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input
                  type="password"
                  value={settings.BITCOIN_WEBHOOK_SECRET}
                  onChange={(e) => setSettings({ ...settings, BITCOIN_WEBHOOK_SECRET: e.target.value })}
                  placeholder="Enter Webhook Secret"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-orange transition-all font-mono text-sm"
                />
              </div>
              <p className="text-[10px] text-white/20 italic">Used to verify that incoming payment notifications are authentic.</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Bitcoin Network</label>
              <select
                value={settings.BITCOIN_NETWORK}
                onChange={(e) => setSettings({ ...settings, BITCOIN_NETWORK: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:outline-none focus:border-brand-orange transition-all text-sm appearance-none"
              >
                <option value="mainnet">Mainnet (Real Bitcoin)</option>
                <option value="testnet">Testnet (Demo/Testing)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-4 bg-brand-orange text-black rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 orange-glow-hover disabled:opacity-50"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save size={20} />
                <span>Save All Settings</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
