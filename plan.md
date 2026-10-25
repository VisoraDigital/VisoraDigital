# Plano de implementação — VISORA DIGITAL

## Produto e arquitetura

Site institucional de uma página em React, TypeScript e Vite, com HTML semântico, CSS organizado por componentes e sem backend. A página será pré-renderizada durante o build para incluir conteúdo real e metadados no HTML inicial e será hidratada no navegador para interações. A entrega é uma saída estática (`dist/`) adequada a hospedagem estática. O formulário validará dados no cliente e abrirá o WhatsApp com mensagem preenchida somente após configurar o número; sem backend ou serviço externo, não alegará envio. O número, Instagram, marca, descrições e metadados ficarão em configuração editável.

## Conteúdo e componentes

Uma página com âncoras navegáveis e menu móvel acessível: cabeçalho; hero; credibilidade (visibilidade, confiança e conversão); serviços (Perfil da Empresa no Google, avaliações por QR Code, sites profissionais, portfólios/catálogos e lojas virtuais); como funciona (diagnóstico, planejamento, desenvolvimento, entrega/orientação); demonstrações visuais conceituais; sobre; FAQ; CTA e formulário de orçamento; rodapé. Cards direcionam a detalhes na mesma página. A seção QR destacará mockups claros e escuros e a validação do link fornecido pelo cliente. Os exemplos são demonstrações conceituais, não trabalhos realizados. CTAs terão mensagens contextuais no WhatsApp; ausência de número será tratada sem inventar contato.

## Design

Direção escolhida: **futurismo editorial de conversão**, uma combinação original compatível com o briefing. Fundo marinho `#0B1220`, branco suave `#F8FAFC` e ciano de assinatura `#38BDF8`. Composição de blocos assimétricos, ampla margem negativa, linhas orbitais e cartões de interface discretos em CSS. Elementos orbitais e o V geométrico formam os motivos recorrentes. Interações curtas, estados claros, foco visível e respeito a `prefers-reduced-motion`; brilho ciano moderado. Tipografia geométrica (Montserrat via CSS com fallbacks locais/sans-serif), títulos de alto contraste e texto de leitura confortável.

- Princípios: clareza comercial sem promessas; tecnologia com contenção; acessibilidade e desempenho; demonstração conceitual claramente identificada.
- Essência: presença digital estratégica e acessível para negócios locais; moderna, confiável e próxima.
- Voz: objetiva, humana e específica. Exemplos: “Seu negócio merece ser encontrado.” / “Mais clareza para sua marca. Mais facilidade para seus clientes encontrarem você.”
- Logotipo: wordmark tipográfico VISORA DIGITAL com V geométrico ciano e traço orbital fino; não substituir por marca incompatível.
- Cor de assinatura: ciano VISORA `#38BDF8`.

## Estrutura de arquivos

- `src/main.tsx`: hidratação React e entrada do navegador.
- `src/App.tsx`: composição semântica das seções, conteúdo, FAQ, menu e formulário.
- `src/config/site.ts`: nome, slogan, redes, WhatsApp configurável, dados comerciais opcionais e metadados.
- `src/styles.css`: sistema visual, componentes, responsividade, foco e movimento reduzido.
- `scripts/prerender.mjs`: geração de HTML inicial usando renderização React no servidor durante build.
- `public/`: favicon vetorial, robots, sitemap e manifesto de rotas.
- `README.md`: setup, execução, testes, publicação estática, configuração de dados e limitações.
- `TODO.md`: resultados solicitados e critérios de aceite rastreáveis.

## SEO e limites

HTML pré-renderizado com um H1, títulos hierárquicos, title, description, Open Graph e Twitter Card. Favicon em SVG, `robots.txt`, `sitemap.xml` e `/manus-routes.json`. Endereço canônico e `og:url` não serão inventados: só serão renderizados quando o domínio real for definido na configuração. Dados estruturados conterão apenas informações efetivamente confirmadas. Sem domínio, número de WhatsApp, e-mail, endereço, CNPJ, avaliações ou credenciais fictícias. Não há backend, processamento durável ou envio de e-mail; o formulário oferece a alternativa transparente via WhatsApp após configuração. Publicação requer domínio e hospedagem escolhidos/configurados pelo responsável.
