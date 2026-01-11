import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/providers";
import "./globals.css";

// ============================================
// Font Configuration
// ============================================

/**
 * Inter - Primary sans-serif font for body text.
 * Optimized for readability across all sizes.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/**
 * Space Grotesk - Display font for headings and emphasis.
 * Modern geometric sans-serif with personality.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

/**
 * JetBrains Mono - Monospace font for code and technical content.
 */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

// ============================================
// Metadata Configuration
// ============================================

export const metadata: Metadata = {
  title: {
    default: "AstroMatchMaking",
    template: "%s | AstroMatchMaking",
  },
  description: "Discover your cosmic connections with AstroMatchMaking - where the stars align for meaningful relationships.",
  keywords: ["astrology", "matchmaking", "zodiac", "compatibility", "relationships"],
  authors: [{ name: "AstroMatchMaking Team" }],
  creator: "AstroMatchMaking",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://astromatchmaking.com",
    siteName: "AstroMatchMaking",
    title: "AstroMatchMaking - Cosmic Connections",
    description: "Discover your cosmic connections with AstroMatchMaking",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AstroMatchMaking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AstroMatchMaking - Cosmic Connections",
    description: "Discover your cosmic connections with AstroMatchMaking",
    images: ["/og-image.png"],
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a0a1a" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a1a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ============================================
// Root Layout Component
// ============================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <Providers>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg"
          >
            Skip to main content
          </a>

          {/* Main layout structure */}
          <div className="relative min-h-screen flex flex-col cosmic-bg">
            {/* Header placeholder - add Header component here */}
            {/* <Header /> */}

            {/* Main content */}
            <main id="main-content" className="flex-1">
              {children}
            </main>

            {/* Footer placeholder - add Footer component here */}
            {/* <Footer /> */}
          </div>
        </Providers>
      </body>
    </html>
  );
}
