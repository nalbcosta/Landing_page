'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import styles from './error.module.css';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.root}>
      <div aria-hidden className={styles.blob} />
      {/* <div aria-hidden className={styles.grid} /> */}

      <section className={styles.card}>
        <span className={styles.badge}>
          Erro inesperado
        </span>

        <div className={styles.icon} aria-hidden>
          <FaExclamationTriangle />
        </div>

        <h1 className={styles.title}>Algo deu errado por aqui</h1>

        <p className={styles.description}>
          A página encontrou um problema durante o carregamento. Você pode
          tentar novamente agora ou voltar para a home.
        </p>

        <div className={styles.divider} aria-hidden />

        <div className={styles.actions}>
          <button
            onClick={() => reset()}
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            Tentar novamente
          </button>

          <Link href="/" className={`${styles.btn} ${styles.btnGhost}`}>
            Voltar para Home
          </Link>
        </div>
      </section>
    </main>
  );
}
