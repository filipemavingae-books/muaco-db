import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { AuthProvider } from "@/hooks/use-auth"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export const metadata: Metadata = {
  title: "MuacoDB - Plataforma de Base de Dados em Nuvem | Database Cloud Platform",
  description:
    "MuacoDB é a plataforma líder de base de dados em nuvem com gerador automático de APIs, painéis de utilizador personalizáveis, sistema de pagamentos integrado e funcionalidade offline. Crie, gerencie e escale suas aplicações com facilidade.",
  keywords: [
    "MuacoDB",
    "base de dados",
    "cloud database",
    "API generator",
    "database platform",
    "plataforma nuvem",
    "gerador API",
    "painel utilizador",
    "sistema pagamentos",
    "database management",
    "cloud computing",
    "real-time database",
    "offline database",
    "websocket database",
    "Portuguese database",
    "Angola database",
    "Mozambique database",
    "Brasil database",
    "Cabo Verde database",
    "Guiné-Bissau database",
    "São Tomé database",
    "Timor-Leste database",
    "Macau database",
    "Goa database",
  ],
  authors: [{ name: "MuacoDB Team" }],
  creator: "MuacoDB",
  publisher: "MuacoDB Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://muacodb.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "pt-PT": "/",
      "pt-BR": "/",
      "pt-AO": "/",
      "pt-MZ": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "MuacoDB - Plataforma de Base de Dados em Nuvem",
    description:
      "A plataforma mais avançada para gestão de bases de dados em nuvem com APIs automáticas, painéis personalizáveis e funcionalidade offline.",
    url: "https://muacodb.vercel.app",
    siteName: "MuacoDB",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MuacoDB - Cloud Database Platform",
      },
    ],
    locale: "pt_PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MuacoDB - Plataforma de Base de Dados em Nuvem",
    description: "Crie, gerencie e escale suas aplicações com a plataforma de base de dados mais avançada.",
    images: ["/twitter-image.jpg"],
    creator: "@muacodb",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "technology",
  classification: "Database Platform",
  generator: "MuacoDB Platform",
  applicationName: "MuacoDB",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark light",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#8B5E3C" }],
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Structured Data for Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "MuacoDB",
              description: "Plataforma de base de dados em nuvem com gerador automático de APIs",
              url: "https://muacodb.vercel.app",
              applicationCategory: "DatabaseApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "1250",
              },
              author: {
                "@type": "Organization",
                name: "MuacoDB Team",
              },
            }),
          }}
        />

        {/* Additional Meta Tags for Better SEO */}
        <meta name="language" content="Portuguese" />
        <meta name="geo.region" content="PT" />
        <meta name="geo.placename" content="Portugal" />
        <meta name="geo.position" content="39.3999;-8.2245" />
        <meta name="ICBM" content="39.3999, -8.2245" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="1 days" />
        <meta name="expires" content="never" />
        <meta name="pragma" content="no-cache" />
        <meta name="cache-control" content="no-cache" />

        {/* Social Media and Sharing */}
        <meta property="fb:app_id" content="your-facebook-app-id" />
        <meta name="pinterest-rich-pin" content="true" />
        <meta name="linkedin:owner" content="muacodb" />

        {/* Performance and Security */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
