import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Rashid Khan - Full Stack Developer",
    description:
        "Portfolio of Rashid Khan, a passionate Full Stack Developer specializing in MERN stack, React, Node.js, and modern web technologies.",
    keywords:
        "Rashid Khan, Full Stack Developer, MERN Stack, React, Node.js, Web Developer, Portfolio",
    authors: [{ name: "Rashid Khan" }],
    creator: "Rashid Khan",
    publisher: "Rashid Khan",
    robots: "index, follow",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://rashidkhan.dev",
        title: "Rashid Khan - Full Stack Developer",
        description:
            "Portfolio of Rashid Khan, showcasing projects and skills in modern web development.",
        siteName: "Rashid Khan Portfolio",
    },
    twitter: {
        card: "summary_large_image",
        title: "Rashid Khan - Full Stack Developer",
        description:
            "Portfolio of Rashid Khan, showcasing projects and skills in modern web development.",
        creator: "@rashidkhan",
    },
};

export function generateViewport() {
    return {
        width: "device-width",
        initialScale: 1,
        themeColor: "#3b82f6",
    };
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <meta name="theme-color" content="#3b82f6" />
            </head>
            <body
                className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}
            >
                {children}
            </body>
        </html>
    );
}
