/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Currency } from '../types';

export interface PriceData {
  bitcoin: {
    [key in Lowercase<Currency>]: number;
  };
}

export const fetchBitcoinPrices = async (): Promise<PriceData> => {
  try {
    const response = await fetch('/api/prices/bitcoin');
    if (!response.ok) throw new Error('Failed to fetch prices');
    return await response.json();
  } catch (error) {
    console.error('Error fetching Bitcoin prices:', error);
    // Fallback prices
    return {
      bitcoin: {
        usd: 65000,
        eur: 60000,
        aud: 98000,
        cad: 88000,
      },
    };
  }
};

export const fetchExchangeRates = async (base: string = 'USD') => {
  try {
    // Using a free API for exchange rates
    const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
    if (!response.ok) throw new Error('Failed to fetch exchange rates');
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return {
      USD: 1,
      EUR: 0.92,
      AUD: 1.52,
      CAD: 1.35,
    };
  }
};
