"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Calendar, Tag, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { projects } from "@/constants/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ProjectCardProps {
    project: (typeof projects.major)[0] | (typeof projects.minor)[0];
    index: number;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const image = imageRef.current;

        if (card && image) {
            // Intro animation
             gsap.fromTo(
                card,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: index * 0.05, // Stagger effect
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Hover animation for image
            card.addEventListener("mouseenter", () => {
                gsap.to(image, {
                    scale: 1.05,
                    duration: 0.5,
                    ease: "power2.out",
                });
            });

            card.addEventListener("mouseleave", () => {
                gsap.to(image, {
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out",
                });
            });
        }
    }, [index]);

    return (
        <div
            ref={cardRef}
            className="group relative bg-white/5 backdrop-blur-md rounded-[24px] overflow-hidden hover:shadow-[0_0_30px_rgba(180,83,9,0.25)] transition-all duration-500 border border-white/10 hover:border-accent/50 hover:-translate-y-2 h-full flex flex-col"
        >
            {/* Project Image/Visual */}
            <div className="relative h-48 sm:h-56 bg-surface overflow-hidden group-hover:bg-slate-900 transition-colors duration-500 shrink-0">
                <div
                    ref={imageRef}
                    className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-slate-800/80 flex items-center justify-center group-hover:from-slate-800 group-hover:to-slate-900 transition-all duration-500"
                >
                    <div className="text-center transform transition-transform duration-500 group-hover:scale-110">
                        <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 backdrop-blur-md rounded-full flex items-center justify-center border border-accent/20 group-hover:border-accent/50 group-hover:shadow-[0_0_20px_rgba(180,83,9,0.3)] transition-all duration-300">
                            <Tag className="w-8 h-8 text-accent group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-200 px-4 group-hover:text-white transition-colors duration-300 font-heading">
                            {project.title}
                        </h3>
                    </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-xl border border-white/10 text-gray-300 text-xs font-medium rounded-full hover:bg-black/80 transition-colors duration-300">
                        {project.category}
                    </span>
                </div>

                {/* Project Type Badge */}
                <div className="absolute top-4 left-4">
                    <span
                        className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-xl border ${
                            projects.major.some((p) => p.id === project.id)
                                ? "bg-accent/30 text-white border-accent/40"
                                : "bg-slate-700/60 text-gray-300 border-white/10"
                        }`}
                    >
                        {projects.major.some((p) => p.id === project.id)
                            ? "Major"
                            : "Minor"}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                {/* Title and Duration */}
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300 font-heading leading-tight">
                        {project.title}
                    </h3>
                    <div className="flex items-center text-xs text-muted bg-white/5 px-2.5 py-1 rounded-full whitespace-nowrap ml-2">
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        <span>{formatDate(project.duration.start)}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                </p>

                {/* Role */}
                <div className="mb-6">
                    <span className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 text-accent text-xs font-semibold rounded-full uppercase tracking-wider">
                        {project.role}
                    </span>
                </div>

                {/* Technologies */}
                <div className="mb-8 flex-1">
                    <div className="flex flex-wrap gap-2">
                        {project.technologies
                            .slice(0, 6)
                            .map((tech, techIndex) => (
                                <span
                                    key={techIndex}
                                    className="px-2.5 py-1 bg-white/5 border border-white/5 text-gray-300 text-xs rounded-md hover:bg-accent/10 hover:text-white hover:border-accent/20 transition-colors duration-200"
                                >
                                    {tech}
                                </span>
                            ))}
                        {project.technologies.length > 6 && (
                            <span className="px-2.5 py-1 bg-white/5 border border-white/5 text-gray-400 text-xs rounded-md">
                                +{project.technologies.length - 6} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/5 mt-auto">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-white text-sm font-semibold rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-200"
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
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-glow hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-accent/20"
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
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-20">
                <section
                    ref={sectionRef}
                    className="py-20 bg-background relative overflow-hidden min-h-screen"
                >
                    <BackgroundEffects />

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Back Button */}
                        <div className="mb-8">
                            <button
                                onClick={handleBackToHome}
                                className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-full transition-all duration-300 border border-white/5 hover:border-accent/30 hover:-translate-x-1"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Back to Home
                            </button>
                        </div>

                        {/* Section Header */}
                        <div className="text-center mb-16">
                            <h1
                                ref={titleRef}
                                className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                            >
                                All <span className="text-accent">Projects</span>
                            </h1>
                            <p
                                ref={subtitleRef}
                                className="text-xl text-muted max-w-2xl mx-auto"
                            >
                                A comprehensive showcase of all my works
                            </p>
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
                                        className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border backdrop-blur-md ${
                                            filter === category
                                                ? "bg-accent text-white border-accent shadow-[0_0_20px_rgba(180,83,9,0.3)] scale-105"
                                                : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white hover:border-accent/30"
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
                            <p className="text-muted bg-white/5 inline-block px-6 py-2 rounded-full border border-white/5">
                                Showing <span className="text-white font-bold">{filteredProjects.length}</span> of{" "}
                                <span className="text-white font-bold">{allProjects.length}</span> projects
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AllProjectsPage;
