'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Algo deu errado</h1>
        <p className="mt-2 text-muted">Ocorreu um erro ao carregar esta página.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <button onClick={() => reset()} className="btn btn-primary">Tentar novamente</button>
          <Link href="/" className="btn">Voltar para Home</Link>
        </div>
      </div>
    </main>
  );
}