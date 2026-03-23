"use client";
import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.root}>
      <div aria-hidden className={styles.blob} />
      {/* <div aria-hidden className={styles.grid} /> */}

      <section className={styles.card}>
        <span className={styles.badge}>
          Erro 404
        </span>

        <p className={styles.code} aria-hidden>404</p>

        <h1 className={styles.title}>Página não encontrada</h1>

        <p className={styles.description}>
          O link pode estar incorreto ou a página foi movida. Use uma das opções
          abaixo para continuar navegando no portfólio.
        </p>

        <div className={styles.divider} aria-hidden />

        <div className={styles.actions}>
          <Link href="/" className={`${styles.btn} ${styles.btnPrimary}`}>
            Voltar para a Home
          </Link>

          <Link href="/#projects" className={`${styles.btn} ${styles.btnGhost}`}>
            Ver projetos
          </Link>
        </div>
      </section>
    </main>
  );
}
