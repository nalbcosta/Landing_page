import { useEffect } from "react";

export default function useScrollLock(locked: boolean) {
    useEffect(() => {
        const root = document.documentElement;
        const prev = root.style.overflow;
        root.style.overflow = locked ? "hidden" : prev || "";
        return() => {
            root.style.overflow = prev || "";
        }
    }, [locked]);
}