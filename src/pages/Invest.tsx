/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, TrendingUp, Copy, Check, Activity, Wallet, ArrowRight } from 'lucide-react';
import { Currency, User } from '../types';
import { formatCurrency } from '../utils';
import { QRCodeSVG } from 'qrcode.react';

interface InvestProps {
  user: User;
}

export default function Invest({ user }: InvestProps) {
  const [amount, setAmount] = useState<number>(100);
  const [step, setStep] = useState<'input' | 'confirm' | 'payment'>('input');
  const [isGenerating, setIsGenerating] = useState(false);
  const [paymentAddress, setPaymentAddress] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleProceedToConfirm = () => {
    if (amount >= 50 && amount <= 5000) {
      setStep('confirm');
    }
  };

  const handleConfirmInvestment = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/bitcoin/generate-address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid, amount })
      });
      const data = await response.json();
      setPaymentAddress(data.address);
      setStep('payment');
    } catch (error) {
      console.error('Failed to generate address:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (paymentAddress) {
      navigator.clipboard.writeText(paymentAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const profitPercentage = amount >= 1000 ? 70 : 50;
  const projectedProfit = (amount * profitPercentage) / 100;

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight uppercase italic font-display">Start Investing</h1>
        <p className="text-white/40 mt-4 text-lg max-w-xl mx-auto">
          Choose your investment amount and start earning up to 70% profit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Form / Confirmation */}
        <div className="bg-brand-dark border border-white/5 p-8 rounded-3xl space-y-8">
          <AnimatePresence mode="wait">
            {step === 'input' && (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Investment Amount (USD)</label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-white/20">$</span>
                    <input
                      type="number"
                      min="50"
                      max="5000"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-12 pr-6 text-3xl font-bold focus:outline-none focus:border-brand-orange transition-all"
                    />
                  </div>
                  <div className="flex justify-between text-xs font-bold text-white/20">
                    <span>MIN: $50</span>
                    <span>MAX: $5000</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="text-emerald-500" size={20} />
                      <span className="text-sm font-bold">Estimated Profit</span>
                    </div>
                    <span className="text-xl font-mono font-bold text-emerald-500">{profitPercentage}%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <Zap className="text-brand-orange" size={20} />
                      <span className="text-sm font-bold">Monthly Return</span>
                    </div>
                    <span className="text-xl font-mono font-bold text-brand-orange">
                      {formatCurrency(projectedProfit, 'USD')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleProceedToConfirm}
                  className="w-full py-6 bg-brand-orange text-black rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] orange-glow-hover transition-all flex items-center justify-center gap-3"
                >
                  <span>Continue to Confirmation</span>
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            )}

            {step === 'confirm' && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-display uppercase italic">Confirm Investment</h3>
                  <p className="text-sm text-white/40">Please review your investment details before proceeding.</p>
                </div>

                <div className="space-y-4 bg-white/5 border border-white/5 p-6 rounded-2xl">
                  <div className="flex justify-between items-center pb-4 border-bottom border-white/5">
                    <span className="text-sm text-white/40 uppercase font-bold tracking-widest">Amount</span>
                    <span className="text-xl font-bold font-mono">{formatCurrency(amount, 'USD')}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-bottom border-white/5">
                    <span className="text-sm text-white/40 uppercase font-bold tracking-widest">Profit Rate</span>
                    <span className="text-xl font-bold font-mono text-emerald-500">+{profitPercentage}%</span>
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-sm text-white/40 uppercase font-bold tracking-widest">Projected Return</span>
                    <span className="text-xl font-bold font-mono text-brand-orange">{formatCurrency(projectedProfit, 'USD')}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep('input')}
                    className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirmInvestment}
                    disabled={isGenerating}
                    className="flex-[2] py-4 bg-brand-orange text-black rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] orange-glow-hover transition-all flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Shield size={18} />
                        <span>Confirm & Proceed</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div
                key="payment-status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 text-center py-8"
              >
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                  <Check className="text-emerald-500" size={40} />
                </div>
                <h3 className="text-2xl font-bold font-display uppercase italic">Address Generated</h3>
                <p className="text-sm text-white/40">Your unique Bitcoin payment address is ready. Please complete the payment to start earning.</p>
                <button
                  onClick={() => {
                    setStep('input');
                    setPaymentAddress(null);
                  }}
                  className="text-brand-orange font-bold uppercase tracking-widest text-xs hover:underline"
                >
                  Start New Investment
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Payment Details */}
        <div className="space-y-8">
          <AnimatePresence mode="wait">
            {paymentAddress ? (
              <motion.div
                key="payment-details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-brand-dark border border-brand-orange/20 p-8 rounded-3xl space-y-6 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 blur-3xl rounded-full -mr-16 -mt-16" />
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-display">Send Bitcoin</h3>
                  <p className="text-sm text-white/40">Please send exactly the equivalent of {formatCurrency(amount, 'USD')} in BTC to the address below.</p>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                  <div className="flex justify-center">
                    <div className="p-4 bg-white rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                      <QRCodeSVG 
                        value={`bitcoin:${paymentAddress}?amount=${(amount / 65000).toFixed(8)}`}
                        size={180}
                        level="H"
                        includeMargin={false}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Bitcoin Address</label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-black/40 p-3 rounded-lg text-xs break-all border border-white/5">
                        {paymentAddress}
                      </code>
                      <button
                        onClick={copyToClipboard}
                        className="p-3 bg-brand-orange text-black rounded-lg hover:bg-brand-orange/80 transition-all"
                      >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-orange/10 border border-brand-orange/20 p-4 rounded-xl flex gap-3">
                  <Activity size={20} className="text-brand-orange shrink-0" />
                  <div className="space-y-1">
                    <p className="text-xs text-brand-orange leading-relaxed font-bold uppercase tracking-wider">
                      Automated Verification Active
                    </p>
                    <p className="text-[10px] text-brand-orange/80 leading-relaxed font-medium">
                      Our system automatically detects your payment on the blockchain. Your balance will be credited after 3 network confirmations. You can safely close this page; the process happens in the background.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/5 rounded-3xl min-h-[400px]">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <Wallet size={40} className="text-white/20" />
                </div>
                <h3 className="text-xl font-bold text-white/40 font-display">Waiting for confirmation</h3>
                <p className="text-sm text-white/20 mt-2">Complete the steps on the left to generate your payment address.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
