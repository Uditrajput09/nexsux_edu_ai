import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { getUser, getUserById, getNotificationsForUser } from './server/db.js';
import { chatWithAI } from './server/ai.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Authentication Route
  app.post('/api/auth/login', (req, res) => {
    const { email } = req.body;
    const user = getUser(email);
    
    if (user) {
      // In a real app, set a JWT or session cookie here
      res.json({ user, token: `mock_token_${user.id}` });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

  app.get('/api/auth/me', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    
    const userId = token.replace('mock_token_', '');
    const user = getUserById(userId);
    
    if (user) res.json({ user });
    else res.status(401).json({ error: 'Invalid token' });
  });

  app.get('/api/notifications', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    
    const userId = token.replace('mock_token_', '');
    const notifications = getNotificationsForUser(userId);
    res.json({ notifications });
  });

  // AI Chat Route
  app.post('/api/chat', async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ error: 'Unauthorized' });
      
      const userId = token.replace('mock_token_', '');
      const user = getUserById(userId);
      if (!user) return res.status(401).json({ error: 'Unauthorized' });

      const { message, language } = req.body;
      if (!message) return res.status(400).json({ error: 'Message is required' });

      const responseText = await chatWithAI(userId, message, user, language);
      res.json({ message: responseText });
    } catch (error: any) {
      console.error('Chat endpoint error:', error);
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
