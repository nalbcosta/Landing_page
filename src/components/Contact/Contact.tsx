"use client";

import styles from "./Contact.module.css";
import { FaCheck, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useContactForm } from "../../hooks/useContactForm";

type Props = {
	to?: string;
	github?: string;
	linkedin?: string;
};

const fadeUp = {
	hidden: { opacity: 0, y: 12 },
	show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
	exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

export default function Contact({
	to = "nalbertschwank@gmail.com",
	github = "https://github.com/nalbcosta",
	linkedin = "https://www.linkedin.com/in/nalbert-schwank-c-a42b17222",
}: Props) {
	const {
		name,
		setName,
		email,
		setEmail,
		message,
		setMessage,
		errors,
		sent,
		canSubmit,
		onSubmit,
		reset,
	} = useContactForm(to);

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
										<FaCheck/>
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
											<FaRegEnvelope />
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
											<FaGithub />
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
											<FaLinkedin />
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
