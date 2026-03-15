/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Currency } from './types';

export const formatCurrency = (amount: number, currency: Currency) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const getCurrencySymbol = (currency: Currency) => {
  switch (currency) {
    case 'EUR': return '€';
    case 'AUD': return 'A$';
    case 'CAD': return 'C$';
    default: return '$';
  }
};
