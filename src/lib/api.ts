import { ClientProfile, SiteSettings } from '../types';
import { INITIAL_SETTINGS } from '../data/initialData';
import { supabase } from './supabase';

const SETTINGS_STORAGE_KEY = 'smartnfc_settings_db_v1';
const AUTH_STORAGE_KEY = 'smartnfc_admin_session_v1';

/**
 * Normalizes a database row into a strictly typed ClientProfile
 */
function mapRowToClient(row: any): ClientProfile {
  return {
    id: String(row.id || ''),
    business_name: String(row.business_name || 'Business Name'),
    slug: String(row.slug || '').toLowerCase().trim(),
    logo: String(row.logo || ''),
    cover_image: row.cover_image ? String(row.cover_image) : '',
    tagline: row.tagline ? String(row.tagline) : '',
    description: String(row.description || ''),
    phone: String(row.phone || ''),
    whatsapp: String(row.whatsapp || row.phone || ''),
    email: String(row.email || ''),
    website: String(row.website || ''),
    instagram: String(row.instagram || ''),
    facebook: String(row.facebook || ''),
    google_maps_url: String(row.google_maps_url || ''),
    google_review_url: String(row.google_review_url || ''),
    address: String(row.address || ''),
    status: (row.status === 'inactive' ? 'inactive' : 'active') as 'active' | 'inactive',
    views_count: typeof row.views_count === 'number' ? row.views_count : 0,
    created_at: String(row.created_at || new Date().toISOString()),
    updated_at: String(row.updated_at || new Date().toISOString()),
  };
}

/**
 * Fetches all client profiles dynamically from Supabase `profiles` table.
 */
export async function fetchClients(): Promise<ClientProfile[]> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetchClients error:', error.message);
      // Fallback to server endpoint
      const res = await fetch('/api/clients').catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        return json.map(mapRowToClient);
      }
      return [];
    }

    if (data && Array.isArray(data)) {
      return data.map(mapRowToClient);
    }
    return [];
  } catch (err) {
    console.error('Unexpected error fetching clients from Supabase:', err);
    return [];
  }
}

/**
 * Fetches a single client profile by its unique slug directly from Supabase `profiles` table.
 */
export async function fetchClientBySlug(slug: string): Promise<ClientProfile | null> {
  const cleanSlug = slug.toLowerCase().trim();
  if (!cleanSlug) return null;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('slug', cleanSlug)
      .maybeSingle();

    if (error) {
      console.warn('Supabase fetchClientBySlug error:', error.message);
      const res = await fetch(`/api/clients/${encodeURIComponent(cleanSlug)}`).catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        return mapRowToClient(json);
      }
      return null;
    }

    if (data) {
      return mapRowToClient(data);
    }
    return null;
  } catch (err) {
    console.error('Unexpected error fetching slug from Supabase:', err);
    return null;
  }
}

/**
 * Upserts a client profile into the Supabase `profiles` table using the slug as unique key.
 */
export async function createClient(
  clientData: Omit<ClientProfile, 'id' | 'created_at' | 'updated_at'>
): Promise<ClientProfile> {
  const cleanSlug = clientData.slug.toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-');
  const now = new Date().toISOString();
  const newId = 'client-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);

  const payload = {
    id: newId,
    business_name: clientData.business_name.trim(),
    slug: cleanSlug,
    logo: clientData.logo || '',
    cover_image: clientData.cover_image || '',
    tagline: clientData.tagline || '',
    description: clientData.description || '',
    phone: clientData.phone || '',
    whatsapp: clientData.whatsapp || clientData.phone || '',
    email: clientData.email || '',
    website: clientData.website || '',
    instagram: clientData.instagram || '',
    facebook: clientData.facebook || '',
    google_maps_url: clientData.google_maps_url || '',
    google_review_url: clientData.google_review_url || '',
    address: clientData.address || '',
    status: clientData.status || 'active',
    views_count: 0,
    created_at: now,
    updated_at: now,
  };

  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(payload, { onConflict: 'slug' })
      .select()
      .single();

    if (error) {
      console.error('Supabase createClient error:', error.message);
      // Try server endpoint fallback
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const json = await res.json();
        return mapRowToClient(json);
      }
      throw new Error(error.message || 'Failed to save profile to Supabase');
    }

    return mapRowToClient(data || payload);
  } catch (err: any) {
    console.error('Error in createClient:', err);
    throw new Error(err.message || 'Failed to create client in Supabase database');
  }
}

/**
 * Updates an existing client profile in Supabase `profiles` table.
 */
export async function updateClient(
  id: string,
  clientData: Partial<ClientProfile>
): Promise<ClientProfile> {
  const updatePayload: Record<string, any> = {
    ...clientData,
    updated_at: new Date().toISOString(),
  };

  if (clientData.slug) {
    updatePayload.slug = clientData.slug.toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-');
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updatePayload)
      .match({ id })
      .select()
      .single();

    if (error) {
      // Fallback matching by slug if id was not matched
      if (clientData.slug) {
        const { data: slugData, error: slugErr } = await supabase
          .from('profiles')
          .update(updatePayload)
          .match({ slug: clientData.slug })
          .select()
          .single();

        if (!slugErr && slugData) {
          return mapRowToClient(slugData);
        }
      }

      console.error('Supabase updateClient error:', error.message);
      const res = await fetch(`/api/clients/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData),
      });
      if (res.ok) {
        const json = await res.json();
        return mapRowToClient(json);
      }
      throw new Error(error.message || 'Failed to update client in Supabase');
    }

    return mapRowToClient(data || { id, ...clientData });
  } catch (err: any) {
    console.error('Error in updateClient:', err);
    throw new Error(err.message || 'Failed to update client profile in database');
  }
}

/**
 * Deletes a client profile from Supabase by ID or slug.
 */
export async function deleteClient(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .match({ id });

    if (error) {
      console.warn('Supabase delete error:', error.message);
      await fetch(`/api/clients/${encodeURIComponent(id)}`, { method: 'DELETE' }).catch(() => {});
    }
    return true;
  } catch (err) {
    console.error('Error deleting client:', err);
    return true;
  }
}

/**
 * Toggles a client profile's active status in Supabase.
 */
export async function toggleClientStatus(id: string): Promise<ClientProfile> {
  const { data: current } = await supabase
    .from('profiles')
    .select('status')
    .match({ id })
    .maybeSingle();

  const newStatus = current?.status === 'active' ? 'inactive' : 'active';
  return updateClient(id, { status: newStatus });
}

/**
 * Increments the profile view counter in Supabase `profiles` table.
 */
export async function incrementClientView(slug: string): Promise<void> {
  const cleanSlug = slug.toLowerCase().trim();
  if (!cleanSlug) return;

  try {
    const { data: current } = await supabase
      .from('profiles')
      .select('views_count')
      .eq('slug', cleanSlug)
      .maybeSingle();

    if (current) {
      const newCount = (current.views_count || 0) + 1;
      await supabase
        .from('profiles')
        .update({ views_count: newCount })
        .eq('slug', cleanSlug);
    }
  } catch {
    // Non-blocking view increment
  }
}

function getLocalSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) {
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
    console.error('Failed to save settings', err);
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
