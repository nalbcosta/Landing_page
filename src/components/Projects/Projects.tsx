"use client";

import React from "react";
import styles from "./Project.module.css";
import { listaDeProjetos } from './ListaDeProjetos'
import Image from "next/image";

const Projects: React.FC = () => {
    return (
        <section id="projects" className={styles.wrapper}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>My Projects</h2>
                <p className={styles.sectionSubtitle}>A showcase of my work</p>
            </div>

            <div className={styles.carouselviewport} aria-label="Projects carousel">
                <div className={`${styles.carouseltrack} ${styles.grid}`}>
                    {[...listaDeProjetos, ...listaDeProjetos].map((projeto, idx) => (
                        <div key={`${projeto.id}-${idx}`} className={`${styles.card} ${styles.carouselslide}`} aria-hidden={idx >= listaDeProjetos.length}>
                            <div className={styles.cover}>
                                <Image
                                    src={projeto.imagem}
                                    alt={projeto.titulo}
                                    className={styles.coverImg}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    priority={idx === 0}
                                />
                            </div>
                            <div className={styles.content}>
                                <p className={styles.badge}>
                                    {projeto.status}
                                </p>
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.projectTitle}>{projeto.titulo}</h3>
                                <p className={styles.description}>{projeto.descricao}</p>
                                <div className={styles.meta}>
                                    <span>{projeto.ano}</span>
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
                                    <a href={projeto.site} className={`${styles.cta}`} target="_blank" rel="noopener noreferrer">
                                        View Project
                                    </a>
                                    <a href={projeto.repo} className={`${styles.link}`} target="_blank" rel="noopener noreferrer">
                                        View Code
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
