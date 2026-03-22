import { useEffect, useState } from "react";

interface UseLanguagesOptions {
    itemCount: number;
    cardWidth?: number;
    gap?: number;
    speed?: number;
    isDuplicated?: boolean;
}

export function useLanguages({
    itemCount,
    cardWidth = 110,
    gap = 16,
    speed = 20,
    isDuplicated = true,
}: UseLanguagesOptions) {
    const [isPaused, setIsPaused] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduceMotion(mq.matches);
        const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    const actualItemCount = isDuplicated ? itemCount * 2 : itemCount;
    const trackWidth = actualItemCount * (cardWidth + gap);

    const duration = Math.round((trackWidth / 2) / speed);
    
    return {
        isPaused: isPaused || reduceMotion,
        duration,
        pause: () => setIsPaused(true),
        resume: () => setIsPaused(false),
    };
}
