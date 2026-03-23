import { useEffect, useRef, useState } from "react";

export function useProjects() {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [activePage, setActivePage] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    const updateNavState = () => {
        const el = trackRef.current;
        if (!el) return;

        const maxScrollLeft = el.scrollWidth - el.clientWidth;

        setCanPrev(el.scrollLeft > 4);
        setCanNext(el.scrollLeft < maxScrollLeft - 4);

        const pages = maxScrollLeft > 4
            ? Math.round(el.scrollWidth / el.clientWidth)
            : 1;
        setTotalPages(pages);

        const step = pages > 1 ? maxScrollLeft / (pages - 1) : 1;
        setActivePage(Math.min(pages - 1, Math.round(el.scrollLeft / step)));
    };

    useEffect(() => {
        setIsMounted(true);
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
        const maxScrollLeft = el.scrollWidth - el.clientWidth;
        const pages = maxScrollLeft > 4 ? Math.round(el.scrollWidth / el.clientWidth) : 1;
        const step = pages > 1 ? maxScrollLeft / (pages - 1) : 0;
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

    return {
        trackRef,
        canPrev,
        canNext,
        totalPages,
        activePage,
        scrollByCard,
        scrollToPage,
        handleTrackKeyDown,
    };
}
