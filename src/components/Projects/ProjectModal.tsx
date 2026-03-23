"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { S3Image } from "../S3Image";
import { isValidExternalUrl } from "../../utils/isValidExternalUrl";
import type { Projeto } from "./ListaDeProjetos";
import styles from "./ProjectModal.module.css";
import { BsBoxArrowUpRight, BsCodeSlash, BsX } from "react-icons/bs";

interface Props {
  projeto: Projeto;
  onClose: () => void;
}

export default function ProjectModal({ projeto, onClose }: Props) {
  const [closing, setClosing] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const hasSite = isValidExternalUrl(projeto.site);
  const hasRepo = isValidExternalUrl(projeto.repo);

  function requestClose() {
    setClosing(true);
  }

  // After close animation ends, actually unmount
  function handleAnimationEnd() {
    if (closing) onClose();
  }

  // Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") requestClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Click on backdrop (not panel)
  function onOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) requestClose();
  }

  const modal = (
    <div
      ref={overlayRef}
      className={styles.overlay}
      data-closing={closing}
      onAnimationEnd={handleAnimationEnd}
      onClick={onOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={projeto.titulo}
    >
      <div className={styles.panel} data-closing={closing}>
        {/* Drag handle (mobile) */}
        <div className={styles.handle} aria-hidden>
          <div className={styles.handleBar} />
        </div>

        {/* Scrollable body */}
        <div className={styles.body}>
          {/* Image */}
          <div className={styles.imageWrap}>
            <S3Image
              src={projeto.imagem}
              alt={projeto.titulo}
              className={styles.image}
              fill
              sizes="(max-width: 699px) 100vw, 42vw" width={0} height={0}            />
          </div>

          {/* Info */}
          <div className={styles.content}>
            {/* Header */}
            <div className={styles.headerRow}>
              <div className={styles.titleBlock}>
                <span className={styles.statusBadge}>{projeto.status}</span>
                <h2 className={styles.modalTitle}>{projeto.titulo}</h2>
              </div>
              <button
                className={styles.closeBtn}
                onClick={requestClose}
                aria-label="Fechar"
              >
                <BsX />
              </button>
            </div>

            {/* Meta chips */}
            <div className={styles.meta}>
              <span className={styles.metaChip}>
                <span className={styles.metaLabel}>Ano</span>
                {projeto.ano}
              </span>
              <span className={styles.metaChip}>
                <span className={styles.metaLabel}>Tipo</span>
                {projeto.tipo}
              </span>
              <span className={styles.metaChip}>
                <span className={styles.metaLabel}>Stack</span>
                {projeto.linguagens}
              </span>
            </div>

            <hr className={styles.divider} />

            {/* Description */}
            <p className={styles.description}>{projeto.descricao.trim()}</p>

            {/* Tags */}
            <div className={styles.tags}>
              {projeto.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className={styles.footer}>
          {hasSite ? (
            <a
              href={projeto.site}
              className={`${styles.btn} ${styles.btnPrimary}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsBoxArrowUpRight />
              Ver projeto
            </a>
          ) : (
            <span className={`${styles.btn} ${styles.btnPrimary} ${styles.btnDisabled}`} aria-disabled>
              Sem demo
            </span>
          )}

          {hasRepo ? (
            <a
              href={projeto.repo}
              className={`${styles.btn} ${styles.btnGhost}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsCodeSlash />
              Código
            </a>
          ) : (
            <span className={`${styles.btn} ${styles.btnGhost} ${styles.btnDisabled}`} aria-disabled>
              Repositório privado
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
