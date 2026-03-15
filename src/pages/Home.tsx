/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { TrendingUp, Shield, Zap, Globe, ArrowRight, Star, Quote } from 'lucide-react';
import { XLogo } from '../components/XLogo';

export default function Home() {
  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,99,33,0.1),transparent_50%)]" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 space-y-8 max-w-4xl px-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-brand-orange">
            <Zap size={14} />
            <span>The Future of Bitcoin Investing</span>
          </div>
          
          <div className="flex flex-col items-center justify-center gap-4">
            <XLogo size={120} className="text-brand-orange orange-glow" />
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.8] font-display">
              ELON <span className="text-brand-orange">X</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-medium leading-relaxed">
            Secure, professional, and high-yield Bitcoin investment platform. Earn up to <span className="text-white font-bold">70% profit</span> with real-time tracking.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-12 py-6 bg-brand-orange text-black rounded-2xl font-black text-lg uppercase tracking-wider hover:scale-105 transition-all flex items-center justify-center gap-3 orange-glow-hover"
            >
              Start Investing Now
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/how-it-works"
              className="w-full sm:w-auto px-12 py-6 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
            >
              How It Works
            </Link>
          </div>
        </motion.div>

        {/* Floating Stats */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4 px-6 translate-y-1/2">
          {[
            { label: 'Total Invested', value: '$12.5M+' },
            { label: 'Active Users', value: '45K+' },
            { label: 'Avg. Monthly ROI', value: '50%' },
            { label: 'Security Score', value: '99.9%' },
          ].map((stat, i) => (
            <div key={i} className="bg-brand-dark border border-white/10 p-8 rounded-3xl text-center shadow-2xl">
              <p className="text-3xl font-black text-brand-orange">{stat.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pt-32">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl font-bold uppercase italic tracking-tight font-display">Why Choose Elon X?</h2>
          <p className="text-white/40 max-w-xl mx-auto">We combine advanced technology with secure financial management to provide the best investment experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Secure Infrastructure', desc: 'Your assets are protected by enterprise-grade encryption and cold storage solutions.', icon: Shield },
            { title: 'Real-Time Tracking', desc: 'Monitor your profits and Bitcoin market movements with our live dashboard.', icon: TrendingUp },
            { title: 'Global Accessibility', desc: 'Invest from anywhere in the world and withdraw in your preferred currency.', icon: Globe },
          ].map((feature, i) => (
            <div key={i} className="bg-brand-dark border border-white/5 p-10 rounded-[40px] space-y-6 hover:border-brand-orange/20 transition-all group">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform">
                <feature.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold">{feature.title}</h3>
              <p className="text-white/40 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-brand-dark py-32 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold uppercase italic tracking-tight font-display">Investor Stories</h2>
              <p className="text-white/40 max-w-md">Hear from our community of successful investors around the globe.</p>
            </div>
            <div className="flex gap-2">
              <div className="flex text-brand-orange">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <span className="font-bold">4.9/5 Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Jenkins', text: 'Elon X has completely changed my perspective on crypto investing. The returns are consistent and the dashboard is so easy to use.', amount: '$5,000' },
              { name: 'Michael Chen', text: 'The manual confirmation process gives me peace of mind knowing that real professionals are managing the platform.', amount: '$2,500' },
              { name: 'David Rodriguez', text: 'Best investment decision I made this year. The 70% profit plan is unbeatable in the current market.', amount: '$10,000' },
            ].map((t, i) => (
              <div key={i} className="bg-brand-black p-10 rounded-[40px] space-y-8 relative border border-white/5">
                <Quote className="absolute top-8 right-8 text-white/5" size={64} />
                <p className="text-lg text-white/80 leading-relaxed relative z-10 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-xs text-white/40">Invested {t.amount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="bg-brand-orange rounded-[60px] p-12 md:p-24 text-center space-y-8 relative overflow-hidden orange-glow">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_70%)]" />
          <h2 className="text-5xl md:text-7xl font-black text-black uppercase italic tracking-tighter leading-none relative z-10 font-display">
            Ready to join the <br /> elite circle?
          </h2>
          <p className="text-black/60 text-xl font-bold max-w-xl mx-auto relative z-10">
            Don't miss out on the next Bitcoin surge. Start your investment journey with Elon X today.
          </p>
          <div className="pt-8 relative z-10">
            <Link
              to="/signup"
              className="inline-flex px-16 py-8 bg-black text-white rounded-3xl font-black text-xl uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
