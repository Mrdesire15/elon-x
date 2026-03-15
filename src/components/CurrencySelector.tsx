/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Currency } from '../types';
import { ChevronDown } from 'lucide-react';

interface CurrencySelectorProps {
  current: Currency;
  onChange: (currency: Currency) => void;
}

export default function CurrencySelector({ current, onChange }: CurrencySelectorProps) {
  const currencies: Currency[] = ['USD', 'EUR', 'AUD', 'CAD'];

  return (
    <div className="relative inline-block group">
      <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl hover:bg-white/10 transition-all">
        <span className="font-mono font-bold">{current}</span>
        <ChevronDown size={16} className="text-white/40 group-hover:text-white transition-colors" />
      </button>
      
      <div className="absolute right-0 top-full mt-2 w-32 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-2xl">
        {currencies.map((currency) => (
          <button
            key={currency}
            onClick={() => onChange(currency)}
            className={`w-full text-left px-4 py-3 font-mono text-sm hover:bg-orange-500 hover:text-black transition-colors ${
              current === currency ? 'text-orange-500' : 'text-white/60'
            }`}
          >
            {currency}
          </button>
        ))}
      </div>
    </div>
  );
}
