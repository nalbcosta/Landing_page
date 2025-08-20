"use client";

import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";

export default function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className={styles.footer} id="footer">
			<div className={styles.inner}>
				<div className={styles.top}>
					<a href="#hero" className={styles.brand} aria-label="Back to top">
						<span className={styles.logo} aria-hidden>
							<Image src="/logo.png" alt="" width={28} height={28} />
						</span>
						<span className={styles.tagline}>Let’s build something great together.</span>
					</a>
				</div>

				<div className={styles.bottom}>
					<div className={styles.meta}>
						<span>© {year} Nalbert Costa</span>
						<span>Made with Next.js</span>
					</div>
					<div className={styles.social}>
						<a className={styles.socialBtn} href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
								<path d="M12 .5C5.73.5.98 5.25.98 11.52c0 4.86 3.15 8.98 7.52 10.43.55.1.75-.24.75-.53 0-.26-.01-1.12-.02-2.04-3.06.66-3.71-1.3-3.71-1.3-.5-1.26-1.22-1.6-1.22-1.6-.99-.68.07-.66.07-.66 1.1.08 1.67 1.13 1.67 1.13.98 1.66 2.57 1.18 3.2.9.1-.71.38-1.18.69-1.45-2.44-.28-5-1.22-5-5.43 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.02 1.13.88-.24 1.83-.36 2.77-.36.94 0 1.9.12 2.78.36 2.1-1.43 3.02-1.13 3.02-1.13.6 1.52.22 2.64.11 2.92.7.77 1.13 1.75 1.13 2.95 0 4.22-2.56 5.15-5 5.43.39.34.73 1.01.73 2.05 0 1.48-.01 2.67-.01 3.04 0 .29.2.64.76.53 4.36-1.46 7.51-5.58 7.51-10.43C23.02 5.25 18.27.5 12 .5z"/>
							</svg>
						</a>
						<a className={styles.socialBtn} href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
								<path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4zM8.5 8.5h3.8v2.1h.05c.53-1 1.82-2.1 3.75-2.1 4.01 0 4.75 2.64 4.75 6.08V24h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.5V24h-4z"/>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}

