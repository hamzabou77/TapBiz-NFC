import { ClientProfile, SiteSettings } from '../types';
import { INITIAL_SETTINGS } from '../data/initialData';
import { supabase } from './supabase';

const SETTINGS_STORAGE_KEY = 'smartnfc_settings_db_v1';
const AUTH_STORAGE_KEY = 'smartnfc_admin_session_v1';

/**
 * Normalizes a database row into a strictly typed ClientProfile.
 * Parses the 'data' JSONB column when present.
 */
function mapRowToClient(row: any): ClientProfile {
  let p = row;
  if (row && row.data !== undefined && row.data !== null) {
    if (typeof row.data === 'string') {
      try {
        p = JSON.parse(row.data);
      } catch {
        p = row.data;
      }
    } else if (typeof row.data === 'object') {
      p = row.data;
    }
  }

  const slug = String(p.slug || row.slug || '').toLowerCase().trim();
  const id = String(p.id || row.id || `client-${slug || Date.now()}`);

  return {
    id,
    business_name: String(p.business_name || 'Business Name'),
    slug,
    logo: String(p.logo || ''),
    cover_image: p.cover_image ? String(p.cover_image) : '',
    tagline: p.tagline ? String(p.tagline) : '',
    description: String(p.description || ''),
    phone: String(p.phone || ''),
    whatsapp: String(p.whatsapp || p.phone || ''),
    email: String(p.email || ''),
    website: String(p.website || ''),
    instagram: String(p.instagram || ''),
    facebook: String(p.facebook || ''),
    google_maps_url: String(p.google_maps_url || ''),
    google_review_url: String(p.google_review_url || ''),
    address: String(p.address || ''),
    status: (p.status === 'inactive' ? 'inactive' : 'active') as 'active' | 'inactive',
    views_count: typeof p.views_count === 'number' ? p.views_count : 0,
    created_at: String(p.created_at || row.created_at || new Date().toISOString()),
    updated_at: String(p.updated_at || row.updated_at || new Date().toISOString()),
  };
}

/**
 * Fetches all client profiles dynamically from Supabase `profiles` table.
 * Parses the 'data' JSONB column for each profile.
 */
export async function fetchClients(): Promise<ClientProfile[]> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*');

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
      const mapped = data.map(mapRowToClient);
      // Sort newest first
      return mapped.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    return [];
  } catch (err) {
    console.error('Unexpected error fetching clients from Supabase:', err);
    return [];
  }
}

/**
 * Fetches a single client profile by its unique slug directly from Supabase `profiles` table.
 * Parses and returns the 'data' JSONB object.
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
 * Upserts a client profile into the Supabase `profiles` table using { slug, data: profileData }.
 */
export async function createClient(
  clientData: Omit<ClientProfile, 'id' | 'created_at' | 'updated_at'>
): Promise<ClientProfile> {
  const cleanSlug = clientData.slug.toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-');
  const now = new Date().toISOString();
  const newId = 'client-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);

  const profileData: ClientProfile = {
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
      .upsert(
        {
          slug: profileData.slug,
          data: profileData,
        },
        { onConflict: 'slug' }
      )
      .select();

    if (error) {
      console.error('Supabase createClient error:', error.message);
      // Try server endpoint fallback
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      if (res.ok) {
        const json = await res.json();
        return mapRowToClient(json);
      }
      throw new Error(error.message || 'Failed to save profile to Supabase');
    }

    if (data && data.length > 0) {
      return mapRowToClient(data[0]);
    }
    return profileData;
  } catch (err: any) {
    console.error('Error in createClient:', err);
    throw new Error(err.message || 'Failed to create client in Supabase database');
  }
}

/**
 * Updates an existing client profile in Supabase `profiles` table using { slug, data: updatedProfile }.
 */
export async function updateClient(
  id: string,
  clientData: Partial<ClientProfile>
): Promise<ClientProfile> {
  const cleanSlug = (clientData.slug || '').toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-');

  // Find current profile to merge cleanly
  let existing: ClientProfile | null = null;
  if (cleanSlug) {
    existing = await fetchClientBySlug(cleanSlug);
  }
  if (!existing) {
    const all = await fetchClients();
    existing = all.find((c) => c.id === id || (cleanSlug && c.slug === cleanSlug)) || null;
  }

  const updatedProfile: ClientProfile = {
    ...(existing || {
      id,
      business_name: 'Business Profile',
      slug: cleanSlug || 'profile',
      logo: '',
      cover_image: '',
      tagline: '',
      description: '',
      phone: '',
      whatsapp: '',
      email: '',
      website: '',
      instagram: '',
      facebook: '',
      google_maps_url: '',
      google_review_url: '',
      address: '',
      status: 'active',
      views_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }),
    ...clientData,
    id: existing?.id || id,
    slug: cleanSlug || existing?.slug || id,
    updated_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(
        {
          slug: updatedProfile.slug,
          data: updatedProfile,
        },
        { onConflict: 'slug' }
      )
      .select();

    if (error) {
      console.error('Supabase updateClient error:', error.message);
      const res = await fetch(`/api/clients/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile),
      });
      if (res.ok) {
        const json = await res.json();
        return mapRowToClient(json);
      }
      throw new Error(error.message || 'Failed to update client in Supabase');
    }

    if (data && data.length > 0) {
      return mapRowToClient(data[0]);
    }
    return updatedProfile;
  } catch (err: any) {
    console.error('Error in updateClient:', err);
    throw new Error(err.message || 'Failed to update client profile in database');
  }
}

/**
 * Deletes a client profile from Supabase by slug or ID.
 */
export async function deleteClient(idOrSlug: string): Promise<boolean> {
  try {
    const clean = idOrSlug.toLowerCase().trim();

    // 1. Delete by slug match
    await supabase
      .from('profiles')
      .delete()
      .eq('slug', clean);

    // 2. If it was an id, also delete by looking up its slug
    const all = await fetchClients();
    const matched = all.find((c) => c.id === idOrSlug || c.slug === clean);
    if (matched && matched.slug && matched.slug !== clean) {
      await supabase
        .from('profiles')
        .delete()
        .eq('slug', matched.slug);
    }

    // Local server fallback deletion
    await fetch(`/api/clients/${encodeURIComponent(idOrSlug)}`, { method: 'DELETE' }).catch(() => {});
    return true;
  } catch (err) {
    console.error('Error deleting client from Supabase:', err);
    return true;
  }
}

/**
 * Toggles a client profile's active status in Supabase.
 */
export async function toggleClientStatus(idOrSlug: string): Promise<ClientProfile> {
  const all = await fetchClients();
  const current = all.find((c) => c.id === idOrSlug || c.slug === idOrSlug);
  const newStatus = current?.status === 'active' ? 'inactive' : 'active';
  return updateClient(idOrSlug, { status: newStatus });
}

/**
 * Increments the profile view counter in Supabase `profiles` table.
 */
export async function incrementClientView(slug: string): Promise<void> {
  const cleanSlug = slug.toLowerCase().trim();
  if (!cleanSlug) return;

  try {
    const current = await fetchClientBySlug(cleanSlug);
    if (current) {
      current.views_count = (current.views_count || 0) + 1;
      await supabase
        .from('profiles')
        .upsert(
          {
            slug: cleanSlug,
            data: current,
          },
          { onConflict: 'slug' }
        );
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
