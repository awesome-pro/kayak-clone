import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ChatWidget from "@/components/ui/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tripadvisor: Over a billion reviews and contributions for 100+ million travelers",
  description: "Tripadvisor is the world's largest travel website, with over a billion reviews and contributions for 100+ million travelers.",
  keywords: "Tripadvisor, travel, reviews, contributions, travelers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
