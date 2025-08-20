"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Hero.module.css";

type Props = {
    name?: string;
    tags?: string[];
};

const ROLES = [
    "Desenvolvedor Pleno Python",
    "Full‑Stack Developer",
    "TechLead",
    "Frontend Developer"
];

export default function Hero({ name = "Nalbert Costa", tags }: Props) {
    const roles = useMemo(() => ROLES, []);
    const [roleIndex, setRoleIndex] = useState(0);
    const [cursor, setCursor] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const [paused, setPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Typewriter loop
    useEffect(() => {
        if (paused) return;
        const current = roles[roleIndex];
        const atWordEnd = cursor === current.length;
        const atWordStart = cursor === 0;

        const baseDelay = deleting ? 40 : 85;
        const jitter = Math.random() * 40;
        const delay = baseDelay + jitter;

        const t = setTimeout(() => {
            if (!deleting) {
                if (cursor < current.length) {
                    setCursor((c) => c + 1);
                } else {
                    setPaused(true);
                    setTimeout(() => {
                        setPaused(false);
                        setDeleting(true);
                    }, 1200);
                }
            } else {
                if (cursor > 0) {
                    setCursor((c) => c - 1);
                } else {
                    setDeleting(false);
                    setRoleIndex((i) => (i + 1) % roles.length);
                }
            }
        }, atWordEnd || atWordStart ? 140 : delay);

        return () => clearTimeout(t);
    }, [cursor, deleting, paused, roleIndex, roles]);

    // Parallax glow follows cursor
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            el.style.setProperty("--mx", `${(x - 0.5) * 60}px`);
            el.style.setProperty("--my", `${(y - 0.5) * 60}px`);
        };
        const onLeave = () => {
            el.style.setProperty("--mx", `0px`);
            el.style.setProperty("--my", `0px`);
        };

        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        return () => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    const visible = roles[roleIndex].slice(0, cursor);
    const tech = tags ?? ["Python", "Django", "TypeScript", "React", "Next.js", "Node.js"];

    return (
        <section
            ref={containerRef}
            id="hero"
            aria-label="Hero"
            className={styles.hero}
            role="banner"
        >
            <div className={styles.bg} aria-hidden />
            <div className={styles.glow} aria-hidden />
            <div className={styles.grid} aria-hidden />
            <div className={styles.content}>
                <div className={styles.badge} style={{ display: "none" }}>
                    <span className={styles.dot} />
                    Available for hire
                </div>

                <h1 className={styles.title}>
                    <span className={styles.wave} aria-hidden>
                        👋
                    </span>
                    Olá, eu sou {name}
                </h1>

                <h2 className={styles.subtitle}>
                    Sou {" "}
                    <span className={styles.typing}>
                        {visible}
                        <span className={styles.caret} aria-hidden />
                    </span>
                </h2>

                <p className={styles.lead}>
                    Desenvolvo aplicações web modernas com foco em performance, usabilidade e
                    manutenibilidade. Tenho paixão por criar experiências de usuário fluídas e
                    soluções escaláveis.
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
