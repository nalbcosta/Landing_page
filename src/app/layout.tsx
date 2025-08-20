import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/header";
import Footer from "../components/Footer/footer";
import BackToTop from "../components/BackToTop/BackToTop";
import { listaDeProjetos } from "../components/Projects/ListaDeProjetos";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Nalbert Costa - DEV",
    template: "%s | Nalbert Costa",
  },
  description: "Portfolio digital de Nalbert Costa, desenvolvedor pleno full-stack",
  icons: {
    icon: [
      { url: "/logo.png", sizes: "any", type: "image/png" },
      // fallback for browsers that still expect .ico
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
    siteName: "Nalbert Costa - DEV",
    title: "Nalbert Costa - DEV",
    description: "Portfolio digital de Nalbert Costa, desenvolvedor pleno full-stack",
    images: [
      {
        url: `${siteUrl}/pic.jpg`,
        width: 1200,
        height: 630,
        alt: "Nalbert Costa - Portfólio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nalbert Costa - DEV",
    description: "Portfolio digital de Nalbert Costa, desenvolvedor pleno full-stack",
    images: [`${siteUrl}/pic.jpg`],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.className} antialiased`}>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        {children}
        <Footer />
        <BackToTop />
        {/* JSON-LD Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nalbert Costa",
              jobTitle: "Desenvolvedor Full-Stack",
              url: siteUrl,
              image: `${siteUrl}/pic.jpg`,
              sameAs: [
                "https://github.com/username",
                "https://www.linkedin.com/in/username/"
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: listaDeProjetos.map((proj, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                item: {
                  "@type": "CreativeWork",
                  name: proj.titulo,
                  url: `${siteUrl}/#projects`,
                  image: `${siteUrl}${proj.imagem || "/pic.jpg"}`,
                  description: proj.descricao,
                },
              })),
            }),
          }}
        />
      </body>
    </html>
  );
}
