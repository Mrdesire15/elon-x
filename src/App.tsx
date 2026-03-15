/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Invest from './pages/Invest';
import Wallet from './pages/Wallet';
import History from './pages/History';
import AdminUsers from './pages/AdminUsers';
import AdminWithdrawals from './pages/AdminWithdrawals';
import AdminSettings from './pages/AdminSettings';
import { User, Currency } from './types';

export default function App() {
  // Mock user state
  const [user, setUser] = useState<User | null>({
    uid: 'admin-123',
    email: 'admin@elonx.com',
    displayName: 'Elon Admin',
    balance: 25000,
    preferredCurrency: 'USD',
    role: 'admin'
  });

  const handleCurrencyChange = (currency: Currency) => {
    if (user) {
      setUser({ ...user, preferredCurrency: currency });
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <Layout user={user} onLogout={handleLogout}>
                <Dashboard user={user} onCurrencyChange={handleCurrencyChange} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/invest"
          element={
            user ? (
              <Layout user={user} onLogout={handleLogout}>
                <Invest user={user} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/wallet"
          element={
            user ? (
              <Layout user={user} onLogout={handleLogout}>
                <Wallet user={user} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/history"
          element={
            user ? (
              <Layout user={user} onLogout={handleLogout}>
                <History user={user} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/users"
          element={
            user?.role === 'admin' ? (
              <Layout user={user} onLogout={handleLogout}>
                <AdminUsers />
              </Layout>
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/admin/withdrawals"
          element={
            user?.role === 'admin' ? (
              <Layout user={user} onLogout={handleLogout}>
                <AdminWithdrawals />
              </Layout>
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/admin/settings"
          element={
            user?.role === 'admin' ? (
              <Layout user={user} onLogout={handleLogout}>
                <AdminSettings />
              </Layout>
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
