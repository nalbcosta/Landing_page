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

import { FaNodeJs, FaJsSquare, FaReact, FaPython } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiGo } from "react-icons/si";

export const listaDeLinguagens = [
    {
        nome: 'JavaScript',
        icone: FaJsSquare,
        iconSize: 44,
        bg: '#FFF7CC',
        cor: '#E980FC',
    },
    {
        nome: 'TypeScript',
        icone: SiTypescript,
        iconSize: 44,
        bg: '#D6E7FF',
        cor: '#0A2EDE',
    },
    {
        nome: 'React',
        icone: FaReact,
        iconSize: 44,
        bg: '#D3FBFF',
        cor: '#0B8AA8',
    },
    {
        nome: 'Next.js',
        icone: SiNextdotjs,
        iconSize: 44,
        bg: '#EDEDED',
        cor: '#8F3985',
    },
    {
        nome: 'Node.js',
        icone: FaNodeJs,
        iconSize: 44,
        bg: '#E6F6E6',
        cor: '#116149',
    },
    {
        nome: 'Tailwind',
        icone: SiTailwindcss,
        iconSize: 44,
        bg: '#E5FBFF',
        cor: '#38BDF8',
    },
    {
        nome: 'Python',
        icone: FaPython,
        iconSize: 44,
        bg: '#FFF3D9',
        cor: '#3776AB',
    },
    {
        nome: 'Go',
        icone: SiGo,
        iconSize: 44,
        bg: '#D9F7FF',
        cor: '#00ADD8',
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