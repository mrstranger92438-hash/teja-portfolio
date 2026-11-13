import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

const contactSubmissions: ContactSubmission[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.post('/api/contact', (req, res) => {
    const { fullName, email, subject, message } = req.body ?? {};

    const cleanName = typeof fullName === 'string' ? fullName.trim() : '';
    const cleanEmail = typeof email === 'string' ? email.trim() : '';
    const cleanSubject = typeof subject === 'string' ? subject.trim() : '';
    const cleanMessage = typeof message === 'string' ? message.trim() : '';

    if (!cleanName || cleanName.length < 2) {
      res.status(400).json({ error: 'Please enter your full name (at least 2 characters).' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      res.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }

    if (!cleanSubject || cleanSubject.length < 2) {
      res.status(400).json({ error: 'Please enter a subject for your message.' });
      return;
    }

    if (!cleanMessage || cleanMessage.length < 10) {
      res.status(400).json({ error: 'Please write a message of at least 10 characters.' });
      return;
    }

    const submission: ContactSubmission = {
      id: `MSG-${Date.now().toString(36).toUpperCase()}`,
      fullName: cleanName.slice(0, 120),
      email: cleanEmail.slice(0, 160),
      subject: cleanSubject.slice(0, 200),
      message: cleanMessage.slice(0, 3000),
      submittedAt: new Date().toISOString(),
    };

    contactSubmissions.push(submission);
    if (contactSubmissions.length > 100) {
      contactSubmissions.shift();
    }

    res.status(201).json({
      success: true,
      referenceId: submission.id,
      submittedAt: submission.submittedAt,
      message: 'Thank you for reaching out! Your message has been received.',
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
