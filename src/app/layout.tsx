import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { SessionProvider } from "./providers/SessionProvider";
import { Footer } from "@/components/Footer";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "KWMT Marketing Analytics Dashboard",
  description: "Simplified Google Analytics Dashboard by KWMT Marketing - View your website analytics in an easy-to-understand format",
  keywords: "Google Analytics, Analytics Dashboard, KWMT Marketing, Website Analytics, Digital Marketing",
  authors: [{ name: "KWMT Marketing", url: "https://kwmt.dev" }],
  creator: "KWMT Marketing",
  publisher: "KWMT Marketing",
  applicationName: "KWMT Marketing Analytics Dashboard",
  metadataBase: new URL("https://kwmt.dev"),
  openGraph: {
    title: "KWMT Marketing Analytics Dashboard",
    description: "Simplified Google Analytics Dashboard - View your website analytics in an easy-to-understand format",
    url: "https://kwmt.dev",
    siteName: "KWMT Marketing Analytics Dashboard",
    type: "website",
    images: [
      {
        url: "/bb-logo.png",
        width: 512,
        height: 512,
        alt: "KWMT Marketing Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KWMT Marketing Analytics Dashboard",
    description: "Simplified Google Analytics Dashboard - View your website analytics in an easy-to-understand format",
    images: ["/bb-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <SessionProvider>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
