"use client";

import React from "react";
import styles from "./Project.module.css";
import { listaDeProjetos } from './ListaDeProjetos'
import Image from "next/image";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Projects3D from "./Projects3D";
import { isValidExternalUrl } from "../../utils/isValidExternalUrl";
import { useProjects } from "../../hooks/useProjects";

const Projects: React.FC = () => {
    const {
        trackRef,
        canPrev,
        canNext,
        totalPages,
        activePage,
        scrollByCard,
        scrollToPage,
        handleTrackKeyDown,
    } = useProjects();

    return (
        <section id="projects" className={styles.wrapper}>
            <div className={styles.inner}>
                <div className={styles.sectionHeader}>
                    <p className={styles.eyebrow}>Portfolio</p>
                    <h2 className={styles.sectionTitle}>Meus Projetos</h2>
                    <p className={styles.sectionSubtitle}>Seleção de trabalhos com foco em produto, performance e qualidade de código.</p>
                </div>

                <div className={styles.carousel}>
                    <button
                        type="button"
                        className={styles.navBtn}
                        onClick={() => scrollByCard("prev")}
                        disabled={!canPrev}
                        aria-label="Ver projetos anteriores"
                    >
                        <BsArrowLeft />
                    </button>

                    <div
                        ref={trackRef}
                        className={styles.grid}
                        aria-label="Lista de projetos"
                        tabIndex={0}
                        onKeyDown={handleTrackKeyDown}
                    >
                    {listaDeProjetos.map((projeto, idx) => {
                        const hasSite = isValidExternalUrl(projeto.site);
                        const hasRepo = isValidExternalUrl(projeto.repo);

                        return (
                        <article key={projeto.id} className={styles.card}>
                            <div className={styles.cover}>
                                <Image
                                    src={projeto.imagem}
                                    alt={projeto.titulo}
                                    className={styles.coverImg}
                                    fill
                                    sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority={idx === 0}
                                />
                                <p className={styles.badge}>{projeto.status}</p>
                            </div>

                            <div className={styles.content}>
                                <h3 className={styles.projectTitle}>{projeto.titulo}</h3>
                                <p className={styles.description}>{projeto.descricao}</p>

                                <div className={styles.meta}>
                                    <span>{projeto.ano}</span>
                                    <span>•</span>
                                    <span>{projeto.tipo}</span>
                                </div>

                                <div className={styles.tags}>
                                    {projeto.tags.map((tag) => (
                                        <span key={tag} className={styles.tag}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className={styles.actions}>
                                    {hasSite ? (
                                        <a href={projeto.site} className={styles.cta} target="_blank" rel="noopener noreferrer">
                                            Ver projeto
                                        </a>
                                    ) : (
                                        <span className={`${styles.cta} ${styles.disabled}`} aria-disabled>
                                            Sem demo
                                        </span>
                                    )}

                                    {hasRepo ? (
                                        <a href={projeto.repo} className={styles.link} target="_blank" rel="noopener noreferrer">
                                            Código
                                        </a>
                                    ) : (
                                        <span className={`${styles.link} ${styles.disabled}`} aria-disabled>
                                            Repositório privado
                                        </span>
                                    )}
                                </div>
                            </div>
                        </article>
                    )})}
                    </div>

                    <button
                        type="button"
                        className={styles.navBtn}
                        onClick={() => scrollByCard("next")}
                        disabled={!canNext}
                        aria-label="Ver próximos projetos"
                    >
                        <BsArrowRight />
                    </button>
                </div>
            </div>

            <div className={styles.meshBand}>
                <Projects3D />
            </div>

            {totalPages > 1 && (
                <div className={styles.dots} role="tablist" aria-label="Paginação de projetos">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            role="tab"
                            aria-selected={activePage === index}
                            aria-label={`Ir para página ${index + 1}`}
                            className={`${styles.dot} ${activePage === index ? styles.dotActive : ""}`}
                            onClick={() => scrollToPage(index)}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Projects;
