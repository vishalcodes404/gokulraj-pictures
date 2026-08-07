import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gokulrajpictures.com"),
  title: "Gokulraj Pictures — Fine Art Wedding & Portrait Photography",
  description:
    "Gokulraj is an award-winning Indian fine-art wedding and portrait photographer. Based in Coimbatore, Tamil Nadu, he travels globally to capture timeless, narrative-driven stories with a fashion sensibility and fine-art elegance.",
  keywords: [
    "fine art wedding photography",
    "luxury wedding photographer",
    "Indian wedding photographer",
    "portrait photography",
    "Gokulraj Pictures",
    "Coimbatore photographer",
    "destination wedding photographer",
    "editorial wedding photography",
  ],
  authors: [{ name: "Gokulraj Pictures" }],
  openGraph: {
    title: "Gokulraj Pictures — Fine Art Wedding & Portrait Photography",
    description:
      "Award-winning Indian fine-art wedding and portrait photographer. Timeless, narrative-driven stories with fashion sensibility and fine-art elegance.",
    type: "website",
    locale: "en_US",
    siteName: "Gokulraj Pictures",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gokulraj Pictures — Fine Art Wedding & Portrait Photography",
    description:
      "Award-winning Indian fine-art wedding and portrait photographer based in Coimbatore, Tamil Nadu.",
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="relative min-h-screen">
        {children}
      </body>
    </html>
  );
}
