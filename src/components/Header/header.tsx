"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

type NavItem = {
	label: string;
	href: string;
};

const NAV: NavItem[] = [
	{ label: "Home", href: "#hero" },
	{ label: "Projects", href: "#projects" },
	{ label: "Last Jobs", href: "#last-jobs" },
	{ label: "Qualifications", href: "#qualifications" },
	{ label: "Contact", href: "#contact" },
];

export default function Header() {
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState<string>("#hero");
	const sections = useMemo(() => ["#hero", "#projects", "#last-jobs", "#qualifications", "#contact"], []);
	const headerRef = useRef<HTMLElement | null>(null);

	// close on escape
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	// lock scroll when open
	useEffect(() => {
		const root = document.documentElement;
		if (open) {
			root.style.overflow = "hidden";
		} else {
			root.style.overflow = "";
		}
	}, [open]);

	// Active link highlighting via scroll (robust across the whole page)
	useEffect(() => {
		const sectionEls = sections
			.map((hash) => document.querySelector(hash))
			.filter(Boolean) as HTMLElement[];
		if (!sectionEls.length) return;

		const updateActive = () => {
			const headerH = (headerRef.current?.offsetHeight ?? 72) + 8;
			const top = window.scrollY + headerH;
			let current = "#hero";
			for (const el of sectionEls) {
				const y = el.offsetTop; // absolute to document
				if (y <= top) current = `#${el.id}`;
			}
			setActive(current);
		};

		updateActive();
		window.addEventListener("scroll", updateActive, { passive: true });
		window.addEventListener("resize", updateActive);
		return () => {
			window.removeEventListener("scroll", updateActive);
			window.removeEventListener("resize", updateActive);
		};
	}, [sections]);

	return (
		<header ref={headerRef} className={styles.header} role="navigation" aria-label="Primary">
			<div className={styles.inner}>
				<Link href="#hero" className={styles.brand} aria-label="Go to top" onClick={() => setOpen(false)}>
					<span className={styles.logo} aria-hidden>
						<Image src="/logo.png" alt="" width={28} height={28} priority />
					</span>
				</Link>

				<nav className={styles.nav} aria-label="Main menu">
					<ul className={styles.menu}>
						{NAV.map((item) => (
							<li key={item.href}>
								<a
									href={item.href}
									className={`${styles.link} ${active === item.href ? styles.active : ""}`}
									onClick={() => setOpen(false)}
								>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</nav>

				<button
					type="button"
					className={styles.burger}
					aria-label="Open menu"
					aria-expanded={open}
					aria-controls="mobile-menu"
					onClick={() => setOpen((v) => !v)}
				>
					<span className={styles.burgerBox}>
						<span className={styles.burgerInner} />
					</span>
				</button>
			</div>

			<div id="mobile-menu" className={`${styles.mobile} ${open ? styles.open : ""}`}>
				<div className={styles.mobilePanel}>
					<ul className={styles.mobileMenu}>
						{NAV.map((item) => (
							<li key={item.href}>
								<a
									href={item.href}
									className={`${styles.mobileLink} ${active === item.href ? styles.mobileActive : ""}`}
									onClick={() => setOpen(false)}
								>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</div>
				<button className={styles.scrim} aria-label="Close menu" onClick={() => setOpen(false)} />
			</div>
		</header>
	);
}

