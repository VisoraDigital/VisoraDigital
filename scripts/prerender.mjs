import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createServer } from 'vite';

const root = process.cwd();
const vite = await createServer({
  configFile: resolve(root, 'vite.config.ts'),
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true },
});

try {
  const [{ default: App }, { siteConfig }] = await Promise.all([
    vite.ssrLoadModule('/src/App.tsx'),
    vite.ssrLoadModule('/src/config/site.ts'),
  ]);
  const pageMarkup = renderToString(createElement(App));
  const htmlPath = resolve(root, 'dist/index.html');
  let html = await readFile(htmlPath, 'utf8');
  if (!html.includes('<!--ssr-outlet-->')) throw new Error('Ponto de pré-render não encontrado em index.html.');
  html = html.replace('<!--ssr-outlet-->', pageMarkup);

  const configuredOrigin = (process.env.PUBLIC_SITE_URL || siteConfig.publicOrigin || '').trim().replace(/\/+$/, '');
  let origin = '';
  try {
    const parsedOrigin = new URL(configuredOrigin);
    if (parsedOrigin.protocol === 'https:' || parsedOrigin.protocol === 'http:') origin = parsedOrigin.origin;
  } catch {
    if (configuredOrigin) console.warn('PUBLIC_SITE_URL inválida; metadados absolutos e sitemap serão omitidos.');
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    slogan: siteConfig.slogan,
    description: siteConfig.description,
    sameAs: [siteConfig.instagram],
    knowsAbout: [
      'presença digital para negócios locais',
      'criação de sites profissionais',
      'otimização do Perfil da Empresa no Google',
      'avaliações por QR Code',
      'portfólios e catálogos digitais',
      'lojas virtuais',
    ],
    ...(origin ? { url: `${origin}/`, image: `${origin}/og-visora.svg` } : {}),
  };
  const schemaTag = `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>`;
  html = html.replace('</head>', `    ${schemaTag}\n  </head>`);

  if (origin) {
    const shareImage = `${origin}/og-visora.svg`;
    const absoluteTags = [
      `<link rel="canonical" href="${origin}/" />`,
      `<meta property="og:url" content="${origin}/" />`,
      `<meta property="og:image" content="${shareImage}" />`,
      `<meta property="og:image:alt" content="VISORA DIGITAL — Mais visibilidade para o seu negócio." />`,
      `<meta name="twitter:image" content="${shareImage}" />`,
    ].join('\n    ');
    html = html.replace('</head>', `    ${absoluteTags}\n  </head>`);
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>\n`;
    await writeFile(resolve(root, 'dist/sitemap.xml'), sitemap);
    await writeFile(resolve(root, 'dist/robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  } else {
    const emptySitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>\n';
    await writeFile(resolve(root, 'dist/sitemap.xml'), emptySitemap);
    await writeFile(resolve(root, 'dist/robots.txt'), 'User-agent: *\nAllow: /\n');
  }

  await writeFile(htmlPath, html);
  console.log(`HTML pré-renderizado${origin ? ` para ${origin}` : ' sem domínio canônico configurado'}.`);
} finally {
  await vite.close();
}
