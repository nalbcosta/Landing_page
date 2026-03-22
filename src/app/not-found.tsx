"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-screen items-center justify-center px-6 py-24">
      <div className="text-center">
        <span className="inline-block rounded-full border border-[rgba(242,239,233,0.15)] bg-[rgba(8,9,10,0.4)] px-3 py-1 text-xs text-[rgba(242,239,233,0.9)] shadow">
          Erro 404
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[rgb(var(--brand-cream-rgb))] sm:text-5xl h1-gradient">
          Página não encontrada
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[rgba(var(--brand-muted-rgb),1)]">
          Desculpe, não encontramos o que você procura. O link pode estar incorreto ou a página foi movida.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Voltar para a Home
          </Link>
          <Link href="/#projects" className="btn">
            Ver projetos
          </Link>
        </div>
      </div>
    </main>
  );
}
