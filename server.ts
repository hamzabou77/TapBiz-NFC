import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { INITIAL_CLIENTS, INITIAL_SETTINGS, INITIAL_PRODUCTS } from './src/data/initialData.ts';
import { ClientProfile, SiteSettings, Product } from './src/types.ts';

const PORT = 3000;
const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

interface DatabaseSchema {
  clients: ClientProfile[];
  products: Product[];
  settings: SiteSettings;
  adminPasswordHash: string;
}

function loadDatabase(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (!parsed.products || !Array.isArray(parsed.products)) {
        parsed.products = INITIAL_PRODUCTS;
      }
      return parsed;
    }
  } catch (err) {
    console.error('Failed to read db.json, initializing fresh data', err);
  }

  const freshDb: DatabaseSchema = {
    clients: INITIAL_CLIENTS,
    products: INITIAL_PRODUCTS,
    settings: INITIAL_SETTINGS,
    adminPasswordHash: 'admin123', // default password
  };
  saveDatabase(freshDb);
  return freshDb;
}

function saveDatabase(db: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write db.json', err);
  }
}

let db = loadDatabase();

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // --- API Endpoints ---
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString(), clientsCount: db.clients.length });
  });

  // Get all clients
  app.get('/api/clients', (req: Request, res: Response) => {
    res.json(db.clients);
  });

  // Get single client by slug or ID
  app.get('/api/clients/:slugOrId', (req: Request, res: Response) => {
    const param = req.params.slugOrId.toLowerCase().trim();
    const client = db.clients.find(
      (c) => c.slug.toLowerCase() === param || c.id.toLowerCase() === param
    );
    if (!client) {
      return res.status(404).json({ error: 'Client profile not found' });
    }
    res.json(client);
  });

  // Create new client
  app.post('/api/clients', (req: Request, res: Response) => {
    const payload = req.body;
    if (!payload.business_name || !payload.slug) {
      return res.status(400).json({ error: 'Business name and slug are required' });
    }

    const cleanSlug = payload.slug.toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-');
    const existing = db.clients.find((c) => c.slug.toLowerCase() === cleanSlug);
    if (existing) {
      return res.status(409).json({ error: `Slug "${cleanSlug}" is already in use.` });
    }

    const newClient: ClientProfile = {
      id: 'client-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      business_name: payload.business_name,
      slug: cleanSlug,
      logo: payload.logo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&auto=format&fit=crop&q=80',
      cover_image: payload.cover_image || '',
      tagline: payload.tagline || '',
      description: payload.description || '',
      phone: payload.phone || '',
      whatsapp: payload.whatsapp || payload.phone || '',
      email: payload.email || '',
      website: payload.website || '',
      instagram: payload.instagram || '',
      facebook: payload.facebook || '',
      google_maps_url: payload.google_maps_url || '',
      google_review_url: payload.google_review_url || '',
      address: payload.address || '',
      status: payload.status || 'active',
      views_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    db.clients.unshift(newClient);
    saveDatabase(db);
    res.status(201).json(newClient);
  });

  // Update client
  app.put('/api/clients/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const index = db.clients.findIndex((c) => c.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Client not found' });
    }

    const payload = req.body;
    if (payload.slug) {
      const cleanSlug = payload.slug.toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-');
      const conflict = db.clients.find((c) => c.slug.toLowerCase() === cleanSlug && c.id !== id);
      if (conflict) {
        return res.status(409).json({ error: `Slug "${cleanSlug}" is already taken by another client.` });
      }
      payload.slug = cleanSlug;
    }

    const updated: ClientProfile = {
      ...db.clients[index],
      ...payload,
      updated_at: new Date().toISOString(),
    };

    db.clients[index] = updated;
    saveDatabase(db);
    res.json(updated);
  });

  // Delete client
  app.delete('/api/clients/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const initialLen = db.clients.length;
    db.clients = db.clients.filter((c) => c.id !== id);
    if (db.clients.length === initialLen) {
      return res.status(404).json({ error: 'Client not found' });
    }
    saveDatabase(db);
    res.json({ success: true, message: 'Client deleted successfully' });
  });

  // Record profile view
  app.post('/api/clients/:slug/view', (req: Request, res: Response) => {
    const slug = req.params.slug.toLowerCase().trim();
    const client = db.clients.find((c) => c.slug.toLowerCase() === slug);
    if (client) {
      client.views_count = (client.views_count || 0) + 1;
      saveDatabase(db);
    }
    res.json({ success: true });
  });

  // --- Product Store Endpoints ---
  app.get('/api/products', (req: Request, res: Response) => {
    res.json(db.products || INITIAL_PRODUCTS);
  });

  app.post('/api/products', (req: Request, res: Response) => {
    const payload = req.body;
    if (!payload.title) {
      return res.status(400).json({ error: 'Product title is required' });
    }

    const newProduct: Product = {
      id: 'prod-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      title: payload.title.trim(),
      description: payload.description || '',
      price: typeof payload.price === 'number' ? payload.price : parseFloat(payload.price) || 150,
      category: payload.category || 'Cartes NFC',
      imageUrl: payload.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      isPopular: Boolean(payload.isPopular),
      features: Array.isArray(payload.features) ? payload.features : [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (!db.products) db.products = [];
    db.products.unshift(newProduct);
    saveDatabase(db);
    res.status(201).json(newProduct);
  });

  app.put('/api/products/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    if (!db.products) db.products = [...INITIAL_PRODUCTS];
    const index = db.products.findIndex((p) => p.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const payload = req.body;
    const updated: Product = {
      ...db.products[index],
      ...payload,
      price: payload.price !== undefined ? (typeof payload.price === 'number' ? payload.price : parseFloat(payload.price) || 150) : db.products[index].price,
      updated_at: new Date().toISOString(),
    };

    db.products[index] = updated;
    saveDatabase(db);
    res.json(updated);
  });

  app.delete('/api/products/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    if (!db.products) db.products = [...INITIAL_PRODUCTS];
    const initialLen = db.products.length;
    db.products = db.products.filter((p) => p.id !== id);
    if (db.products.length === initialLen) {
      return res.status(404).json({ error: 'Product not found' });
    }
    saveDatabase(db);
    res.json({ success: true, message: 'Product deleted successfully' });
  });

  // Get settings
  app.get('/api/settings', (req: Request, res: Response) => {
    res.json(db.settings);
  });

  // Update settings
  app.put('/api/settings', (req: Request, res: Response) => {
    db.settings = { ...db.settings, ...req.body };
    saveDatabase(db);
    res.json(db.settings);
  });

  // Admin login check
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { password } = req.body;
    if (password === 'Hamza2005@' || password === db.adminPasswordHash) {
      return res.json({ success: true, token: 'authenticated_admin_session' });
    }
    return res.status(401).json({ error: 'Incorrect password' });
  });

  // Vite development middleware or production static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Touchbizz Platform Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
