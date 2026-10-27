import { useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ExternalLink,
  Globe2,
  Layers3,
  Menu,
  MessageCircle,
  ScanLine,
  Search,
  ShoppingBag,
  Sparkles,
  Store,
  Waypoints,
  X,
} from 'lucide-react';
import { getWhatsAppUrl, siteConfig } from './config/site';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const navItems = [
  ['Início', '#inicio'],
  ['Serviços', '#servicos'],
  ['Como funciona', '#processo'],
  ['Sobre a Visora', '#sobre'],
  ['Contato', '#contato'],
] as const;

const serviceItems = [
  {
    number: '01',
    icon: Search,
    title: 'Perfil da Empresa no Google',
    intro: 'Mais clareza para quem pesquisa por um negócio como o seu.',
    bullets: [
      'Configuração e revisão de categorias, serviços, descrição e informações comerciais.',
      'Organização de fotos e orientação para fortalecer a presença nas pesquisas locais.',
      'Boas práticas para avaliações autênticas e para manter o perfil atualizado.',
    ],
    cta: 'Quero melhorar meu perfil no Google',
  },
  {
    number: '02',
    icon: ScanLine,
    title: 'Avaliações com QR Code',
    intro: 'Um convite simples para seus clientes chegarem ao lugar certo.',
    bullets: [
      'Plaquinhas personalizadas para balcões, mesas e recepções.',
      'Design pensado para o seu segmento, em versões claras e escuras.',
      'O QR Code usa o link fornecido pelo cliente e é validado antes da entrega.',
    ],
    cta: 'Criar minha plaquinha com QR Code',
  },
  {
    number: '03',
    icon: Globe2,
    title: 'Sites profissionais',
    intro: 'Uma presença digital sob medida, preparada para todos os tamanhos de tela.',
    bullets: [
      'Design personalizado para apresentar serviços e diferenciais.',
      'Contato pelo WhatsApp, formulário de orçamento e SEO técnico básico.',
      'Estrutura organizada para acompanhar o crescimento do negócio.',
    ],
    cta: 'Conversar sobre um site',
  },
  {
    number: '04',
    icon: Layers3,
    title: 'Portfólios e catálogos',
    intro: 'Trabalhos, serviços e produtos organizados para compartilhar.',
    bullets: [
      'Galerias de trabalhos e projetos com apresentação profissional.',
      'Catálogos digitais e páginas de serviços fáceis de consultar.',
      'Links compartilháveis conectados aos seus canais de contato.',
    ],
    cta: 'Montar meu portfólio digital',
  },
  {
    number: '05',
    icon: ShoppingBag,
    title: 'Lojas virtuais',
    intro: 'Uma estrutura digital para apresentar e vender seus produtos.',
    bullets: [
      'Catálogo e páginas individuais para os produtos.',
      'Carrinho de compras quando fizer sentido para a solução escolhida.',
      'Integrações de pagamento e entrega definidas conforme o projeto.',
      'Experiência responsiva em celulares, tablets e computadores.',
      'Estrutura preparada para gerenciamento de produtos e pedidos.',
    ],
    cta: 'Planejar minha loja virtual',
  },
];

const processItems = [
  { number: '01', title: 'Diagnóstico', text: 'Entendemos o negócio, o momento e o que você quer alcançar.' },
  { number: '02', title: 'Planejamento', text: 'Definimos a solução digital mais adequada para seus objetivos.' },
  { number: '03', title: 'Desenvolvimento', text: 'Construímos o projeto com atenção à experiência e aos detalhes.' },
  { number: '04', title: 'Entrega e orientação', text: 'Apresentamos a solução e orientamos você sobre como utilizá-la.' },
];

const faqItems = [
  {
    question: 'Como funciona a otimização do Perfil da Empresa no Google?',
    answer:
      'Analisamos as informações disponíveis, revisamos categorias, serviços, descrição e fotos e orientamos a manutenção do perfil. O trabalho ajuda a apresentar melhor o negócio, mas não garante posições específicas nos resultados.',
  },
  {
    question: 'Como funciona uma plaquinha com QR Code?',
    answer:
      'Você envia o link do canal de avaliações e escolhe o estilo da peça. O QR Code é configurado para esse endereço e validado antes da entrega. Também orientamos a melhor forma de usar a plaquinha no estabelecimento.',
  },
  {
    question: 'Posso solicitar um site mesmo sem ter domínio?',
    answer:
      'Sim. Podemos conversar sobre as opções de domínio e hospedagem no orçamento. A escolha e os custos dependem do projeto e ficam claros antes de qualquer contratação.',
  },
  {
    question: 'A Visora cria sites para celular?',
    answer:
      'Sim. Os sites são planejados para se adaptar a celulares, tablets e computadores, com navegação e conteúdo ajustados a cada tela.',
  },
  {
    question: 'Como solicitar um orçamento?',
    answer:
      'Conte um pouco sobre seu negócio pelo formulário desta página. Ele prepara uma mensagem para o WhatsApp quando o número oficial estiver configurado. Você revisa e envia a mensagem por conta própria.',
  },
  {
    question: 'Quanto tempo leva para desenvolver um projeto?',
    answer:
      'O prazo depende do tipo de solução, do escopo e dos materiais necessários. A estimativa é combinada no orçamento, antes do início do projeto.',
  },
  {
    question: 'Como funciona a manutenção de um site?',
    answer:
      'As necessidades de atualização, suporte e manutenção variam conforme a solução. Podemos definir o que será necessário e como será atendido durante o orçamento.',
  },
  {
    question: 'A agência atende diferentes tipos de comércio?',
    answer:
      'As soluções são pensadas para pequenos negócios, profissionais autônomos, prestadores de serviços e comércios locais. O escopo é ajustado à realidade de cada projeto.',
  },
];

const qrPattern = [
  '11111110010111111',
  '10000010100100001',
  '10111010110101101',
  '10111010010101101',
  '10111010110101101',
  '10000010000100001',
  '11111110101011111',
  '00000000111000000',
  '10110111001010110',
  '01101000111100011',
  '11010110100111010',
  '00101101110001001',
  '11111110010101110',
  '10000010111010101',
  '10111010001111010',
  '10000010110100101',
  '11111110101011111',
];

function BrandSymbol({ className = 'brand__symbol', decorative = false }: { className?: string; decorative?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 48 44" fill="none" role={decorative ? undefined : 'img'} aria-label={decorative ? undefined : 'Símbolo V orbital'} aria-hidden={decorative || undefined}>
      <ellipse className="brand__orbit brand__orbit--ring" cx="24" cy="22" rx="21.2" ry="19.4" />
      <path className="brand__orbit brand__orbit--primary" d="M4.5 25.8c7.8-10.7 21.6-16 36.7-10.2" />
      <path className="brand__orbit brand__orbit--secondary" d="M7.5 29.5c8.2 5.7 20.5 6.2 31.1.4" />
      <path className="brand__glyph" d="M10.8 8.5 23.2 34 38.5 8.5" />
      <circle className="brand__node" cx="41.2" cy="15.7" r="1.8" />
      <circle className="brand__node brand__node--satellite" cx="5.8" cy="24.1" r=".9" />
    </svg>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand${compact ? ' brand--compact' : ''}`} href="#inicio" aria-label="VISORA DIGITAL — início" tabIndex={compact ? -1 : undefined}>
      <BrandSymbol decorative />
      <span className="brand__wordmark"><strong>VISORA</strong><small>DIGITAL</small></span>
    </a>
  );
}

function WhatsappLink({
  message,
  children,
  className,
  onClick,
}: {
  message: string;
  children: ReactNode;
  className: string;
  onClick?: () => void;
}) {
  const url = getWhatsAppUrl(message);
  return (
    <a
      className={className}
      href={url ?? '#contato'}
      target={url ? '_blank' : undefined}
      rel={url ? 'noreferrer' : undefined}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

function QrCode() {
  return (
    <div className="qr-code" aria-label="QR Code ilustrativo, não funcional" role="img">
      {qrPattern.flatMap((row, rowIndex) =>
        [...row].map((cell, columnIndex) => (
          <span
            key={`${rowIndex}-${columnIndex}`}
            className={cell === '1' ? 'qr-code__cell qr-code__cell--on' : 'qr-code__cell'}
          />
        )),
      )}
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <BrandMark />
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav id="primary-navigation" className={`primary-nav${menuOpen ? ' is-open' : ''}`} aria-label="Navegação principal">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>{label}</a>
          ))}
          <WhatsappLink className="button button--small button--header" message="Olá! Gostaria de solicitar um orçamento com a VISORA DIGITAL." onClick={closeMenu}>
            Solicitar orçamento <ArrowUpRight size={15} />
          </WhatsappLink>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section-anchor" id="inicio">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <div className="hero__badge"><span className="hero__badge-dot" /> Mais visibilidade para o seu negócio</div>
          <h1>Seu negócio merece ser <span>encontrado.</span></h1>
          <p className="hero__lead">Fortalecemos sua presença digital com estratégias no Google, avaliações por QR Code, sites profissionais e lojas virtuais.</p>
          <p className="hero__support">Mais clareza para sua marca. Mais facilidade para seus clientes encontrarem você.</p>
          <div className="hero__actions">
            <WhatsappLink className="button button--primary" message="Olá! Quero impulsionar meu negócio com a VISORA DIGITAL.">
              Quero impulsionar meu negócio <ArrowRight size={17} />
            </WhatsappLink>
            <a className="button button--ghost" href="#servicos">Conhecer nossos serviços <ArrowDownRight size={16} /></a>
          </div>
          <div className="hero__note"><span className="hero__note-dot" /> Soluções digitais pensadas para a realidade do seu negócio.</div>
        </div>

        <div className="hero-visual" aria-label="Demonstração conceitual de presença digital">
          <div className="hero-visual__grid" aria-hidden="true" />
          <div className="hero-visual__orbit hero-visual__orbit--one" aria-hidden="true" />
          <div className="hero-visual__orbit hero-visual__orbit--two" aria-hidden="true" />
          <div className="local-profile-card">
            <div className="local-profile-card__search"><Search size={13} /><span>negócios perto de mim</span></div>
            <div className="local-profile-card__image" aria-hidden="true" />
            <strong>Seu Negócio</strong>
            <span className="local-profile-card__type">Perfil da empresa · demonstração</span>
            <div className="local-profile-card__actions"><span>Rotas</span><span>Ligar</span><span>Site</span></div>
          </div>
          <div className="hero-visual__brandmark" aria-hidden="true">
            <BrandSymbol className="brand__symbol hero-visual__brand-symbol" decorative />
          </div>
          <div className="hero-website-card" aria-hidden="true">
            <div className="hero-website-card__top"><i /><i /><i /><span>presença digital</span></div>
            <div className="hero-website-card__content"><span /><span /><span /><i /></div>
          </div>
          <div className="hero-visual__label"><span className="signal-tag__pulse" /> VISIBILIDADE LOCAL</div>
          <div className="hero-visual__caption">
            <Sparkles size={12} /> Demonstração conceitual
          </div>
        </div>
      </div>
      <div className="container hero__bottom"><span>GOOGLE &amp; BUSCA LOCAL</span><i /><span>EXPERIÊNCIA DIGITAL</span><i /><span>CONEXÃO COM CLIENTES</span><span className="hero__scroll">ROLE PARA DESCOBRIR <ArrowDownRight size={13} /></span></div>
    </section>
  );
}

function Credibility() {
  const pillars = [
    { title: 'Visibilidade', text: 'Informações claras e atualizadas.' },
    { title: 'Confiança', text: 'Imagem profissional e consistente.' },
    { title: 'Conversão', text: 'Contato fácil para o cliente.' },
  ];
  return (
    <section className="credibility section-anchor" id="credibilidade">
      <div className="container credibility__layout">
        <div className="credibility__intro"><span className="section-kicker section-kicker--dark">CREDIBILIDADE</span><h2>Uma presença digital mais profissional <em>começa aqui.</em></h2><p>Quando alguém procura pelo seu serviço, as primeiras impressões acontecem online. Organizamos as informações do seu negócio para que ele seja encontrado, compreendido e escolhido com mais confiança.</p></div>
        <div className="pillar-list">{pillars.map(({ title, text }) => <article className="pillar" key={title}><span className="pillar__icon"><Check size={16} strokeWidth={2} /></span><div><h3>{text}</h3><p>{title}</p></div></article>)}</div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="services section-anchor" id="servicos">
      <div className="container">
        <div className="section-heading section-heading--services"><span className="section-kicker">SERVIÇOS</span><h2>Soluções para cada etapa da sua presença online.</h2></div>
        <div className="service-grid">{serviceItems.map(({ number, icon: Icon, title, intro, bullets, cta }) => (
          <article className="service-card" key={number}>
            <div className="service-card__top"><span className="service-card__icon"><Icon size={28} strokeWidth={1.7} /></span></div>
            <h3>{title}</h3><p>{intro}</p>
            <details className="service-card__details"><summary>Saiba mais <ArrowRight size={15} /></summary><div className="service-card__expanded"><ul>{bullets.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul><WhatsappLink className="text-link" message={`Olá! Gostaria de saber mais sobre ${title} com a VISORA DIGITAL.`}>{cta} <ArrowUpRight size={15} /></WhatsappLink></div></details>
            <span className="service-card__line" />
          </article>
        ))}</div>
        <p className="services__fineprint">Cada projeto é planejado conforme as necessidades do negócio. Escopo, prazo e integrações são alinhados no orçamento.</p>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="process section-anchor" id="processo">
      <div className="container">
        <div className="section-heading"><span className="section-kicker">SIMPLES E TRANSPARENTE</span><h2>Do primeiro papo à <em>presença no ar.</em></h2><p>Um caminho organizado para transformar uma necessidade em uma solução digital clara.</p></div>
        <div className="process-track">{processItems.map((item, index) => <article className="process-step" key={item.number}><div className="process-step__marker"><span>{item.number}</span>{index < processItems.length - 1 && <i />}</div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        <div className="process-note"><Waypoints size={18} /><span>Você acompanha cada etapa e sabe o que esperar antes de avançarmos.</span></div>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section className="showcase" id="demonstracoes">
      <div className="container">
        <div className="section-heading section-heading--split"><div><span className="section-kicker">NA PRÁTICA</span><h2>Ideias que ganham <em>forma digital.</em></h2></div><p>Uma prévia de como diferentes soluções podem ajudar a apresentar o seu negócio. Todos os exemplos abaixo são demonstrações conceituais.</p></div>
        <div className="showcase-grid">
          <article className="demo-card demo-card--profile"><div className="demo-label"><span>01 / DESCOBERTA</span><span>Demonstração conceitual</span></div><div className="google-mock"><div className="google-mock__bar"><span className="google-g">G</span><span>pesquisar negócios</span><Search size={15} /></div><div className="google-mock__result"><div className="google-mock__avatar"><Store size={19} /></div><div><strong>O seu negócio</strong><span>Serviços e comércio local</span><span className="google-mock__meta"><span>Perfil informativo</span><span className="tiny-dot" /> aberto conforme horário</span></div><ArrowUpRight size={16} /></div><div className="google-mock__links"><span>Visão geral</span><span>Serviços</span><span>Fotos</span><span>Contato</span></div><div className="google-mock__content"><div><span className="mock-line mock-line--long" /><span className="mock-line mock-line--short" /></div><div className="google-mock__map"><span /></div></div></div><h3>Perfil comercial no Google</h3><p>Informações organizadas para facilitar a descoberta.</p></article>
          <article className="demo-card demo-card--qr"><div className="demo-label"><span>02 / CONFIANÇA</span><span>Demonstração conceitual</span></div><div className="qr-display"><div className="qr-placard qr-placard--light"><div className="qr-placard__brand"><span className="qr-mini-v">V</span><span>VISORA <small>DIGITAL</small></span></div><div className="qr-placard__copy"><small>SUA EXPERIÊNCIA</small><strong>Ajude outras pessoas a nos encontrar.</strong></div><QrCode /><span className="qr-placard__scan">APONTE A CÂMERA</span></div><div className="qr-placard qr-placard--dark"><div className="qr-placard__brand"><span className="qr-mini-v">V</span><span>VISORA <small>DIGITAL</small></span></div><div className="qr-placard__copy"><small>CONTE PRA GENTE</small><strong>Sua opinião faz parte da nossa história.</strong></div><QrCode /><span className="qr-placard__scan">QR ILUSTRATIVO</span></div></div><h3>Plaquinhas para avaliações</h3><p>O código final é validado com o link informado pelo cliente.</p></article>
          <article className="demo-card demo-card--website"><div className="demo-label"><span>03 / EXPERIÊNCIA</span><span>Demonstração conceitual</span></div><div className="device-stage"><div className="browser-mock"><div className="browser-mock__top"><span /><span /><span /><small>seunegocio.com.br</small></div><div className="browser-mock__hero"><div className="browser-mock__nav"><b>SEU NEGÓCIO</b><span>Sobre&nbsp;&nbsp; Serviços&nbsp;&nbsp; Contato</span></div><div className="browser-mock__body"><span className="mock-tag">FEITO PARA VOCÊ</span><strong>Um bom começo para boas conversas.</strong><span className="browser-mock__button">Conheça nossos serviços <ArrowRight size={10} /></span></div><div className="browser-mock__visual"><span /><i /><b /></div></div><div className="browser-mock__under"><span /><span /><span /></div></div><div className="phone-mock"><div className="phone-mock__island" /><div className="phone-mock__screen"><span className="phone-mock__brand">SEU NEGÓCIO</span><span className="phone-mock__image" /><strong>Uma experiência que cabe na palma da mão.</strong><span className="phone-mock__cta">Fale com a gente</span></div></div></div><h3>Site em desktop e celular</h3><p>Uma experiência consistente em diferentes telas.</p></article>
          <article className="demo-card demo-card--portfolio"><div className="demo-label"><span>04 / APRESENTAÇÃO</span><span>Demonstração conceitual</span></div><div className="portfolio-mock"><div className="portfolio-mock__side"><span className="portfolio-mock__avatar">V</span><span className="mock-line mock-line--long" /><span className="mock-line mock-line--short" /><span className="portfolio-mock__side-link">Projetos</span><span className="portfolio-mock__side-link">Sobre</span><span className="portfolio-mock__side-link">Contato</span></div><div className="portfolio-mock__main"><span className="mock-tag">PORTFÓLIO DIGITAL</span><strong>Trabalhos feitos com intenção.</strong><div className="portfolio-mock__tiles"><span /><span /><span /></div></div></div><h3>Portfólio digital</h3><p>Projetos e serviços apresentados com organização.</p></article>
          <article className="demo-card demo-card--store"><div className="demo-label"><span>05 / COMÉRCIO</span><span>Demonstração conceitual</span></div><div className="store-mock"><div className="store-mock__top"><span>LOJA CONCEITUAL</span><span>Produtos &nbsp; Sobre &nbsp; <ShoppingBag size={13} /></span></div><div className="store-mock__hero"><span className="mock-tag">ESCOLHAS DO DIA A DIA</span><strong>Encontre algo que combina com você.</strong><span className="store-mock__button">Explorar produtos <ArrowRight size={11} /></span></div><div className="store-mock__products"><div><span className="product-shape product-shape--one" /><small>Produto ilustrativo</small></div><div><span className="product-shape product-shape--two" /><small>Produto ilustrativo</small></div><div><span className="product-shape product-shape--three" /><small>Produto ilustrativo</small></div></div></div><h3>Loja virtual</h3><p>Vitrine digital para explorar produtos e conversar.</p></article>
        </div>
        <div className="showcase-footnote"><Sparkles size={14} /><span>As imagens e interfaces apresentadas nesta seção ilustram as soluções e possibilidades criativas da VISORA DIGITAL.</span></div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about section-anchor" id="sobre">
      <div className="container about__grid"><div className="about__art" aria-hidden="true"><div className="about__orbit about__orbit--one" /><div className="about__orbit about__orbit--two" /><div className="about__core"><BrandMark compact /><span>VISIBILIDADE<br />COM PROPÓSITO</span></div><span className="about__point about__point--one" /><span className="about__point about__point--two" /><span className="about__point about__point--three" /><div className="about__coordinate">V / D — 001</div></div><div className="about__copy"><span className="section-kicker">SOBRE A VISORA</span><h2>Tecnologia com propósito. <em>Presença digital com estratégia.</em></h2><p>A VISORA DIGITAL acredita que uma presença online profissional deve ser clara, acessível e conectada à realidade de cada negócio.</p><p>Por isso, organizamos soluções digitais para que empresas e comércios locais possam apresentar melhor o que fazem e tornar o contato com seus clientes mais simples.</p><a className="text-link" href="#contato">Vamos falar sobre o seu momento? <ArrowRight size={15} /></a></div></div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="faq" id="faq"><div className="container faq__grid"><div className="faq__intro"><span className="section-kicker">PERGUNTAS FREQUENTES</span><h2>Clareza antes de <em>começar.</em></h2><p>O que você precisa saber para dar o próximo passo com tranquilidade.</p><div className="faq__aside"><MessageCircle size={19} /><span>Ficou com outra dúvida?<br /><a href="#contato">Converse com a Visora <ArrowUpRight size={13} /></a></span></div></div><div className="faq__list">{faqItems.map((item, index) => <details key={item.question} className="faq-item"><summary><span><i>0{index + 1}</i>{item.question}</span><ChevronDown size={18} /></summary><p>{item.answer}</p></details>)}</div></div></section>
  );
}

function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const message = [
      'Olá! Gostaria de solicitar um orçamento com a VISORA DIGITAL.',
      '',
      `Meu nome: ${String(values.get('nome') ?? '').trim()}`,
      `Meu contato: ${String(values.get('contato') ?? '').trim()}`,
      `Solução de interesse: ${String(values.get('servico') ?? '').trim()}`,
      String(values.get('detalhes') ?? '').trim() ? `Sobre o projeto: ${String(values.get('detalhes') ?? '').trim()}` : '',
    ].filter(Boolean).join('\n');
    const url = getWhatsAppUrl(message);
    if (!url) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    window.open(url, '_blank', 'noopener,noreferrer');
    window.setTimeout(() => setStatus('success'), 180);
  }

  return (
    <section className="contact section-anchor" id="contato">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container contact__layout"><div className="contact__copy"><span className="section-kicker">SEU PRÓXIMO PASSO</span><h2>Seu próximo cliente pode estar <em>procurando por você agora.</em></h2><p>Prepare seu negócio para ser encontrado, reconhecido e valorizado no digital.</p><div className="contact__promise"><span><Check size={15} /> Primeiro, entendemos seu momento.</span><span><Check size={15} /> Depois, conversamos sobre a solução.</span></div><div className="contact__social"><span>Prefere conhecer mais primeiro?</span><a href={siteConfig.instagram} target="_blank" rel="noreferrer">Acompanhe a VISORA no Instagram <ExternalLink size={14} /></a></div></div>
        <form className="contact-form" onSubmit={handleSubmit} aria-busy={status === 'loading'}>
          <div className="contact-form__header"><span className="contact-form__index">CONTE UM POUCO</span><h3>Vamos conversar sobre seu projeto?</h3><p>Preencha o essencial. Sua mensagem será preparada no WhatsApp para você revisar e enviar.</p></div>
          <div className="form-field"><label htmlFor="nome">Seu nome</label><input id="nome" name="nome" autoComplete="name" required maxLength={80} placeholder="Como podemos chamar você?" /></div>
          <div className="form-field"><label htmlFor="contato-email">Como podemos retornar?</label><input id="contato-email" name="contato" required maxLength={120} placeholder="Telefone ou e-mail" aria-describedby="contact-hint" /><small id="contact-hint">Use telefone com DDD ou e-mail. Não inclua dados sensíveis.</small></div>
          <div className="form-field"><label htmlFor="servico">O que você procura?</label><select id="servico" name="servico" defaultValue="" required><option value="" disabled>Selecione uma solução</option><option>Perfil da Empresa no Google</option><option>Avaliações com QR Code</option><option>Site profissional</option><option>Portfólio ou catálogo digital</option><option>Loja virtual</option><option>Quero conversar para descobrir</option></select></div>
          <div className="form-field"><label htmlFor="detalhes">Um detalhe sobre seu projeto <span>(opcional)</span></label><textarea id="detalhes" name="detalhes" rows={3} maxLength={500} placeholder="O que seria importante a gente saber?" /></div>
          <button className="button button--primary contact-form__submit" type="submit" disabled={status === 'loading'}>{status === 'loading' ? <>Preparando mensagem… <span className="loading-dot" /></> : <>Abrir WhatsApp e solicitar orçamento <ArrowRight size={16} /></>}</button>
          {status === 'success' && <p className="form-feedback form-feedback--success" role="status"><Check size={16} /> A conversa foi preparada. Revise a mensagem no WhatsApp e envie por lá. <a href={getWhatsAppUrl('Olá! Gostaria de conversar com a VISORA DIGITAL.') ?? '#contato'} target="_blank" rel="noreferrer">Abrir conversa</a></p>}
          {status === 'error' && <p className="form-feedback form-feedback--error" role="alert">O WhatsApp da VISORA ainda não foi configurado neste site. Para falar com a marca, acesse o <a href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram oficial</a>.</p>}
          <p className="contact-form__privacy">Ao continuar, você decide se envia a mensagem no WhatsApp. Os dados não são armazenados por este site. <a href="#privacidade">Saiba como tratamos seus dados.</a></p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer"><div className="container"><div className="footer-main"><div className="footer-brand"><BrandMark /><p>{siteConfig.slogan}</p><a className="footer-instagram" href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} /></a></div><div className="footer-links"><div><strong>NAVEGAÇÃO</strong>{navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}<a href="#faq">Perguntas frequentes</a></div><div><strong>SOLUÇÕES</strong><a href="#servicos">Perfil no Google</a><a href="#servicos">QR Code de avaliações</a><a href="#servicos">Sites e portfólios</a><a href="#servicos">Lojas virtuais</a></div><div><strong>CONTATO</strong><WhatsappLink className="footer-contact" message="Olá! Gostaria de conversar sobre um projeto com a VISORA DIGITAL.">Fale sobre seu projeto <ArrowUpRight size={14} /></WhatsappLink>{siteConfig.email && <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>}</div></div></div><div className="footer-legal" id="privacidade"><span>© {new Date().getFullYear()} VISORA DIGITAL. {siteConfig.slogan}</span><details><summary>Privacidade e tratamento de dados <ChevronDown size={13} /></summary><p>Este site não armazena as informações preenchidas no formulário. Ao escolher abrir o WhatsApp, seus dados são incluídos numa mensagem para você revisar; somente quando você a envia, as informações são transmitidas ao WhatsApp e à VISORA DIGITAL para responder ao contato. Informe apenas o necessário para iniciar a conversa. Para solicitar a exclusão de dados enviados, use o próprio canal de contato da empresa. Contato comercial e responsável pelo tratamento ainda não foram fornecidos e devem ser configurados pela VISORA antes da publicação.</p></details><a className="back-top" href="#inicio">Voltar ao topo <ArrowUpRight size={13} /></a></div></div></footer>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Credibility />
        <Services />
        <Process />
        <Showcase />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
