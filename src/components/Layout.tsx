/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Wallet, History, Users, MessageSquare, Settings, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { XLogo } from './XLogo';

interface LayoutProps {
  children: React.ReactNode;
  user: any;
  onLogout: () => void;
}

export default function Layout({ children, user, onLogout }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Invest', path: '/invest', icon: TrendingUp },
    { name: 'Wallet', path: '/wallet', icon: Wallet },
    { name: 'History', path: '/history', icon: History },
  ];

  if (user?.role === 'admin') {
    navItems.push(
      { name: 'Admin Users', path: '/admin/users', icon: Users },
      { name: 'Admin Withdrawals', path: '/admin/withdrawals', icon: History },
      { name: 'Admin Testimonials', path: '/admin/testimonials', icon: MessageSquare },
      { name: 'System Settings', path: '/admin/settings', icon: Settings }
    );
  }

  return (
    <div className="min-h-screen bg-brand-black text-white font-sans selection:bg-brand-orange selection:text-black">
      {/* Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-brand-dark border-r border-white/5 hidden lg:flex flex-col z-50">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform orange-glow">
              <XLogo size={20} className="text-black" />
            </div>
            <span className="text-2xl font-bold tracking-tighter uppercase italic font-display">Elon X</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path
                  ? 'bg-brand-orange text-black font-bold orange-glow'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 w-full h-16 bg-brand-dark/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 z-50">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-orange rounded flex items-center justify-center">
            <XLogo size={16} className="text-black" />
          </div>
          <span className="text-lg font-bold tracking-tighter uppercase italic font-display">Elon X</span>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white/60">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-0 top-16 bg-brand-black z-40 p-6"
          >
            <nav className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 p-4 rounded-2xl ${
                    location.pathname === item.path ? 'bg-brand-orange text-black' : 'bg-brand-gray text-white/60'
                  }`}
                >
                  <item.icon size={24} />
                  <span className="text-lg font-bold">{item.name}</span>
                </Link>
              ))}
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-red-400/10 text-red-400"
              >
                <LogOut size={24} />
                <span className="text-lg font-bold">Logout</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="max-w-7xl mx-auto p-6 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
