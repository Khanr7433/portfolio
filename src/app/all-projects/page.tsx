"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Calendar, Tag, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { projects } from "@/constants/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ProjectCardProps {
    project: (typeof projects.major)[0] | (typeof projects.minor)[0];
    index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cardElement = cardRef.current;

        if (cardElement) {
            gsap.fromTo(
                cardElement,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: cardElement,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Hover animations
            const handleMouseEnter = () => {
                gsap.to(imageRef.current, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out",
                });
            };

            const handleMouseLeave = () => {
                gsap.to(imageRef.current, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                });
            };

            cardElement.addEventListener("mouseenter", handleMouseEnter);
            cardElement.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                cardElement.removeEventListener("mouseenter", handleMouseEnter);
                cardElement.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, [index]);

    const formatDate = (dateString: string) => {
        const [year, month] = dateString.split("-");
        const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        return `${monthNames[parseInt(month) - 1]} ${year}`;
    };

    return (
        <div
            ref={cardRef}
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/20 overflow-hidden hover:shadow-2xl dark:hover:shadow-gray-900/40 transition-all duration-500"
        >
            {/* Project Image/Visual */}
            <div className="relative h-48 sm:h-56 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
                <div
                    ref={imageRef}
                    className="absolute inset-0 bg-gradient-to-br from-blue-400/80 to-purple-600/80 flex items-center justify-center"
                >
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Tag className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white px-4">
                            {project.title}
                        </h3>
                    </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                        {project.category}
                    </span>
                </div>

                {/* Project Type Badge */}
                <div className="absolute top-4 left-4">
                    <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                            projects.major.some((p) => p.id === project.id)
                                ? "bg-green-500/20 text-green-100 border border-green-400/30"
                                : "bg-blue-500/20 text-blue-100 border border-blue-400/30"
                        }`}
                    >
                        {projects.major.some((p) => p.id === project.id)
                            ? "Major"
                            : "Minor"}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Title and Duration */}
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{formatDate(project.duration.start)}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {project.description}
                </p>

                {/* Role */}
                <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                        {project.role}
                    </span>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                            <span
                                key={techIndex}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
                        >
                            <Github className="w-4 h-4" />
                            Code
                        </a>
                    )}
                    {project.liveDemo && (
                        <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

const AllProjectsPage: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const [filter, setFilter] = useState<string>("all");
    const router = useRouter();

    // Combine all projects (major and minor)
    const allProjects = [...projects.major, ...projects.minor];

    const categories = [
        "all",
        "major",
        "minor",
        ...new Set(allProjects.map((project) => project.category)),
    ];

    const filteredProjects = (() => {
        let filtered = allProjects;

        if (filter === "major") {
            filtered = projects.major;
        } else if (filter === "minor") {
            filtered = projects.minor;
        } else if (filter !== "all") {
            filtered = allProjects.filter(
                (project) => project.category === filter
            );
        }

        // Sort projects: major projects first, then by date (newest first)
        return filtered.sort((a, b) => {
            const aIsMajor = projects.major.some((p) => p.id === a.id);
            const bIsMajor = projects.major.some((p) => p.id === b.id);

            if (aIsMajor && !bIsMajor) return -1;
            if (!aIsMajor && bIsMajor) return 1;

            // If both are same type, sort by start date (newest first)
            return (
                new Date(b.duration.start).getTime() -
                new Date(a.duration.start).getTime()
            );
        });
    })();

    useEffect(() => {
        if (titleRef.current && subtitleRef.current) {
            gsap.fromTo(
                titleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                }
            );

            gsap.fromTo(
                subtitleRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    delay: 0.2,
                    ease: "power2.out",
                }
            );
        }
    }, []);

    const handleBackToHome = () => {
        router.push("/#projects");
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <Header />

            <main className="pt-20">
                <section
                    ref={sectionRef}
                    className="py-20 bg-gray-900 relative overflow-hidden"
                >
                    {/* Background decoration */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
                    </div>

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Back Button */}
                        <div className="mb-8">
                            <button
                                onClick={handleBackToHome}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Home
                            </button>
                        </div>

                        {/* Section Header */}
                        <div className="text-center mb-16">
                            <h1
                                ref={titleRef}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4"
                            >
                                All Projects
                            </h1>
                            <p
                                ref={subtitleRef}
                                className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                            >
                                A comprehensive showcase of all my projects -
                                both major and minor works
                            </p>
                            <div className="mt-6 flex justify-center">
                                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                            </div>
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {categories.map((category) => {
                                const isProjectType =
                                    category === "major" ||
                                    category === "minor";
                                const buttonText =
                                    category === "major"
                                        ? "Major Projects"
                                        : category === "minor"
                                          ? "Minor Projects"
                                          : category.charAt(0).toUpperCase() +
                                            category.slice(1);

                                return (
                                    <button
                                        key={category}
                                        onClick={() => setFilter(category)}
                                        className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                                            filter === category
                                                ? isProjectType
                                                    ? category === "major"
                                                        ? "bg-green-600 text-white shadow-lg shadow-green-600/25"
                                                        : "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                                                    : "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                                                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                                        }`}
                                    >
                                        {buttonText}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                />
                            ))}
                        </div>

                        {/* Projects Count */}
                        <div className="text-center mt-12">
                            <p className="text-gray-600 dark:text-gray-400">
                                Showing {filteredProjects.length} of{" "}
                                {allProjects.length} projects
                                {filter === "major" && " (Major Projects Only)"}
                                {filter === "minor" && " (Minor Projects Only)"}
                                {filter !== "all" &&
                                    filter !== "major" &&
                                    filter !== "minor" &&
                                    ` in "${filter}" category`}
                            </p>
                            <div className="flex justify-center items-center gap-6 mt-3 text-sm text-gray-500 dark:text-gray-500">
                                <span className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    {projects.major.length} Major Projects
                                </span>
                                <span className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                    {projects.minor.length} Minor Projects
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AllProjectsPage;
