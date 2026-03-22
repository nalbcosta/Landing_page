// src/components/Languages/LanguagesList.js

/**
 * Tipagem JSDoc para melhor DX ao importar em .ts/.tsx
 * @typedef {Object} Linguagem
 * @property {string} nome
 * @property {any} icone
 * @property {string} bg
 * @property {string} cor
 */

/** @type {Linguagem[]} */

import { FaNodeJs, FaJsSquare, FaReact, FaPython, FaDocker } from "react-icons/fa";
import { 
    SiTypescript, 
    SiNextdotjs, 
    SiTailwindcss, 
    SiLaravel,
    SiFastapi,
    SiDjango,
    SiMongodb,
    SiMysql,
    SiPostgresql,
    SiGithubactions,
} from "react-icons/si";

export const listaDeLinguagens = [
    // ── Frontend ────────────────────────
    {
        nome: 'JavaScript',
        icone: FaJsSquare,
        iconSize: 44,
        bg: '#FFF7CC',
        cor: '#F7DF1E',
    },
    {
        nome: 'TypeScript',
        icone: SiTypescript,
        iconSize: 44,
        bg: '#D6E7FF',
        cor: '#3178C6',
    },
    {
        nome: 'React',
        icone: FaReact,
        iconSize: 44,
        bg: '#E0F7FA',
        cor: '#61DAFB',
    },
    {
        nome: 'Next.js',
        icone: SiNextdotjs,
        iconSize: 44,
        bg: '#F0F0F0',
        cor: '#FFFFFF',
    },
    {
        nome: 'Tailwind',
        icone: SiTailwindcss,
        iconSize: 44,
        bg: '#E0F2FE',
        cor: '#06B6D4',
    },

    // ── Backend ────────────────────────
    {
        nome: 'Node.js',
        icone: FaNodeJs,
        iconSize: 44,
        bg: '#E8F5E9',
        cor: '#68A063',
    },
    {
        nome: 'Python',
        icone: FaPython,
        iconSize: 44,
        bg: '#F3E5F5',
        cor: '#3776AB',
    },
    {
        nome: 'FastAPI',
        icone: SiFastapi,
        iconSize: 44,
        bg: '#E8F5E9',
        cor: '#109989',
    },
    {
        nome: 'Django',
        icone: SiDjango,
        iconSize: 44,
        bg: '#FCE4EC',
        cor: '#092E20',
    },
    {
        nome: 'Laravel',
        icone: SiLaravel,
        iconSize: 44,
        bg: '#F3E5F5',
        cor: '#FF2D20',
    },

    // ── Database ────────────────────────
    {
        nome: 'MongoDB',
        icone: SiMongodb,
        iconSize: 44,
        bg: '#E8F5E9',
        cor: '#13AA52',
    },
    {
        nome: 'MySQL',
        icone: SiMysql,
        iconSize: 44,
        bg: '#E3F2FD',
        cor: '#00758F',
    },
    {
        nome: 'PostgreSQL',
        icone: SiPostgresql,
        iconSize: 44,
        bg: '#F3E5F5',
        cor: '#336791',
    },

    // ── DevOps & Tools ────────────────────────
    {
        nome: 'Docker',
        icone: FaDocker,
        iconSize: 44,
        bg: '#E3F2FD',
        cor: '#2496ED',
    },
    {
        nome: 'CI/CD',
        icone: SiGithubactions,
        iconSize: 44,
        bg: '#F3E5F5',
        cor: '#2088FF',
    },
];

/**
 * Utilitário opcional para buscar uma linguagem pelo nome
 * @param {string} nome
 * @returns {Linguagem | undefined}
 */
export const getLinguagemPorNome = (nome : string) =>
    listaDeLinguagens.find((l) => l.nome === nome);

// Exemplo de import em Languages.tsx:
// import { listaDeLinguagens, getLinguagemPorNome } from '@/components/Languages/LanguagesList';