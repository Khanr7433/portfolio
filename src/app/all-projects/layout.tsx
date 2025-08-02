import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "All Projects - Rashid Khan",
    description:
        "Comprehensive showcase of all projects by Rashid Khan, a Full Stack Developer specializing in MERN stack, React, Node.js, and modern web technologies.",
    keywords:
        "Rashid Khan, Projects, Portfolio, Full Stack Developer, MERN Stack, React, Node.js, Web Development",
    openGraph: {
        title: "All Projects - Rashid Khan",
        description: "Comprehensive showcase of all projects by Rashid Khan",
        type: "website",
    },
};

export default function AllProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
