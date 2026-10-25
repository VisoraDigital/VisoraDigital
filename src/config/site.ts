export const WHATSAPP_NUMBER = '';
export const INSTAGRAM_URL = 'https://www.instagram.com/somosvisora/';
export const PUBLIC_SITE_URL = '';
export const BUSINESS_EMAIL = '';

export const siteConfig = {
  name: 'VISORA DIGITAL',
  slogan: 'Mais visibilidade para o seu negócio.',
  title: 'VISORA DIGITAL | Sites e presença digital local',
  description:
    'A VISORA DIGITAL fortalece a presença digital de negócios locais com Google, QR Code para avaliações, sites profissionais, portfólios e lojas virtuais.',
  instagram: INSTAGRAM_URL,
  whatsappNumber: WHATSAPP_NUMBER,
  publicOrigin: PUBLIC_SITE_URL,
  email: BUSINESS_EMAIL,
};

export function getWhatsAppUrl(message: string): string | null {
  const number = siteConfig.whatsappNumber.replace(/\D/g, '');
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
