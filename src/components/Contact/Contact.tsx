"use client";

import React, { useMemo, useState } from "react";
import styles from "./Contact.module.css";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
	to?: string;
	github?: string;
	linkedin?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const fadeUp = {
	hidden: { opacity: 0, y: 12 },
	show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
	exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

export default function Contact({
	to = "ola@seudominio.com",
	github = "https://github.com/",
	linkedin = "https://www.linkedin.com/in/",
}: Props) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
	const [sent, setSent] = useState(false);

	const canSubmit = useMemo(
		() => name.trim().length >= 2 && EMAIL_RE.test(email) && message.trim().length >= 10,
		[name, email, message]
	);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const next: typeof errors = {};
		if (name.trim().length < 2) next.name = "Informe seu nome";
		if (!EMAIL_RE.test(email)) next.email = "E-mail inválido";
		if (message.trim().length < 10) next.message = "Mensagem muito curta (mín. 10 caracteres)";
		setErrors(next);
		if (Object.keys(next).length) return;

		const subject = encodeURIComponent(`Contato do site — ${name.trim()}`);
		const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()} (${email.trim()})`);
		window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
		setSent(true);
	};

	const reset = () => {
		setName("");
		setEmail("");
		setMessage("");
		setErrors({});
		setSent(false);
	};

	return (
		<section id="contact" className={styles.wrapper} aria-labelledby="contact-title">
			<div className={styles.inner}>
				<header className={styles.header}>
					<p className={styles.eyebrow}>Contato</p>
					<h2 id="contact-title" className={styles.title}>Vamos conversar</h2>
					<p className={styles.subtitle}>
						Gostou do que viu? Envie uma mensagem e eu retorno em breve.
					</p>
				</header>

				<div className={styles.grid}>
					{/* ── Form card ── */}
					<div className={styles.card}>
						<AnimatePresence mode="wait">
							{sent ? (
								<motion.div
									key="sent"
									className={styles.sentState}
									variants={fadeUp}
									initial="hidden"
									animate="show"
									exit="exit"
								>
									<div className={styles.sentIcon} aria-hidden>
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
											<polyline points="20 6 9 17 4 12" />
										</svg>
									</div>
									<h3 className={styles.sentTitle}>Mensagem enviada!</h3>
									<p className={styles.sentText}>
										Seu cliente de e-mail foi aberto com a mensagem pronta.<br />
										Assim que enviar, retorno o mais breve possível.
									</p>
									<button className={styles.sentReset} onClick={reset} type="button">
										Enviar outra mensagem
									</button>
								</motion.div>
							) : (
								<motion.form
									key="form"
									onSubmit={onSubmit}
									noValidate
									variants={fadeUp}
									initial="hidden"
									animate="show"
									exit="exit"
									style={{ display: "contents" }}
								>
									<div className={styles.field}>
										<label htmlFor="name">Nome</label>
										<input
											id="name"
											name="name"
											type="text"
											placeholder="Seu nome completo"
											value={name}
											onChange={(e) => setName(e.target.value)}
											aria-invalid={!!errors.name}
											aria-describedby={errors.name ? "name-error" : undefined}
											required
										/>
										{errors.name && (
											<span id="name-error" role="alert" className={styles.error}>{errors.name}</span>
										)}
									</div>

									<div className={styles.field}>
										<label htmlFor="email">E-mail</label>
										<input
											id="email"
											name="email"
											type="email"
											placeholder="voce@exemplo.com"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											aria-invalid={!!errors.email}
											aria-describedby={errors.email ? "email-error" : undefined}
											required
										/>
										{errors.email && (
											<span id="email-error" role="alert" className={styles.error}>{errors.email}</span>
										)}
									</div>

									<div className={styles.field}>
										<label htmlFor="message">Mensagem</label>
										<textarea
											id="message"
											name="message"
											rows={5}
											placeholder="Conte sobre seu projeto ou ideia..."
											value={message}
											onChange={(e) => setMessage(e.target.value)}
											aria-invalid={!!errors.message}
											aria-describedby={errors.message ? "message-error" : undefined}
											required
										/>
										{errors.message && (
											<span id="message-error" role="alert" className={styles.error}>{errors.message}</span>
										)}
									</div>

									<div className={styles.actions}>
										<button className={styles.btnPrimary} type="submit" disabled={!canSubmit}>
											Enviar mensagem
										</button>
										<a className={styles.btnGhost} href={`mailto:${to}`}>
											E-mail direto
										</a>
									</div>
								</motion.form>
							)}
						</AnimatePresence>
					</div>

					{/* ── Info aside ── */}
					<aside className={styles.info}>
						<div className={styles.infoCard}>
							<p className={styles.infoLabel}>Outros canais</p>
							<p className={styles.blurb}>
								Prefere entrar em contato direto? Estou disponível pelo e-mail e nas redes abaixo.
							</p>

							<ul className={styles.links}>
								<li className={styles.linkItem}>
									<a href={`mailto:${to}`}>
										<span className={styles.linkIcon} aria-hidden>
											<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
												<rect x="2" y="4" width="20" height="16" rx="2" />
												<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
											</svg>
										</span>
										<span className={styles.linkText}>
											<span className={styles.linkTitle}>E-mail</span>
											<span className={styles.linkSub}>{to}</span>
										</span>
									</a>
								</li>

								<li className={styles.linkItem}>
									<a href={github} target="_blank" rel="noreferrer">
										<span className={styles.linkIcon} aria-hidden>
											<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
												<path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
											</svg>
										</span>
										<span className={styles.linkText}>
											<span className={styles.linkTitle}>GitHub</span>
											<span className={styles.linkSub}>Ver repositórios</span>
										</span>
									</a>
								</li>

								<li className={styles.linkItem}>
									<a href={linkedin} target="_blank" rel="noreferrer">
										<span className={styles.linkIcon} aria-hidden>
											<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
												<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
											</svg>
										</span>
										<span className={styles.linkText}>
											<span className={styles.linkTitle}>LinkedIn</span>
											<span className={styles.linkSub}>Conectar profissionalmente</span>
										</span>
									</a>
								</li>
							</ul>
						</div>
					</aside>
				</div>
			</div>
		</section>
	);
}
