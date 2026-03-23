import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/footer";
import BackToTop from "../components/BackToTop/BackToTop";
import { listaDeProjetos } from "../components/Projects/ListaDeProjetos";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const title = "Nalbert Costa | Desenvolvedor Full-Stack";
const description =
  "Portfólio de Nalbert Costa — desenvolvedor full-stack especializado em Node.js, React, TypeScript e Python. Sistemas escaláveis, aplicações web modernas e projetos com IA.";
export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | Nalbert Costa",
  },
  description,
  keywords: [
    "Nalbert Costa",
    "desenvolvedor full-stack",
    "portfólio",
    "Node.js",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "FastAPI",
    "Docker",
    "desenvolvedor web",
    "software engineer",
    "front-end",
    "back-end",
  ],
  authors: [{ name: "Nalbert Costa", url: siteUrl }],
  creator: "Nalbert Costa",
  publisher: "Nalbert Costa",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "any", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Nalbert Costa | Desenvolvedor Full-Stack",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@nalbcosta",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.className} antialiased`}>
        <Header />
        {children}
        <Footer />
        <BackToTop />
        {/* JSON-LD: Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nalbert Costa",
              alternateName: "Nalbert Schwank Costa",
              jobTitle: "Desenvolvedor Full-Stack",
              description,
              url: siteUrl,
              image: `${siteUrl}/pic.jpg`,
              sameAs: [
                "https://github.com/nalbcosta",
                "https://www.linkedin.com/in/nalbert-schwank-c-a42b17222",
              ],
              knowsAbout: [
                "Node.js", "React", "Next.js", "TypeScript", "JavaScript",
                "Python", "FastAPI", "Flask", "Docker", "MySQL", "MongoDB",
                "Bootstrap", "Tailwind CSS", "Cypress", "CI/CD", "Scrum",
                "Desenvolvimento Web", "Full-Stack Development",
              ],
            }),
          }}
        />
        {/* JSON-LD: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Nalbert Costa | Portfólio",
              url: siteUrl,
              author: {
                "@type": "Person",
                name: "Nalbert Costa",
              },
              inLanguage: "pt-BR",
            }),
          }}
        />
        {/* JSON-LD: ItemList de projetos */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Projetos de Nalbert Costa",
              itemListElement: listaDeProjetos.map((proj, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                item: {
                  "@type": "CreativeWork",
                  name: proj.titulo,
                  url: proj.site?.startsWith("http") ? proj.site : `${siteUrl}/#projects`,
                  image: `${siteUrl}${proj.imagem || "/pic.jpg"}`,
                  description: proj.descricao.trim(),
                  programmingLanguage: proj.linguagens,
                  dateCreated: String(proj.ano),
                },
              })),
            }),
          }}
        />
      </body>
    </html>
  );
}
