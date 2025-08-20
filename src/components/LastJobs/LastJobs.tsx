"use client";

import React from "react";
import styles from "./LastJobs.module.css";
import JOBS from "./JobsList";
import { motion } from "framer-motion";
import Image from "next/image";

export type Job = {
	id: string;
	company: string;
	role: string;
	start: string; // e.g. "Mar 2023"
	end?: string; // e.g. "Present"
	location?: string;
	url?: string;
	logo?: string; // optional path in public/
	description?: string;
	tech?: string[];
	highlights?: string[];
};

type Props = {
	items?: Job[];
	title?: string;
	subtitle?: string;
	id?: string;
};

const FALLBACK: Job[] = (JOBS as unknown as Job[]) ?? [];

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.12, delayChildren: 0.1 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 16 },
	show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function LastJobs({ items = FALLBACK, title = "Últimos trabalhos", subtitle = "Experiências recentes e responsabilidades", id = "last-jobs" }: Props) {
	return (
		<section id={id} className={styles.wrapper} aria-labelledby="lastjobs-title">
			<div className={styles.inner}>
				<header className={styles.header}>
					<h2 id="lastjobs-title" className={styles.title}>{title}</h2>
					<p className={styles.subtitle}>{subtitle}</p>
				</header>

				<motion.ol className={styles.timeline} variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
					{items.map((job) => (
						<motion.li key={job.id} className={styles.item} aria-label={`${job.role} — ${job.company}`} variants={itemVariants}>
							<div className={styles.marker} aria-hidden />
							<article className={styles.card}>
								<div className={styles.row}>
									<div className={styles.left}>
										{job.logo && (
											<div className={styles.logoWrap} aria-hidden>
												<Image src={job.logo} alt="" width={36} height={36} className={styles.logoImg} />
											</div>
										)}
										<div className={styles.companyBlock}>
										{job.url ? (
											<a href={job.url} target="_blank" rel="noreferrer" className={styles.company}>{job.company}</a>
										) : (
											<span className={styles.company}>{job.company}</span>
										)}
										<h3 className={styles.role}>{job.role}</h3>
										</div>
									</div>
									<div className={styles.meta}>
										<span className={styles.badge}>{job.start} — {job.end ?? "Present"}</span>
										{job.location && <span className={styles.location}>{job.location}</span>}
									</div>
								</div>

								{job.description && (
									<p className={styles.description}>{job.description}</p>
								)}

								{!!job.tech?.length && (
									<ul className={styles.tags} aria-label="Tecnologias">
										{job.tech.map((t) => (
											<li key={t} className={styles.tag}>{t}</li>
										))}
									</ul>
								)}
							</article>
						</motion.li>
					))}
					</motion.ol>
			</div>
		</section>
	);
}

