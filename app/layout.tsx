import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative min-h-screen">
        {children}
      </body>
    </html>
  );
}
