// Static list of recent jobs to be consumed by LastJobs component
// Logos should be placed in /public and referenced by absolute path (e.g., "/vercel.svg")

const JOBS = [
	{
		id: "job-2",
		company: "QuickEAM",
		role: "Desenvolvedor Full-Stack Python - Pleno",
		start: "2025",
		// current role
		location: "Presencial",
		url: "https://quickeam.com",
		description:
			`Desenvolvimento e manutenção de soluções backend em Python, 
				com foco em Django, APIs REST, integrações e otimização de processos industriais. 
				Com o desenvolvimento de novas funcionalidades e melhorias contínuas. 
				Além de Interfaces de usuário em React.`,
		tech: ["Python", "Django", "REST APIs", "PostgreSQL", "Docker", "React"],
		logo: "/QuickEAM.png",
	},
	{
		id: "job-1",
		company: "Grupo JL",
		role: "Estagiário de Desenvolvimento/Suporte",
		start: "2024",
		end: "2024",
		location: "Presencial",
		description:
			`
			Desenvolvimento de funcionalidades em sistemas internos usando JavaScript e Node.js, com foco 
			na automação de processos.
			Suporte técnico aos usuários, diagnosticando e solucionando problemas relacionados a hardware, 
			software e rede.
			Uso de Express.js e MongoDB para gerenciar APIs e bancos de dados, integrando sistemas de backend.
			`,
		tech: ["MongoDB", "React", "NodeJS", "Express", "JavaScript"],
		logo: "/GrupoJL.png",
	},
];

export default JOBS;

