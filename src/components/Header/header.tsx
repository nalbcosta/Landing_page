"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import { NAV } from "public/constants/nav";
import useActiveSection from "../../hooks/useActiveSection";
import useScrollLock from "../../hooks/useScrollLock";

export default function Header() {
	const [open, setOpen] = useState(false);
	const sections = useMemo(() => ["#hero", "#projects", "#last-jobs", "#qualifications", "#contact"], []);
	const headerRef = useRef<HTMLElement | null>(null);

	useScrollLock(open);
	const activeSection = useActiveSection(sections, headerRef);

	return (
		<header ref={headerRef} className={styles.header} role="navigation" aria-label="Primary">
			<div className={styles.inner}>
				<Link href="#hero" className={styles.brand} aria-label="Go to top" onClick={() => setOpen(false)}>
					<span className={styles.logo} aria-hidden>
						<Image src="/logo.png" alt="" width={48} height={48} priority />
						<span className={styles.brandText}>
							<span className={styles.brandStrong}>Nalbert</span>
							<span className={styles.brandLight}> Costa.</span>
						</span>
					</span>
				</Link>

				<nav className={styles.nav} aria-label="Main menu">
					<ul className={styles.menu}>
						{NAV.map((item) => (
							<li key={item.href}>
								<a
									href={item.href}
									className={`${styles.link} ${activeSection === item.href ? styles.active : ""}`}
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
									className={`${styles.mobileLink} ${activeSection === item.href ? styles.mobileActive : ""}`}
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

