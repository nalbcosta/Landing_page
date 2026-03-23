import { useEffect, useState } from "react";

export default function useTypewriter(words: string[], typingSpeed = 100, pauseDuration = 1500) {
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (!words || words.length === 0) return;
        if (paused) return;

        const current = words[wordIndex];
        const atWordEnd = !deleting && charIndex === current.length;
        const atWordStart = deleting && charIndex === 0;

        const baseDelay = deleting ? typingSpeed / 2 : typingSpeed;
        const jitter = Math.random() * (typingSpeed / 2);
        const delay = atWordEnd || atWordStart ? pauseDuration : baseDelay + jitter;

        const typing = setTimeout(() => {
            if (!deleting) {
                if (charIndex < current.length) {
                    setCharIndex((c) => c + 1);
                } else {
                    setPaused(true);
                    setTimeout(() => {
                        setPaused(false);
                        setDeleting(true);
                    }, pauseDuration);
                }
            } else {
                if (charIndex > 0) {
                    setCharIndex((c) => c - 1);
                } else {
                    setDeleting(false);
                    setWordIndex((w) => (w + 1) % words.length);
                }
            }
        }, delay);

        return () => clearTimeout(typing);
    }, [charIndex, deleting, paused, wordIndex, words, typingSpeed, pauseDuration]);

    return words && words.length > 0 ? words[wordIndex].slice(0, charIndex) : "";
}