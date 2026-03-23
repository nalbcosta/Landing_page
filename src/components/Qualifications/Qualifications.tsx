"use client";

import styles from "./Qualifications.module.css";
import QUALIFICATIONS from "./QualificationsList";
import { S3Image } from "../S3Image";
import { motion } from "framer-motion";
import Hero3D from "../Hero/Hero3D";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useQualifications } from "../../hooks/useQualifications";

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
	const {
		trackRef,
		canPrev,
		canNext,
		totalPages,
		activePage,
		scrollByPage,
		scrollToPage,
		handleTrackKeyDown,
	} = useQualifications();

	return (
		<section id={id} className={styles.wrapper} aria-labelledby="qualifications-title">
			<Hero3D flip/>
			<div className={styles.inner}>
				<header className={styles.header}>
					<p className={styles.eyebrow}>Educação</p>
					<h2 id="qualifications-title" className={styles.title}>{title}</h2>
					<p className={styles.subtitle}>{subtitle}</p>
				</header>

				<div className={styles.carousel} suppressHydrationWarning>
					<button
						type="button"
						className={styles.navBtn}
						onClick={() => scrollByPage("prev")}
						disabled={!canPrev}
						aria-label="Ver formações anteriores"
					>
						<BsArrowLeft />
					</button>

					<motion.ol
						ref={trackRef}
						className={styles.list}
						variants={containerVariants}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, amount: 0.1 }}
						aria-label="Lista de formações"
						tabIndex={0}
						onKeyDown={handleTrackKeyDown}
					>
						{items.map((q) => (
							<motion.li key={q.id} className={styles.item} variants={itemVariants}>
							<div className={styles.cardTop}>
								<div className={styles.identity}>
									{q.logo && (
										<div className={styles.logoWrap} aria-hidden>
											<S3Image
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

					<button
						type="button"
						className={styles.navBtn}
						onClick={() => scrollByPage("next")}
						disabled={!canNext}
						aria-label="Ver próximas formações"
					>
						<BsArrowRight />
					</button>
				</div>

				{totalPages > 1 && (
					<div className={styles.dots} role="tablist" aria-label="Paginação de formações" suppressHydrationWarning>
						{Array.from({ length: totalPages }).map((_, index) => (
							<button
								key={index}
								type="button"
								role="tab"
								aria-selected={activePage === index}
								aria-label={`Ir para página ${index + 1}`}
								className={`${styles.dot} ${activePage === index ? styles.dotActive : ""}`}
								onClick={() => scrollToPage(index)}
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
