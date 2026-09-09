const WHATSAPP_HOSTS = new Set([
  "wa.me",
  "www.wa.me",
  "api.whatsapp.com",
  "chat.whatsapp.com",
  "whatsapp.com",
  "www.whatsapp.com",
]);

export function createWhatsAppLink(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function isValidWhatsAppLink(url: string | null | undefined): boolean {
  if (!url || !url.trim()) return false;

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    if (!WHATSAPP_HOSTS.has(parsed.hostname.toLowerCase())) return false;
    return parsed.pathname.replace(/\/+$/, "").length > 1 || parsed.search.length > 1;
  } catch {
    return false;
  }
}

export function isDevelopmentTestLink(url: string | null): boolean {
  if (!url) return false;
  return url.includes("TEST_DEV_ONLY");
}
