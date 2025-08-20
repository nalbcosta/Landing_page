"use client";

import React from "react";
import styles from "./Qualifications.module.css";
import QUALIFICATIONS from "./QualificationsList";
import Image from "next/image";
import { motion } from "framer-motion";

export type Qualification = {
	id: string;
	school: string;
	course: string;
	start: string;
	end?: string;
	location?: string;
	url?: string;
	logo?: string;
	description?: string;
	subjects?: string[];
};

type Props = {
	items?: Qualification[];
	title?: string;
	subtitle?: string;
	id?: string;
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function Qualifications({ items = (QUALIFICATIONS as unknown as Qualification[]), title = "Formações & Qualificações", subtitle = "Educação e certificações relevantes", id = "qualifications" }: Props) {
	return (
		<section id={id} className={styles.wrapper} aria-labelledby="qualifications-title">
			<div className={styles.inner}>
				<header className={styles.header}>
					<h2 id="qualifications-title" className={styles.title}>{title}</h2>
					<p className={styles.subtitle}>{subtitle}</p>
				</header>

				<motion.ol className={styles.list} variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
					{items.map((q) => (
						<motion.li key={q.id} className={styles.item} variants={item}>
							<div className={styles.left}>
								{q.logo && (
									<span className={styles.logoWrap} aria-hidden>
										<Image src={q.logo} alt="" width={36} height={36} className={styles.logoImg} />
									</span>
								)}
								<div className={styles.schoolBlock}>
									{q.url ? (
										<a href={q.url} target="_blank" rel="noreferrer" className={styles.school}>{q.school}</a>
									) : (
										<span className={styles.school}>{q.school}</span>
									)}
									<h3 className={styles.course}>{q.course}</h3>
								</div>
							</div>
							<div className={styles.meta}>
								<span className={styles.badge}>{q.start} — {q.end ?? "Concluído"}</span>
								{q.location && <span className={styles.location}>{q.location}</span>}
							</div>
							{q.description && <p className={styles.description}>{q.description}</p>}
							{!!q.subjects?.length && (
								<ul className={styles.tags} aria-label="Principais disciplinas">
									{q.subjects.map((s) => <li key={s} className={styles.tag}>{s}</li>)}
								</ul>
							)}
						</motion.li>
					))}
				</motion.ol>
			</div>
		</section>
	);
}

