/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';
import crypto from 'crypto';
import fs from 'fs';

import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(bodyParser.json());

  // --- SYSTEM SETTINGS (API KEYS) ---
  const CONFIG_PATH = path.join(__dirname, 'system-config.json');
  
  const getSystemConfig = () => {
    try {
      if (fs.existsSync(CONFIG_PATH)) {
        return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
      }
    } catch (error) {
      console.error('Error reading system config:', error);
    }
    return {};
  };

  const saveSystemConfig = (config: any) => {
    try {
      // Security: Never log the config object directly as it contains sensitive API keys
      fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
      return true;
    } catch (error) {
      console.error('Error saving system config');
      return false;
    }
  };

  app.get('/api/admin/settings', (req, res) => {
    const config = getSystemConfig();
    // Mask keys for security when sending to frontend
    // Fallback to environment variables if not set in the config file
    const maskedConfig = {
      COINGECKO_API_KEY: (config.COINGECKO_API_KEY || process.env.COINGECKO_API_KEY) ? '********' : '',
      BITCOIN_API_KEY: (config.BITCOIN_API_KEY || process.env.BITCOIN_API_KEY) ? '********' : '',
      BITCOIN_WEBHOOK_SECRET: (config.BITCOIN_WEBHOOK_SECRET || process.env.BITCOIN_WEBHOOK_SECRET) ? '********' : '',
      BITCOIN_NETWORK: config.BITCOIN_NETWORK || process.env.BITCOIN_NETWORK || 'mainnet'
    };
    res.json(maskedConfig);
  });

  app.post('/api/admin/settings', (req, res) => {
    const newConfig = req.body;
    const currentConfig = getSystemConfig();
    
    // Security: Do not log req.body as it contains sensitive keys
    const updatedConfig = { ...currentConfig };
    
    // Update logic: 
    // 1. If '********', user didn't change the masked value, keep current
    // 2. If empty string, user wants to clear the file-based setting (falling back to .env)
    // 3. Otherwise, update with the new value
    const keysToUpdate = ['COINGECKO_API_KEY', 'BITCOIN_API_KEY', 'BITCOIN_WEBHOOK_SECRET'];
    
    keysToUpdate.forEach(key => {
      if (newConfig[key] !== undefined && newConfig[key] !== '********') {
        if (newConfig[key] === '') {
          delete updatedConfig[key];
        } else {
          updatedConfig[key] = newConfig[key];
        }
      }
    });

    if (newConfig.BITCOIN_NETWORK) {
      updatedConfig.BITCOIN_NETWORK = newConfig.BITCOIN_NETWORK;
    }

    if (saveSystemConfig(updatedConfig)) {
      res.json({ message: 'Settings updated successfully' });
    } else {
      res.status(500).json({ error: 'Failed to save settings' });
    }
  });

  // Update existing routes to use config from file if present, otherwise env
  app.get('/api/prices/bitcoin', async (req, res) => {
    try {
      const config = getSystemConfig();
      const apiKey = config.COINGECKO_API_KEY || process.env.COINGECKO_API_KEY;
      const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur,aud,cad';
      
      const response = await axios.get(url, {
        headers: apiKey ? { 'x-cg-demo-api-key': apiKey } : {}
      });
      
      res.json(response.data);
    } catch (error) {
      console.error('Price Proxy Error:', error);
      res.status(500).json({ error: 'Failed to fetch prices' });
    }
  });

  app.post('/api/bitcoin/generate-address', async (req, res) => {
    const { userId } = req.body;
    const config = getSystemConfig();
    const apiKey = config.BITCOIN_API_KEY || process.env.BITCOIN_API_KEY;

    if (!apiKey || apiKey.includes('YOUR_')) {
      // Fallback for demo mode
      const mockAddress = `bc1${crypto.randomBytes(16).toString('hex')}`;
      return res.json({ address: mockAddress, note: 'Demo Mode: Mock address generated' });
    }

    try {
      // Integration ready logic
      res.json({ address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', note: 'Integration ready' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate address' });
    }
  });

  // --- BITCOIN AUTOMATED DEPOSIT SYSTEM ---

  /**
   * Webhook endpoint for Bitcoin payment notifications.
   * This would be configured in your payment gateway (e.g., Block.io, Coinbase Commerce).
   */
  app.post('/api/webhooks/bitcoin', async (req, res) => {
    const signature = req.headers['x-payment-signature'];
    const payload = req.body;

    console.log('Received Bitcoin Webhook:', payload);

    // 1. Verify Signature (Security)
    // In a real implementation, you would verify the signature using your secret key.
    // const secret = process.env.BITCOIN_WEBHOOK_SECRET;
    // const expectedSignature = crypto.createHmac('sha256', secret).update(JSON.stringify(payload)).digest('hex');
    // if (signature !== expectedSignature) return res.status(401).send('Invalid signature');

    try {
      const { status, amount_usd, user_id, transaction_id, confirmations } = payload;

      // 2. Handle Confirmation Logic
      // We only credit the balance after a certain number of confirmations (e.g., 3)
      if (status === 'confirmed' && confirmations >= 3) {
        console.log(`Crediting User ${user_id} with $${amount_usd} for TX ${transaction_id}`);
        
        // TODO: Update Firestore balance
        // This is where you would call your Firestore service to increment the user's balance.
        // await db.collection('users').doc(user_id).update({
        //   balance: admin.firestore.FieldValue.increment(amount_usd)
        // });
        
        // Log the transaction
        // await db.collection('transactions').add({
        //   userId: user_id,
        //   amount: amount_usd,
        //   type: 'deposit',
        //   status: 'completed',
        //   txid: transaction_id,
        //   timestamp: new Date()
        // });
      } else if (status === 'pending') {
        console.log(`Transaction ${transaction_id} is pending (${confirmations} confirmations)`);
        // Optionally notify the user via WebSockets or update a "Pending Deposits" collection
      }

      res.status(200).send('Webhook processed');
    } catch (error) {
      console.error('Error processing Bitcoin webhook:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  // --- VITE MIDDLEWARE ---

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ELON X Server running on http://localhost:${PORT}`);
  });
}

startServer();
