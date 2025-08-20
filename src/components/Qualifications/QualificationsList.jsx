// Static/dynamic list of academic qualifications to be consumed by Qualifications component
// Logos should be placed in /public and referenced by absolute path

const QUALIFICATIONS = [
	{
		id: "edu-3",
		school: "University of Web",
		course: "B.Sc. Computer Science",
		start: "2017",
		end: "2021",
		location: "Brazil",
		logo: "/window.svg",
		url: "https://example.edu",
		description: "Base sólida em estruturas de dados, algoritmos e desenvolvimento de software.",
		subjects: ["Algoritmos", "Estruturas de Dados", "Sistemas Web"],
	},
	{
		id: "edu-2",
		school: "Code Academy",
		course: "Full‑Stack Bootcamp",
		start: "2021",
		end: "2021",
		location: "Remote",
		logo: "/file.svg",
		description: "Imersão prática em frontend e backend modernos.",
		subjects: ["React", "Node.js", "SQL"],
	},
	{
		id: "edu-1",
		school: "Online",
		course: "Certificações diversas",
		start: "2022",
		end: "2024",
		location: "Remote",
		description: "Cursos e certificações em tecnologias web.",
		subjects: ["Next.js", "TypeScript", "AWS"],
	},
];

export default QUALIFICATIONS;

