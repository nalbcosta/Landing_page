"use client";

import React from "react";
import { listaDeLinguagens } from "./LanguagesList";
import { useLanguages } from "../../hooks/useLanguages";
import styles from "./Languages.module.css";

const CARD_WIDTH = 110;
const GAP = 16;

export default function Languages() {
    const { isPaused, duration, pause, resume } = useLanguages({
        itemCount: listaDeLinguagens.length,
        cardWidth: CARD_WIDTH,
        gap: GAP,
    });

    // Seamless infinite loop com duas cópias
    const items = [...listaDeLinguagens, ...listaDeLinguagens, ...listaDeLinguagens, ...listaDeLinguagens];

    return (
        <section id="languages" className={styles.section}>
            <div className={styles.header}>
                <p className={styles.eyebrow}>Stack de Tecnologias</p>
                <h2 className={styles.title}>Habilidades</h2>
                <p className={styles.subtitle}>
                    Tecnologias que uso para construir produtos web modernos, escaláveis e performáticos.
                </p>
            </div>

            <div className={styles.marqueeWrapper}>
                <div
                    className={styles.track}
                    data-paused={isPaused}
                    onMouseEnter={pause}
                    onMouseLeave={resume}
                    aria-label="Carrossel de habilidades técnicas"
                    role="list"
                    style={{
                        "--marquee-duration": `${duration}s`,
                        "--track-gap": `${GAP}px`,
                        "--card-w": `${CARD_WIDTH}px`,
                    } as React.CSSProperties}
                >
                    {items.map((lang, idx) => {
                        const Icon = lang.icone as React.ElementType;
                        const isClone = idx >= listaDeLinguagens.length;

                        return (
                            <div
                                key={`${lang.nome}-${idx}`}
                                className={styles.card}
                                role="listitem"
                                aria-label={`Habilidade: ${lang.nome}`}
                                aria-hidden={isClone}
                                title={lang.nome}
                            >
                                <span
                                    className={styles.icon}
                                    style={{ color: lang.cor }}
                                    role="img"
                                    aria-hidden="true"
                                >
                                    <Icon size={lang.iconSize ?? 40} />
                                </span>
                                <span className={styles.label}>{lang.nome}</span>
                            </div>
                        );
                    })}
                </div>

                <div className={styles.fadeLeft} aria-hidden="true" />
                <div className={styles.fadeRight} aria-hidden="true" />
            </div>
        </section>
    );
}