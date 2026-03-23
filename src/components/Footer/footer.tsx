"use client";

import styles from "./Footer.module.css";
import { S3Image } from "../S3Image";
import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
	const [year, setYear] = useState<number | null>(null);

	useEffect(() => {
		setYear(new Date().getFullYear());
	}, []);

	return (
		<footer className={styles.footer} id="footer">
			<div className={styles.inner}>
				<div className={styles.main}>
					{/* ── Brand + social ── */}
					<div className={styles.brand}>
						<a href="#hero" className={styles.brandLink} aria-label="Voltar ao topo">
							<span className={styles.logo} aria-hidden>
								<S3Image src="/logo.png" alt="" width={36} height={36} />
							</span>
							<span className={styles.brandName}>
								<span className={styles.brandStrong}>Nalbert </span>
								<span className={styles.brandLight}>Costa.</span>
							</span>
						</a>

						<p className={styles.tagline}>
							Desenvolvedor Full-Stack focado em soluções modernas e escaláveis.
						</p>

						<div className={styles.social}>
							<a
								className={styles.socialBtn}
								href="https://github.com/nalbcosta"
								target="_blank"
								rel="noreferrer"
								aria-label="GitHub"
							>
								<FaGithub />
							</a>

							<a
								className={styles.socialBtn}
								href="https://www.linkedin.com/in/nalbert-schwank-c-a42b17222"
								target="_blank"
								rel="noreferrer"
								aria-label="LinkedIn"
							>
								<FaLinkedin />
							</a>
						</div>
					</div>

					{/* ── Nav links ── */}
					<nav className={styles.nav} aria-label="Links do rodapé">
						<div className={styles.navGroup}>
							<p className={styles.navLabel}>Navegação</p>
							<ul className={styles.navLinks}>
								<li><a href="#hero">Início</a></li>
								<li><a href="#last-jobs">Experiência</a></li>
								<li><a href="#qualifications">Formação</a></li>
							</ul>
						</div>

						<div className={styles.navGroup}>
							<p className={styles.navLabel}>Portfólio</p>
							<ul className={styles.navLinks}>
								<li><a href="#projects">Projetos</a></li>
								<li><a href="#languages">Tecnologias</a></li>
								<li><a href="#contact">Contato</a></li>
							</ul>
						</div>
					</nav>
				</div>

				{/* ── Bottom bar ── */}
				<div className={styles.bottom}>
					<span className={styles.copyright}>
						© {year} Nalbert Costa. Todos os direitos reservados.
					</span>
					<span className={styles.made}>
						Feito com <a href="https://nextjs.org" target="_blank" rel="noreferrer">Next.js</a> & <a href="https://threejs.org" target="_blank" rel="noreferrer">Three.js</a>
					</span>
				</div>
			</div>
		</footer>
	);
}
