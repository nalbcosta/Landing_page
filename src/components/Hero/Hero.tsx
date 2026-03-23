"use client";

import { useMemo, useRef } from "react";
import styles from "./Hero.module.css";
import { ROLES, TECH_TAGS } from "public/constants/hero";
import { Props } from "public/types/hero.types";
import useTypewriter from "public/hooks/useTypewriter";
import Hero3D from "./Hero3D";

export default function Hero({ name = "Nalbert Costa", tags }: Props) {
    const roles = useMemo(() => ROLES.map((r) => r.name ?? "").filter(Boolean), []);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const visible = useTypewriter(roles, 85, 1200);
    const tech = tags ?? TECH_TAGS.flatMap((t) => t.tags ?? []);

    return (
        <section
            ref={containerRef}
            id="hero"
            aria-label="Hero"
            className={styles.hero}
            role="banner"
        >
            <Hero3D />
            <div className={styles.bg} aria-hidden />
            <div className={styles.glow} aria-hidden />
            <div className={styles.content}>
                <p className={styles.eyebrow}>Portfolio • Desenvolvedor Full-Stack</p>

                <h1 className={styles.title}>
                    {name}
                </h1>

                <h2 className={styles.subtitle}>
                    Sou {" "}
                    <span className={styles.typing}>
                        {visible}
                        <span className={styles.caret} aria-hidden />
                    </span>
                </h2>

                <p className={styles.lead}>
                    Construo produtos web rápidos, acessíveis e escaláveis.
                    Transformo ideias em experiências claras, com foco em performance e qualidade de código.
                </p>

                <div className={styles.actions}>
                    <a className={`${styles.btn} ${styles.btnPrimary}`} href="#projects">
                        Ver projetos
                    </a>
                    <a className={`${styles.btn} ${styles.btnGhost}`} href="#contact">
                        Entrar em contato
                    </a>
                </div>

                <ul className={styles.chips} aria-label="Tecnologias que uso">
                    {tech.map((t) => (
                        <li key={t} className={styles.chip}>
                            {t}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
