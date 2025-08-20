'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { listaDeLinguagens} from './LanguagesList';
import projectStyles from '../Projects/Project.module.css';

export default function Languages({ className, speed = 40 }: { className?: string; speed?: number }) {
    // Configurações do item (largura fixa para loop suave)
    const ITEM_WIDTH = 112; // px - ícones maiores
    const GAP = 16; // px
    const logicalBase = listaDeLinguagens.length * (ITEM_WIDTH + GAP);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [distance, setDistance] = useState<number>(logicalBase);
    const controls = useAnimation();

    // Duração do loop = distância / velocidade
    const duration = distance / Math.max(10, speed); // evita valores muito lentos

    // Inicia/religa a animação
    const startLoop = async (fromCurrent = false) => {
        if (!fromCurrent) {
            await controls.set({ x: 0 });
        }
        controls.start({
            x: -distance,
            transition: {
                duration,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop',
            },
        });
    };

    useEffect(() => {
        // mede o tamanho real (inclui gap e bordas) para loop perfeito
        const recalc = () => {
            const el = trackRef.current;
            if (!el) return;
            const w = el.scrollWidth;
            if (w > 0) setDistance(w / 2);
        };

    recalc();
    const el = trackRef.current;
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => recalc()) : null;
    if (el && ro) ro.observe(el);
        window.addEventListener('resize', recalc);

        startLoop();

        return () => {
            window.removeEventListener('resize', recalc);
            if (ro) ro.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logicalBase, duration]);

    const items = [...listaDeLinguagens, ...listaDeLinguagens, ...listaDeLinguagens];

    return (
        <section
            id="languages"
            className={`${projectStyles.languagesViewport} ${className ?? ''}`}
            aria-label="Carrossel de linguagens"
            style={{ position: 'relative', padding: '12px 0', boxShadow: '20 10px 15px rgba(124, 3, 124, 0.288), 0 4px 8px -2px rgba(255, 0, 191, 0.2)' }}
        >
            <motion.div
                role="list"
                onHoverStart={() => controls.stop()}
                onHoverEnd={() => startLoop(true)}
                animate={controls}
                className={projectStyles.languagesTrack}
                style={{ gap: `${GAP}px` }}
                ref={trackRef}
            >
                {items.map((lang, idx) => (
            <motion.article
                        role="listitem"
                        key={`${lang.nome}-${idx}`}
                        className={`${projectStyles.languagesSlide} ${projectStyles.languageItem} ${projectStyles.languageBox}`}
                        style={{ width: ITEM_WIDTH, minWidth: ITEM_WIDTH, color: lang.cor }}
                        whileHover={{ y: -8, scale: 1.05 , boxShadow: '0 16px 40px -16px rgba(2, 8, 23, 0.95), 0 0 0 6px var(--ring)' }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                        aria-label={lang.nome}
                        title={lang.nome}
                    >
                        <motion.span
                            className={projectStyles.languageIcon}
                            style={{ color: lang.cor, borderColor: 'rgba(0,0,0,0.06)' }}
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: (idx % listaDeLinguagens.length) * 0.08 }}
                        >
                            {typeof lang.icone === 'function' ? (
                                (() => {
                                    const Icon = lang.icone as React.ElementType;
                                    return <Icon size={lang.iconSize ?? 40} aria-hidden />;
                                })()
                            ) : (
                                lang.icone
                            )}
                        </motion.span>
                    </motion.article>
                ))}
            </motion.div>

            {/* Gradientes nas bordas (fade) */}
            <div
                aria-hidden
                style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <div
                    style={{
                        width: 60,
                        background: 'linear-gradient(to right, rgb(var(--brand-dark-rgb)), rgba(var(--brand-dark-rgb), 0))',
                    }}
                />
                <div
                    style={{
                        width: 60,
                        background: 'linear-gradient(to left, rgb(var(--brand-dark-rgb)), rgba(var(--brand-dark-rgb), 0))',
                    }}
                />
            </div>
        </section>
    )
}
