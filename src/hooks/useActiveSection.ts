import { useState, useEffect } from "react";

export default function useActiveSection(sections: string[], headerRef: React.RefObject<HTMLElement | null>) {
    const [active, setActive] = useState<string>(sections[0] || "#hero");

    useEffect(() => {
        const els = sections.map(section => document.querySelector(section)).filter(Boolean) as HTMLElement[];
        if (!els.length) return;

        const update = () => {
            const headerH = (headerRef.current?.offsetHeight ?? 72) + 8;
            const top = window.scrollY + headerH;
            let current = sections[0] || "#hero";
            for (const el of els) {
                if (el.offsetTop <= top) current = `#${el.id}`;
            }
            setActive(current);
        };

        update();

        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [sections, headerRef]);
    return active;
}