import { ClientProfile, SiteSettings } from '../types';
import { INITIAL_CLIENTS, INITIAL_SETTINGS } from '../data/initialData';

const CLIENTS_STORAGE_KEY = 'smartnfc_clients_db_v1';
const SETTINGS_STORAGE_KEY = 'smartnfc_settings_db_v1';
const AUTH_STORAGE_KEY = 'smartnfc_admin_session_v1';

function getLocalClients(): ClientProfile[] {
  try {
    const raw = localStorage.getItem(CLIENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(INITIAL_CLIENTS));
      return INITIAL_CLIENTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_CLIENTS;
  }
}

function saveLocalClients(clients: ClientProfile[]): void {
  try {
    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clients));
  } catch (err) {
    console.error('Failed to save to localStorage', err);
  }
}

function getLocalSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(INITIAL_SETTINGS));
      return INITIAL_SETTINGS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SETTINGS;
  }
}

function saveLocalSettings(settings: SiteSettings): void {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings to localStorage', err);
  }
}

export async function fetchClients(): Promise<ClientProfile[]> {
  try {
    const res = await fetch('/api/clients');
    if (res.ok) {
      const data = await res.json();
      saveLocalClients(data);
      return data;
    }
  } catch {
    // fallback to local state
  }
  return getLocalClients();
}

export async function fetchClientBySlug(slug: string): Promise<ClientProfile | null> {
  const cleanSlug = slug.toLowerCase().trim();
  try {
    const res = await fetch(`/api/clients/${encodeURIComponent(cleanSlug)}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {
    // fallback to local state
  }
  const clients = getLocalClients();
  const match = clients.find((c) => c.slug.toLowerCase() === cleanSlug);
  return match || null;
}

export async function createClient(
  clientData: Omit<ClientProfile, 'id' | 'created_at' | 'updated_at'>
): Promise<ClientProfile> {
  const newClient: ClientProfile = {
    ...clientData,
    id: 'client-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    slug: clientData.slug.toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-'),
    views_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  try {
    const res = await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newClient),
    });
    if (res.ok) {
      const data = await res.json();
      const current = getLocalClients();
      saveLocalClients([data, ...current.filter((c) => c.id !== data.id && c.slug !== data.slug)]);
      return data;
    }
  } catch {
    // local fallback
  }

  const current = getLocalClients();
  const exists = current.some((c) => c.slug === newClient.slug);
  if (exists) {
    throw new Error(`A client with the slug "${newClient.slug}" already exists.`);
  }

  const updated = [newClient, ...current];
  saveLocalClients(updated);
  return newClient;
}

export async function updateClient(
  id: string,
  clientData: Partial<ClientProfile>
): Promise<ClientProfile> {
  try {
    const res = await fetch(`/api/clients/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientData),
    });
    if (res.ok) {
      const data = await res.json();
      const current = getLocalClients();
      saveLocalClients(current.map((c) => (c.id === id ? data : c)));
      return data;
    }
  } catch {
    // local fallback
  }

  const current = getLocalClients();
  const index = current.findIndex((c) => c.id === id);
  if (index === -1) {
    throw new Error('Client not found');
  }

  if (clientData.slug) {
    const cleanSlug = clientData.slug.toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-');
    const slugConflict = current.some((c) => c.slug === cleanSlug && c.id !== id);
    if (slugConflict) {
      throw new Error(`The slug "${cleanSlug}" is already used by another client.`);
    }
    clientData.slug = cleanSlug;
  }

  const updatedClient: ClientProfile = {
    ...current[index],
    ...clientData,
    updated_at: new Date().toISOString(),
  };

  current[index] = updatedClient;
  saveLocalClients([...current]);
  return updatedClient;
}

export async function deleteClient(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/clients/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      const current = getLocalClients();
      saveLocalClients(current.filter((c) => c.id !== id));
      return true;
    }
  } catch {
    // local fallback
  }

  const current = getLocalClients();
  const filtered = current.filter((c) => c.id !== id);
  saveLocalClients(filtered);
  return true;
}

export async function toggleClientStatus(id: string): Promise<ClientProfile> {
  const current = getLocalClients();
  const client = current.find((c) => c.id === id);
  if (!client) throw new Error('Client not found');

  const newStatus = client.status === 'active' ? 'inactive' : 'active';
  return updateClient(id, { status: newStatus });
}

export async function incrementClientView(slug: string): Promise<void> {
  try {
    fetch(`/api/clients/${encodeURIComponent(slug)}/view`, { method: 'POST' }).catch(() => {});
  } catch {
    // ignore
  }
  const current = getLocalClients();
  const client = current.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
  if (client) {
    client.views_count = (client.views_count || 0) + 1;
    saveLocalClients([...current]);
  }
}

export async function fetchSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch('/api/settings');
    if (res.ok) {
      const data = await res.json();
      saveLocalSettings(data);
      return data;
    }
  } catch {
    // fallback
  }
  return getLocalSettings();
}

export async function updateSettings(settings: SiteSettings): Promise<SiteSettings> {
  try {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    if (res.ok) {
      const data = await res.json();
      saveLocalSettings(data);
      return data;
    }
  } catch {
    // fallback
  }
  saveLocalSettings(settings);
  return settings;
}

export function checkAdminSession(): boolean {
  try {
    const sessionToken = sessionStorage.getItem(AUTH_STORAGE_KEY);
    return sessionToken === 'authenticated_admin_session';
  } catch {
    return false;
  }
}

export function setAdminSession(auth: boolean): void {
  try {
    if (auth) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'authenticated_admin_session');
    } else {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch {
    // ignore
  }
}
