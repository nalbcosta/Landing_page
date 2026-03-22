"use client";

import styles from "./Qualifications.module.css";
import QUALIFICATIONS from "./QualificationsList";
import Image from "next/image";
import { motion } from "framer-motion";
import Hero3D from "../Hero/Hero3D";

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

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.12, delayChildren: 0.08 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
	},
};

export default function Qualifications({
	items = QUALIFICATIONS as unknown as Qualification[],
	title = "Formações & Qualificações",
	subtitle = "Educação e certificações relevantes",
	id = "qualifications",
}: Props) {
	return (
		<section id={id} className={styles.wrapper} aria-labelledby="qualifications-title">
			<Hero3D flip/>
			<div className={styles.inner}>
				<header className={styles.header}>
					<p className={styles.eyebrow}>Educação</p>
					<h2 id="qualifications-title" className={styles.title}>{title}</h2>
					<p className={styles.subtitle}>{subtitle}</p>
				</header>

				<motion.ol
					className={styles.list}
					variants={containerVariants}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.1 }}
				>
					{items.map((q) => (
						<motion.li key={q.id} className={styles.item} variants={itemVariants}>
							<div className={styles.cardTop}>
								<div className={styles.identity}>
									{q.logo && (
										<div className={styles.logoWrap} aria-hidden>
											<Image
												src={q.logo}
												alt=""
												width={36}
												height={36}
												className={styles.logoImg}
											/>
										</div>
									)}
									<div className={styles.schoolBlock}>
										{q.url ? (
											<a
												href={q.url}
												target="_blank"
												rel="noreferrer"
												className={styles.school}
											>
												{q.school}
											</a>
										) : (
											<span className={styles.school}>{q.school}</span>
										)}
										<h3 className={styles.course}>{q.course}</h3>
									</div>
								</div>

								<div className={styles.meta}>
									<span className={styles.badge}>
										{q.start}
										{q.end ? ` — ${q.end}` : " — Presente"}
									</span>
									{q.location && (
										<span className={styles.location}>{q.location}</span>
									)}
								</div>
							</div>

							{q.description && (
								<p className={styles.description}>{q.description}</p>
							)}

							{!!q.subjects?.length && (
								<ul className={styles.tags} aria-label="Principais disciplinas">
									{q.subjects.map((s) => (
										<li key={s} className={styles.tag}>{s}</li>
									))}
								</ul>
							)}
						</motion.li>
					))}
				</motion.ol>
			</div>
		</section>
	);
}
