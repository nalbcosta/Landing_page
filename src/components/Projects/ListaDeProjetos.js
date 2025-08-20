// src/components/Projects/ListaDeProjetos.js

/**
 * Tipagem JSDoc para melhor DX ao importar em .ts/.tsx
 * @typedef {Object} Projeto
 * @property {string} id
 * @property {string} slug
 * @property {string} titulo
 * @property {string} descricao
 * @property {string[]} tags
 * @property {string} imagem       // caminho a partir de /public
 * @property {string} repo         // URL do repositório
 * @property {string} site         // URL do deploy/demo
 * @property {number} ano
 * @property {boolean=} destaque
 * @property {string} linguagens
 * @property {string} status
 * @property {string} tipo
 */

/** @type {Projeto[]} */
export const listaDeProjetos = [
    {
        id: 'dreamsys-sistema-escolar',
        slug: 'dreamsys-sistema-escolar',
        titulo: 'DreamSys - Sistema Escolar',
        descricao:
            `Plataforma completa para gestão escolar (presenças, notas, relatórios e comunicação com responsáveis).
            Desenvolvido por demanda do Centro Educacional Sonho Meu, com foco em segurança, escalabilidade e UX.`,
        tags: ['Node.js', 'Express', 'Bootstrap', 'Cypress', 'CI/CD', 'Scrum', 'XP'],
        imagem: '/Projects/DreamSys.png',
        repo: 'Privado',
        site: 'https://www.dreamsys.com.br/',
        ano: 2025,
        destaque: true,
        linguagens: 'JavaScript (Node.js)',
        status: 'Em desenvolvimento',
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
        imagem: '/ProjectPlaceholder.png',
        repo: '',
        site: '',
        ano: 2024,
        linguagens: 'JavaScript (Node.js)',
        status: 'Concluído',
        tipo: 'Aplicação Financeira',
    },
    {
        id: 'site-filmes-tmdb',
        slug: 'site-filmes-tmdb',
        titulo: 'Site de Filmes (API TMDB)',
        descricao:
            `Web app que integra a API do TheMovieDB para busca de filmes,
            exibição de sinopses e avaliações.`,
        tags: ['API', 'TheMovieDB', 'JavaScript', 'HTML'],
        imagem: '/ProjectPlaceholder.png',
        repo: '',
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
        imagem: '/ProjectPlaceholder.png',
        repo: '',
        site: '',
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
        imagem: '/ProjectPlaceholder.png',
        repo: '',
        site: '',
        ano: 2023,
        linguagens: 'HTML, CSS',
        status: 'Concluído',
        tipo: 'Website Institucional',
    },
    {
        id: 'landing-v2',
        slug: 'landing-page-v2',
        titulo: 'Landing Page V2',
        descricao:
            'Refatoração da landing page utilizando Next.js 14, App Router e Tailwind, com Lighthouse 95+.',
        tags: ['Next.js', 'React', 'TailwindCSS', 'SEO'],
        imagem: '/ProjectPlaceholder.png',
        repo: 'https://github.com/seu-usuario/landing-page-v2',
        site: 'https://seu-dominio.com/landing-v2',
        ano: 2025,
        destaque: true,
        linguagens: 'JavaScript, TypeScript',
        status: 'Concluído',
        tipo: 'Landing Page',
    },
    {
        id: 'portfolio',
        slug: 'portfolio-pessoal',
        titulo: 'Portfólio Pessoal',
        descricao:
            'Site pessoal com blog e listagem de projetos, geração estática e comentários via GitHub Issues.',
        tags: ['Next.js', 'MDX', 'Vercel', 'Analytics'],
        imagem: '/ProjectPlaceholder.png',
        repo: 'https://github.com/seu-usuario/portfolio',
        site: 'https://seu-dominio.com',
        ano: 2024,
        linguagens: 'JavaScript, TypeScript',
        status: 'Em andamento',
        tipo: 'Portfólio',
    },
    {
        id: 'api-tasks',
        slug: 'api-tasks',
        titulo: 'API de Tasks',
        descricao:
            'API REST de tarefas com autenticação JWT e persistência em Postgres, deploy no Railway.',
        tags: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
        imagem: '/ProjectPlaceholder.png',
        repo: 'https://github.com/seu-usuario/api-tasks',
        site: 'https://api-tasks.exemplo.app/docs',
        ano: 2023,
        linguagens: 'JavaScript, TypeScript',
        status: 'Concluído',
        tipo: 'API',
    },
];

/**
 * Utilitário opcional para buscar um projeto pelo slug
 * @param {string} slug
 * @returns {Projeto | undefined}
 */
export const getProjetoPorSlug = (slug) =>
    listaDeProjetos.find((p) => p.slug === slug);

// Exemplo de import em Projeto.tsx:
// import { listaDeProjetos, getProjetoPorSlug } from '@/components/Projects/ListaDeProjetos';