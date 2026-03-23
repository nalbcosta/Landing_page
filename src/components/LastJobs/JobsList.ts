// Static list of recent jobs to be consumed by LastJobs component
// Logos should be placed in /public and referenced by absolute path (e.g., "/vercel.svg")

const JOBS = [
  {
    id: "job-3",
    company: "Prefeitura de Aracaju - COGETIN",
    role: "Desenvolvedor Full-Stack Pleno",
    start: "2026-01",
    end: "Atual",
    location: "Presencial",
    url: "https://aracaju.se.gov.br",
    description: `
      Atuação no desenvolvimento e manutenção de sistemas internos e do aplicativo IntegrAju, 
      garantindo estabilidade, novas funcionalidades e publicação contínua nas lojas Android e iOS.
      Foco em soluções escaláveis para alto volume de acessos da população, facilitando abertura de processos, denúncias e outros serviços digitais.
      Desenvolvimento de um sistema completo de gestão de senhas/tickets para o evento municipal "Tamo Junto", 
      incluindo geração de senhas, painéis de atendimento, filas em tempo real e integrações para mais de 80 serviços.
    `,
    tech: ["PHP", "Laravel", "VueJS", "MySQL", "Docker", "CI/CD", "Linux"],
    logo: "/Prefeitura de Aracaju.png",
  },
  {
    id: "job-2",
    company: "QuickEAM",
    role: "Desenvolvedor Full-Stack Python - Pleno",
    start: "2025-06",
    end: "2026-01",
    location: "Presencial",
    url: "https://quickeam.com",
    description: `
      Desenvolvimento e manutenção de soluções backend em Python, com foco em Django, APIs REST e integrações com sistemas industriais.
      Implementação de novas funcionalidades, melhorias contínuas de performance e confiabilidade em serviços críticos.
      Criação e manutenção de interfaces de usuário em React, alinhadas a requisitos de usabilidade e experiência do usuário.
    `,
    tech: ["Python", "Django", "REST APIs", "PostgreSQL", "Docker", "React"],
    logo: "/QuickEAM.png",
  },
  {
    id: "job-1",
    company: "Grupo JL",
    role: "Estagiário de Desenvolvimento/Suporte",
    start: "2024-06",
    end: "2024-12",
    location: "Presencial",
    description: `
      Desenvolvimento de funcionalidades em sistemas internos utilizando JavaScript e Node.js, com foco em automação de processos.
      Suporte técnico a usuários, diagnosticando e resolvendo problemas relacionados a hardware, software e rede.
      Uso de Express.js e MongoDB para criação e manutenção de APIs e bancos de dados, integrando diferentes sistemas de backend.
    `,
    tech: ["MongoDB", "React", "NodeJS", "Express", "JavaScript"],
    logo: "/GrupoJL.png",
  },
];


export default JOBS;

