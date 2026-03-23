// src/components/Projects/ListaDeProjetos.ts

export type Projeto = {
    id: string;
    slug: string;
    titulo: string;
    descricao: string;
    tags: string[];
    imagem: string; // caminho a partir de /public
    repo: string; // URL do repositório
    site: string; // URL do deploy/demo
    ano: number;
    destaque?: boolean;
    linguagens: string;
    status: string;
    tipo: string;
};

export const listaDeProjetos: Projeto[] = [
    {
        id: 'dreamsys-sistema-escolar',
        slug: 'dreamsys-sistema-escolar',
        titulo: 'DreamSys - Sistema Escolar',
        descricao:
            `Plataforma completa para gestão escolar (presenças, notas, relatórios e comunicação com responsáveis).
            Desenvolvido por demanda do Centro Educacional Sonho Meu, com foco em segurança, escalabilidade e UX.`,
        tags: ['Node.js', 'Express', 'Bootstrap', 'Cypress', 'CI/CD', 'Scrum', 'XP'],
        imagem: '/DreamSys1.png',
        repo: 'Privado',
        site: 'https://www.dreamsys.com.br/',
        ano: 2025,
        destaque: true,
        linguagens: 'JavaScript (Node.js)',
        status: 'Concluído',
        tipo: 'Plataforma Escolar',
    },
    {
        id: 'sistema-controle-de-contas',
        slug: 'sistema-controle-de-contas',
        titulo: 'Sistema de Controle de Contas',
        descricao:
            `Aplicação para rastreamento de cobranças com alertas de vencimento,
            controle de pagamentos e relatórios personalizados. Projeto desenvolvido durante estágio no GrupoJL.`,
        tags: ['Node.js', 'MongoDB', 'Bootstrap', 'JavaScript'],
        imagem: '/NotasFiscais.png',
        repo: 'Privado',
        site: 'Privado',
        ano: 2024,
        linguagens: 'JavaScript (Node.js)',
        status: 'Concluído',
        tipo: 'Aplicação Financeira',
    },
    {
        id: 'site-filmes-tmdb',
        slug: 'site-filmes-tmdb',
        titulo: 'What2watch (API TMDB)',
        descricao:
            `Web app que integra a API do TheMovieDB para busca de filmes,
            exibição de sinopses e avaliações.`,
        tags: ['API', 'TheMovieDB', 'JavaScript', 'HTML'],
        imagem: '/What2Watch.png',
        repo: 'https://github.com/nalbcosta/what_2_watch',
        site: 'https://what-2-watch-gamma.vercel.app/',
        ano: 2023,
        linguagens: 'JavaScript',
        status: 'Concluído',
        tipo: 'Projeto Pessoal',
    },
    {
        id: 'site-temperatura-openweather',
        slug: 'site-temperatura-openweather',
        titulo: 'Site de Temperatura (API OpenWeather)',
        descricao:
            'Aplicação que consome a API OpenWeather para fornecer previsão do tempo em tempo real.',
        tags: ['API', 'OpenWeather', 'JavaScript'],
        imagem: '/WeatherApp.png',
        repo: 'https://github.com/nalbcosta/weather-app',
        site: 'https://weather-app-psi-one-19.vercel.app/',
        ano: 2023,
        linguagens: 'JavaScript',
        status: 'Concluído',
        tipo: 'Projeto Pessoal',
    },
    {
        id: 'site-escolar-centro-educacional',
        slug: 'site-escolar-centro-educacional',
        titulo: 'Site Escolar - Centro Educacional Sonho Meu',
        descricao:
            'Site institucional responsivo criado para o Centro Educacional Sonho Meu, focado em divulgação de informações sobre cursos, contato e visão pedagógica.',
        tags: ['HTML', 'CSS', 'Responsive'],
        imagem: '/CESMPage.png',
        repo: 'Privado',
        site: 'https://www.cesonhomeu.com.br/',
        ano: 2023,
        linguagens: 'HTML, CSS',
        status: 'Online',
        tipo: 'Website Institucional',
    },
    {
        id: 'facial-portaria-rpi3',
        slug: 'facial-portaria-rpi3',
        titulo: 'Controle de Acesso com Reconhecimento Facial',
        descricao: `
    Sistema de controle de acesso por reconhecimento facial otimizado para Raspberry Pi 3,
    com arquitetura cliente-servidor, dashboard web, detecção de intrusão e backups automáticos.
    Focado em rodar em hardware limitado com alta disponibilidade e segurança de acesso físico.
  `,
        tags: ['Python', 'Flask', 'OpenCV', 'SQLite', 'JWT', 'Gunicorn', 'Raspberry Pi'],
        imagem: '/ProjectPlaceholder.png',
        repo: 'https://github.com/nalbcosta/topicosEspeciais',
        site: 'Sem deploy público',
        ano: 2025,
        destaque: true,
        linguagens: 'Python',
        status: 'Concluído',
        tipo: 'Sistema de Controle de Acesso',
    },
    {
        id: 'email-classifier',
        slug: 'email-classifier',
        titulo: 'EmailClassifier - Classificador Inteligente de Emails',
        descricao: `
    Aplicação web para classificação automática de emails corporativos usando IA,
    categorizando mensagens produtivas/improdutivas e sugerindo respostas profissionais.
    Projeto full-stack com deploy em nuvem, suporte a múltiplos provedores de LLM e interface responsiva.
  `,
        tags: ['Python', 'FastAPI', 'NLTK', 'Tailwind', 'Docker', 'Groq', 'OpenAI'],
        imagem: '/ProjectPlaceholder.png',
        repo: 'https://github.com/nalbcosta/teste_email',
        site: 'Sem deploy público',
        ano: 2025,
        destaque: true,
        linguagens: 'Python, JavaScript',
        status: 'Concluído',
        tipo: 'Aplicação Web com IA',
    },
    {
        id: 'sentinel-ai-fraudes',
        slug: 'sentinel-ai-fraudes',
        titulo: 'Sentinel AI - Análise de Fraudes em Tempo Real',
        descricao: `
    Sistema web full-stack para análise de fraudes em tempo real, permitindo cadastro de usuários,
    envio de mensagens suspeitas e visualização de histórico.
    Atuação focada no frontend em React, consumindo API em Spring Boot e modelo de IA em Python.
  `,
        tags: ['React', 'SCSS', 'Axios', 'Spring Boot', 'MySQL', 'IA'],
        imagem: '/SentinelAI.png',
        repo: 'https://github.com/nalbcosta/Sentinela-front',
        site: 'https://sentinela-front-nine.vercel.app/',
        ano: 2024,
        destaque: false,
        linguagens: 'JavaScript, Java, Python',
        status: 'Concluído',
        tipo: 'Sistema de Detecção de Fraudes',
    },
    {
        id: 'sistema-restaurante-c',
        slug: 'sistema-restaurante-c',
        titulo: 'Sistema de Restaurante em C',
        descricao: `
    Sistema de administração de restaurante em C, com gestão de clientes, mesas, pedidos, produtos,
    reservas, pagamentos e promoções.
    Focado em programação estruturada, uso intensivo de structs, arquivos binários e organização modular.
  `,
        tags: ['C', 'CLI', 'Arquivos Binários', 'Structs', 'Makefile', 'API'],
        imagem: '/ProjectPlaceholder.png',
        repo: 'https://github.com/nalbcosta/sistema-restaurante-c',
        site: 'Sem deploy público',
        ano: 2025,
        destaque: false,
        linguagens: 'C',
        status: 'Concluído',
        tipo: 'Sistema de Gestão',
    },
    {
        id: 'pyzero-game',
        slug: 'pyzero-game',
        titulo: 'pyZero Game - Plataforma 2D',
        descricao: `
    Jogo de plataforma 2D desenvolvido com Pygame Zero, com arquitetura modular para entidades,
    HUD, menus e parallax.
    Projeto focado em organização de código, uso de assets externos e experiência básica em game dev.
  `,
        tags: ['Python', 'Pygame Zero', 'Game Dev'],
        imagem: '/ProjectPlaceholder.png',
        repo: 'https://github.com/nalbcosta/pyZero-game',
        site: 'Sem deploy público',
        ano: 2025,
        destaque: false,
        linguagens: 'Python',
        status: 'Concluído',
        tipo: 'Jogo 2D',
    },
    {
        id: 'lp-ceson-homeu',
        slug: 'lp-ceson-homeu',
        titulo: 'Landing Page de Matrículas - Colégio Sonho Meu',
        descricao: `
    Landing page otimizada para captação de matrículas do Colégio Sonho Meu,
    com foco em copy orientada a conversão, performance e responsividade.
    Integrada a formulários de contato e acompanhamento de leads.
  `,
        tags: ['Landing Page', 'Marketing', 'Responsivo'],
        imagem: '/LPCesm.png',
        repo: 'Privado',
        site: 'https://lp.cesonhomeu.com.br/',
        ano: 2025,
        destaque: false,
        linguagens: 'HTML, CSS, JavaScript',
        status: 'Online',
        tipo: 'Landing Page',
    },
];

/**
 * Utilitário para buscar um projeto pelo slug
 */
export const getProjetoPorSlug = (slug: string): Projeto | undefined =>
    listaDeProjetos.find((p) => p.slug === slug);

// Exemplo de import em Projeto.tsx:
// import { listaDeProjetos, getProjetoPorSlug } from '@/components/Projects/ListaDeProjetos';