"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Project.module.css";
import { listaDeProjetos } from './ListaDeProjetos'
import Image from "next/image";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const isValidExternalUrl = (value?: string) => {
    if (!value) return false;
    return /^https?:\/\//i.test(value.trim());
};

const Projects: React.FC = () => {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [activePage, setActivePage] = useState(0);

    const updateNavState = () => {
        const el = trackRef.current;
        if (!el) return;

        const maxScrollLeft = el.scrollWidth - el.clientWidth;
        const step = Math.max(1, Math.round(el.clientWidth * 0.9));

        setCanPrev(el.scrollLeft > 4);
        setCanNext(el.scrollLeft < maxScrollLeft - 4);

        // number of pages based on the scroll step used for navigation
        const pages = Math.max(1, Math.ceil((el.scrollWidth - el.clientWidth) / step) + 1);
        setTotalPages(pages);
        setActivePage(Math.min(pages - 1, Math.round(el.scrollLeft / step)));
    };

    useEffect(() => {
        updateNavState();

        const handleResize = () => updateNavState();
        window.addEventListener("resize", handleResize);

        const el = trackRef.current;
        el?.addEventListener("scroll", updateNavState, { passive: true });

        return () => {
            window.removeEventListener("resize", handleResize);
            el?.removeEventListener("scroll", updateNavState);
        };
    }, []);

    const scrollByCard = (direction: "prev" | "next") => {
        const el = trackRef.current;
        if (!el) return;

        const amount = Math.max(1, Math.round(el.clientWidth * 0.9));
        el.scrollBy({ left: direction === "next" ? amount : -amount, behavior: "smooth" });
    };

    const scrollToPage = (page: number) => {
        const el = trackRef.current;
        if (!el) return;
        const step = Math.max(1, Math.round(el.clientWidth * 0.9));
        el.scrollTo({ left: page * step, behavior: "smooth" });
    };

    const handleTrackKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollByCard("next");
        }
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollByCard("prev");
        }
    };

    return (
        <section id="projects" className={styles.wrapper}>
            <div className={styles.inner}>
                <div className={styles.sectionHeader}>
                    <p className={styles.eyebrow} style={{display: "none"}}>Portfolio</p>
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
            </div>
        </section>
    );
};

export default Projects;
