# VISORA DIGITAL

Site institucional estático, responsivo e em português brasileiro para a VISORA DIGITAL. A aplicação usa React, TypeScript e Vite; o conteúdo da página é pré-renderizado no build e hidratado no navegador. Não existe backend neste projeto.

## Requisitos e execução

Requisitos: Node.js 22 ou compatível e pnpm 11.25.0, versão registrada em `package.json`.

```bash
pnpm install
pnpm dev
```

O servidor de desenvolvimento usa a porta 3000. Para gerar a publicação estática e conferir os tipos:

```bash
pnpm typecheck
pnpm build
pnpm preview
```

A saída de publicação fica em `dist/`. `pnpm build` compila o front-end e pré-renderiza a página completa no HTML inicial. O passo gera `robots.txt` e `sitemap.xml`; os links absolutos de domínio só entram quando o domínio público real estiver configurado.

## Configurações comerciais

Edite `src/config/site.ts` antes de publicar:

- `WHATSAPP_NUMBER`: número oficial internacional apenas com dígitos, incluindo país e DDD. Exemplo de formato: `55` + DDD + número, sem `+`, espaços ou pontuação. Não substitua por um número de exemplo.
- `PUBLIC_SITE_URL`: domínio público real com protocolo `https://`; habilita canonical, `og:url`, imagem de compartilhamento absoluta, sitemap e diretiva Sitemap no `robots.txt`.
- `BUSINESS_EMAIL`: e-mail oficial, se a empresa desejar informá-lo.
- `INSTAGRAM_URL`: perfil público confirmado da marca.

O formulário valida os campos no navegador e monta uma mensagem. Quando houver número configurado, abre uma conversa do WhatsApp para a pessoa revisar e enviar; o site não envia mensagem sozinho nem armazena os campos. Sem WhatsApp configurado, apresenta um aviso e direciona ao Instagram oficial. Não há integração de e-mail, banco de dados ou painel de contatos.

O aviso “Privacidade e tratamento de dados” informa essa operação. A VISORA deve revisar e completar os dados de contato do responsável e as instruções de direitos/exclusão antes de publicar, se aplicável à forma como os contatos serão tratados depois que chegarem ao WhatsApp.

## Conteúdo visual e demonstrações

As interfaces de Perfil da Empresa no Google, QR Code, site, portfólio e loja são mockups criados no código e identificados como demonstrações conceituais. O QR mostrado é ilustrativo e não funcional. Um QR final deve usar o endereço fornecido pelo cliente e ser validado antes da entrega. Nenhuma integração de pagamento, entrega, avaliações ou conta Google está ligada a este site.

O hero usa uma ilustração original em CSS, com grade, órbitas e interfaces conceituais; não depende de arquivo de imagem nem de armazenamento externo. O favicon vetorial e a imagem de compartilhamento usam a identidade visual criada para o site.

## Domínio e hospedagem

Publique o diretório `dist/` em um serviço de hospedagem estática (por exemplo, Cloudflare Pages, Netlify ou Vercel), apontando o build para `pnpm install --frozen-lockfile && pnpm build` e a pasta de saída para `dist`. Configure o domínio escolhido no provedor, ative HTTPS e então preencha `PUBLIC_SITE_URL` com o endereço final antes de reconstruir e publicar. Os passos exatos de DNS variam conforme o registrador e o provedor de hospedagem escolhidos. Em hospedagem gerenciada pela Manus, a configuração de publicação estática do projeto também aponta para `dist/`.

Não há dados de domínio, WhatsApp, e-mail, endereço físico, CNPJ, preço, avaliações, clientes ou credenciais fornecidos no projeto. Preencha somente informações oficiais confirmadas. O link do Instagram foi mantido conforme o briefing; a página pública redirecionou para login durante a consulta, então o conteúdo do site foi baseado nas instruções fornecidas, não em detalhes de perfil não verificáveis.

## Integrações e limitações

- WhatsApp: requer que a VISORA configure seu próprio número; o visitante confirma e envia a mensagem na interface do WhatsApp.
- Instagram: link externo para `https://www.instagram.com/somosvisora/`.
- Google Fonts: fonte carregada externamente, com fallbacks locais para contingência.
- Pagamentos, entrega, Google Business Profile, coleta de avaliações, e-mail e analytics próprio não foram integrados.
- O endereço canônico absoluto e o sitemap com URL da página exigem domínio real configurado; até lá, o sitemap não lista uma URL presumida.
- O site não foi publicado em domínio público nesta entrega.

## Relatório de verificações

- `pnpm typecheck`: aprovado.
- `pnpm build`: aprovado; Vite gerou `dist/` e o script pré-renderizou a página com os dados estruturados JSON-LD.
- Servidor de desenvolvimento na porta 3000: `/`, `/manus-routes.json`, `/robots.txt` e `/sitemap.xml` responderam HTTP 200; o manifesto retornou JSON válido com a rota `/`.
- HTML de produção: conteúdo das cinco áreas de serviço, incluindo experiência responsiva e gestão de produtos/pedidos na loja virtual, H1, metadados Open Graph/Twitter e dados estruturados foram encontrados; canonical, `og:url` e URLs no sitemap foram omitidos enquanto não há domínio.
- A composição baseada nas capturas do cliente foi inspecionada em desktop (1366×768 e 1440×1000), tablet (768×1024) e celular (390×844), incluindo a página completa. No Preview, o DOM reportou `scrollWidth` 1265 para viewport 1280, sem rolagem horizontal; foram encontrados três cartões de credibilidade, cinco serviços e nenhuma imagem quebrada.
- Interação: o painel “Saiba mais” abriu. Campos obrigatórios bloquearam o formulário vazio. Com dados sintéticos de teste, o site mostrou a alternativa do Instagram por não haver WhatsApp configurado; nenhum dado real foi usado ou enviado.
- Não foi verificado envio de WhatsApp com um número real, integração externa, DNS ou publicação pública; esses itens dependem de dados e serviços do responsável.
