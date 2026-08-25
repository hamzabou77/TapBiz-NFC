import { ClientProfile } from '../types';

/**
 * Escapes special characters for standard vCard 3.0 (RFC 2426).
 */
function escapeVCard(str: string): string {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/**
 * Formats an Instagram handle or input into a full HTTPS link.
 */
function formatInstagramUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  const cleanHandle = trimmed.replace(/^@/, '');
  return `https://www.instagram.com/${cleanHandle}`;
}

/**
 * Formats a Facebook handle or input into a full HTTPS link.
 */
function formatFacebookUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  const cleanHandle = trimmed.replace(/^@/, '');
  return `https://www.facebook.com/${cleanHandle}`;
}

/**
 * Generates a strictly sanitized vCard 3.0 string.
 *
 * Structure:
 * - FN: Full Formatted Name (e.g., Hamza dentist)
 * - N: Structured Name (e.g., dentist;Hamza;;;)
 * - TITLE: Clean description / title (e.g., Best dentist in agadir)
 * - ORG: OMITTED to prevent Android/Samsung contacts from merging ORG & TITLE into duplicate text
 * - TEL;TYPE=CELL: Primary mobile phone
 * - TEL;TYPE=WORK,VOICE: Secondary phone / WhatsApp (if distinct)
 * - EMAIL;TYPE=INTERNET: Email address
 * - URL: Website link
 * - X-SOCIALPROFILE;type=instagram: Direct Instagram profile link
 * - ZERO NOTE properties allowed
 */
export function generateVCardString(client: ClientProfile): string {
  const cleanPhone = client.phone ? client.phone.replace(/[^0-9+]/g, '') : '';
  const cleanWhatsApp = client.whatsapp ? client.whatsapp.replace(/[^0-9+]/g, '') : '';

  const trimmedName = client.business_name?.trim() || 'Contact';
  const nameParts = trimmedName.split(/\s+/);
  const lastName = nameParts.length > 1 ? nameParts.pop()! : '';
  const firstName = nameParts.join(' ');
  const structuredName = lastName
    ? `${escapeVCard(lastName)};${escapeVCard(firstName)};;;`
    : `;${escapeVCard(trimmedName)};;;`;

  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${escapeVCard(trimmedName)}`,
    `N:${structuredName}`,
  ];

  // Map description or tagline ONLY to TITLE (without ORG to avoid mobile duplicates)
  const titleText = client.description?.trim() || client.tagline?.trim() || '';
  if (titleText && titleText.toLowerCase() !== trimmedName.toLowerCase()) {
    lines.push(`TITLE:${escapeVCard(titleText)}`);
  }

  // Primary Phone Number (Cell)
  if (cleanPhone) {
    lines.push(`TEL;TYPE=CELL:${cleanPhone}`);
  }

  // Secondary Phone / WhatsApp (only added if distinct from cell)
  if (cleanWhatsApp && cleanWhatsApp !== cleanPhone) {
    lines.push(`TEL;TYPE=WORK,VOICE:${cleanWhatsApp}`);
  }

  // Email Address
  if (client.email?.trim()) {
    lines.push(`EMAIL;TYPE=INTERNET:${client.email.trim()}`);
  }

  // Website Link
  if (client.website?.trim()) {
    lines.push(`URL;TYPE=WORK:${client.website.trim()}`);
  }

  // Facebook Profile Link (Standard URL format with TYPE=Facebook and X-SOCIALPROFILE for maximum mobile compatibility)
  if (client.facebook?.trim()) {
    const facebookUrl = formatFacebookUrl(client.facebook);
    if (facebookUrl) {
      lines.push(`URL;TYPE=Facebook:${facebookUrl}`);
      lines.push(`X-SOCIALPROFILE;TYPE=facebook:${facebookUrl}`);
    }
  }

  // Instagram Profile Link (Standard URL format with TYPE=Instagram and X-SOCIALPROFILE for maximum mobile compatibility)
  if (client.instagram?.trim()) {
    const instagramUrl = formatInstagramUrl(client.instagram);
    if (instagramUrl) {
      lines.push(`URL;TYPE=Instagram:${instagramUrl}`);
      lines.push(`X-SOCIALPROFILE;TYPE=instagram:${instagramUrl}`);
    }
  }

  // Postal Address (optional)
  if (client.address?.trim()) {
    lines.push(`ADR;TYPE=WORK:;;${escapeVCard(client.address.trim())};;;;`);
  }

  lines.push('END:VCARD');

  // Hard sanitization: strictly filter out any line containing or starting with NOTE
  const sanitizedLines = lines.filter((line) => !line.trim().toUpperCase().startsWith('NOTE'));

  return sanitizedLines.join('\r\n');
}

/**
 * Alias for generateVCardString.
 */
export const generateVCard = generateVCardString;

/**
 * Triggers a native download of the strictly sanitized .vcf file in the browser.
 */
export function downloadVCard(client: ClientProfile): void {
  const rawVcard = generateVCardString(client);

  // Extra guard guarantee: strip any NOTE lines from the payload
  const cleanedVcard = rawVcard
    .split(/\r?\n/)
    .filter((line) => !line.trim().toUpperCase().startsWith('NOTE'))
    .join('\r\n');

  const blob = new Blob([cleanedVcard], { type: 'text/vcard;charset=utf-8;' });
  const filename = `${client.slug || 'contact'}.vcf`;

  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}


