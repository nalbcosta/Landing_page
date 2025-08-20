# Meu portfólio — site pessoal construído com Next.js
Este repositório contém meu portfólio pessoal, implementado com o novo App Router do Next.js e componentes organizados em `src/components`.

## Sobre

O site apresenta uma página inicial, seção de projetos, últimas experiências e informações de contato. É uma vitrine objetiva do meu trabalho e das tecnologias que utilizo.

Principais pontos:
- Layout baseado em `app/` (App Router).
- Componentes reutilizáveis em `src/components/`.
- Ativos públicos em `public/` (imagens, ícones, etc.).

## Tecnologias

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- PostCSS

## Rodando localmente

Pré-requisitos: Node.js (versão LTS) e npm.

No PowerShell, execute:

```powershell
npm install
npm run dev
```

O site ficará disponível em http://localhost:3000.

Arquivos principais para editar:
- `app/page.tsx` — página principal
- `app/layout.tsx` — layout global
- `src/components/*` — componentes (Header, Footer, Hero, etc.)

## Estrutura do projeto (resumo)

- `app/` — entradas do App Router (`page.tsx`, `layout.tsx`, etc.)
- `src/components/` — componentes React utilizados pelo site
- `public/` — imagens e assets estáticos
- `next.config.ts`, `tailwind.config.js`, `tsconfig.json` — configuração do projeto

## Deploy

Recomendo usar o Vercel para deploy contínuo (integração com GitHub). O site usa as otimizações nativas do Next.js e funciona sem configurações extras em Vercel.

## Como contribuir / editar

- Faça um fork ou branche, edite os arquivos em `app/` e `src/components/` e abra um Pull Request.
- Para mudanças visuais, atualize os estilos em `src/components/*` ou `globals.css`.

## Contato

Se quiser falar sobre um projeto, oportunidade ou dar feedback, abra uma issue neste repositório ou adicione um Pull Request com suas sugestões.

---

README gerado para descrever este repositório como um portfólio pessoal. Arquivos-chave: `app/page.tsx`, `src/components/`.
