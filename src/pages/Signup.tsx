/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { XLogo } from '../components/XLogo';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md space-y-12"
      >
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform orange-glow">
              <XLogo className="text-black" size={24} />
            </div>
            <span className="text-3xl font-black tracking-tighter uppercase italic font-display">Elon X</span>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight font-display">Create Account</h2>
          <p className="text-white/40">Join thousands of successful Bitcoin investors.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-brand-dark border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-orange transition-all"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-brand-dark border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-orange transition-all"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-brand-dark border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-orange transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-brand-orange text-black rounded-2xl font-black text-lg uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 orange-glow-hover"
          >
            Get Started
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="space-y-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="bg-brand-black px-4 text-white/20">Or continue with</span>
            </div>
          </div>

          <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            <span>Google Account</span>
          </button>
        </div>

        <p className="text-center text-white/40 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-orange hover:underline">
            Sign in here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
