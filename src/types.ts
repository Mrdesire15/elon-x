/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Currency = 'USD' | 'EUR' | 'AUD' | 'CAD';

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  walletAddress?: string;
  balance: number; // in USD
  preferredCurrency: Currency;
  role: 'user' | 'admin';
}

export interface Investment {
  id: string;
  userId: string;
  amount: number; // in USD
  profitPercentage: number;
  status: 'pending' | 'active' | 'completed';
  createdAt: string;
  confirmedAt?: string;
}

export interface Withdrawal {
  id: string;
  userId: string;
  amount: number; // in USD
  walletAddress: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
  processedAt?: string;
  reason?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  amount?: string;
  avatar?: string;
}

export interface ExchangeRates {
  [key: string]: number;
}
