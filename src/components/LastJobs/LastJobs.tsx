"use client";

import styles from "./LastJobs.module.css";
import JOBS from "./JobsList";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useLastJobsParticles } from "../../hooks/useLastJobsParticles";


export type Job = {
	id: string;
	company: string;
	role: string;
	start: string;
	end?: string;
	location?: string;
	url?: string;
	logo?: string;
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
		transition: { staggerChildren: 0.14, delayChildren: 0.08 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function LastJobs({
	items = FALLBACK,
	title = "Últimos trabalhos",
	subtitle = "Experiências recentes e responsabilidades",
	id = "last-jobs",
}: Props) {
	const particleCanvasRef = useRef<HTMLDivElement>(null);
	useLastJobsParticles(particleCanvasRef);

	return (
		<section id={id} className={styles.wrapper} aria-labelledby="lastjobs-title">
			<div ref={particleCanvasRef} className={styles.particleCanvas} aria-hidden="true" />
			<div className={styles.inner}>
				<header className={styles.header}>
					<p className={styles.eyebrow}>Experiência Profissional</p>
					<h2 id="lastjobs-title" className={styles.title}>{title}</h2>
					<p className={styles.subtitle}>{subtitle}</p>
				</header>

				<motion.ol
					className={styles.list}
					variants={containerVariants}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.1 }}
				>
					{items.map((job, i) => (
						<motion.li key={job.id} className={styles.item} variants={itemVariants}>
							<article className={styles.card} aria-label={`${job.role} — ${job.company}`}>
								<div className={styles.accent} aria-hidden />
								<span className={styles.num} aria-hidden>
									{String(i + 1).padStart(2, "0")}
								</span>

								<div className={styles.cardInner}>
									<div className={styles.cardTop}>
										<div className={styles.identity}>
											{job.logo && (
												<div className={styles.logoWrap} aria-hidden>
													<Image
														src={job.logo}
														alt=""
														width={40}
														height={40}
														className={styles.logoImg}
													/>
												</div>
											)}
											<div className={styles.companyBlock}>
												{job.url ? (
													<a
														href={job.url}
														target="_blank"
														rel="noreferrer"
														className={styles.company}
													>
														{job.company}
													</a>
												) : (
													<span className={styles.company}>{job.company}</span>
												)}
												<h3 className={styles.role}>{job.role}</h3>
											</div>
										</div>

										<div className={styles.meta}>
											<span className={styles.badge}>
												{job.start}
												{job.end ? ` — ${job.end}` : " — Presente"}
											</span>
											{job.location && (
												<span className={styles.location}>{job.location}</span>
											)}
										</div>
									</div>

									{job.description && (
										<p className={styles.description}>{job.description.trim()}</p>
									)}

									{!!job.tech?.length && (
										<ul className={styles.tags} aria-label="Tecnologias">
											{job.tech.map((t) => (
												<li key={t} className={styles.tag}>{t}</li>
											))}
										</ul>
									)}
								</div>
							</article>
						</motion.li>
					))}
				</motion.ol>
			</div>
		</section>
	);
}
