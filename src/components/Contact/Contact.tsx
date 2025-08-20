"use client";

import React, { useMemo, useState } from "react";
import styles from "./Contact.module.css";

type Props = {
	to?: string; // recipient email
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

	export default function Contact({ to = "ola@seudominio.com" }: Props) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

	const canSubmit = useMemo(() => {
		return name.trim().length >= 2 && EMAIL_RE.test(email) && message.trim().length >= 10;
	}, [name, email, message]);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const next: typeof errors = {};
		if (name.trim().length < 2) next.name = "Informe seu nome";
		if (!EMAIL_RE.test(email)) next.email = "E-mail inválido";
		if (message.trim().length < 10) next.message = "Mensagem muito curta";
		setErrors(next);
		if (Object.keys(next).length) return;

		const subject = encodeURIComponent(`Contato do site — ${name.trim()}`);
		const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()} (${email.trim()})`);
		const href = `mailto:${to}?subject=${subject}&body=${body}`;
		window.location.href = href;
	};

	return (
		<section id="contact" className={styles.wrapper} aria-labelledby="contact-title">
			<div className={styles.inner}>
					<header className={styles.header}>
						<h2 id="contact-title" className={styles.title}>Vamos conversar</h2>
						<p className={styles.subtitle}>Gostou do que viu? Envie uma mensagem abaixo e eu retorno em breve.</p>
					</header>

				<div className={styles.grid}>
					<form className={styles.card} onSubmit={onSubmit} noValidate>
						<div className={styles.field}>
								<label htmlFor="name">Nome</label>
							<input
								id="name"
								name="name"
								type="text"
								placeholder="Seu nome"
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
								placeholder="you@example.com"
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
								<label htmlFor="message">Mensagem / Detalhes do projeto</label>
								<textarea
									id="message"
									name="message"
									rows={5}
									placeholder="Conte sobre seu projeto..."
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
							<button className={styles.btnPrimary} type="submit" disabled={!canSubmit}>Send</button>
							<a className={styles.btnGhost} href={`mailto:${to}`}>Send email directly</a>
						</div>
					</form>

					<aside className={styles.info}>
						<div className={styles.blurb}>
							<p>
								Prefer outros canais? Você também pode me encontrar nas redes sociais. Vamos tirar sua ideia do papel.
							</p>
						</div>
						<ul className={styles.quick}>
							<li><a href="#projects">Ver projetos</a></li>
							<li><a href="#languages">Tecnologias</a></li>
							<li><a href={`mailto:${to}`}>Enviar e-mail</a></li>
						</ul>
					</aside>
				</div>
			</div>
		</section>
	);
}

