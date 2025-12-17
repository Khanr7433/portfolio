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
            className="group relative bg-surface rounded-[24px] overflow-hidden hover:shadow-[0_0_25px_rgba(180,83,9,0.2)] transition-all duration-500 border border-accent/20 hover:border-accent/50"
        >
            {/* Project Image/Visual */}
            <div className="relative h-48 sm:h-56 bg-surface overflow-hidden group-hover:bg-slate-900 transition-colors duration-500">
                <div
                    ref={imageRef}
                    className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center group-hover:from-slate-800 group-hover:to-slate-900 transition-all duration-500"
                >
                    <div className="text-center transform transition-transform duration-500 group-hover:scale-110">
                        <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-accent/20 group-hover:border-accent/50 group-hover:shadow-[0_0_20px_rgba(180,83,9,0.3)] transition-all duration-300">
                            <Tag className="w-8 h-8 text-accent group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-200 px-4 group-hover:text-white transition-colors duration-300">
                            {project.title}
                        </h3>
                    </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 text-gray-300 text-xs font-medium rounded-full hover:bg-black/60 transition-colors duration-300">
                        {project.category}
                    </span>
                </div>

                {/* Project Type Badge */}
                <div className="absolute top-4 left-4">
                    <span
                        className={`px-2 py-1 text-xs font-medium rounded-full backdrop-blur-md ${
                            projects.major.some((p) => p.id === project.id)
                                ? "bg-accent/20 text-accent border border-accent/30"
                                : "bg-slate-700/50 text-gray-300 border border-white/10"
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
                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                        {project.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{formatDate(project.duration.start)}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                </p>
                
                {/* Role */}
                <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-medium rounded-full">
                        {project.role}
                    </span>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                            <span
                                key={techIndex}
                                className="px-2 py-1 bg-background border border-white/5 text-gray-300 text-xs rounded-md hover:bg-accent/10 hover:text-accent hover:border-accent/20 transition-colors duration-200"
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
                            className="flex items-center gap-2 px-4 py-2 bg-background border border-white/10 text-white text-sm font-medium rounded-lg hover:bg-surface hover:border-accent/30 transition-colors duration-200"
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
                            className="flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-glow transition-colors duration-200 shadow-lg hover:shadow-accent/20"
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
    const blob1Ref = useRef<HTMLDivElement>(null);
    const blob2Ref = useRef<HTMLDivElement>(null);
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
        // Blob animations
        if (blob1Ref.current && blob2Ref.current) {
            gsap.to(blob1Ref.current, {
                scale: 1.2,
                opacity: 0.15,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(blob2Ref.current, {
                scale: 1.2,
                opacity: 0.15,
                duration: 5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 1,
            });
        }

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
                    className="py-20 bg-background relative overflow-hidden"
                >
                    {/* Background decoration */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div ref={blob1Ref} className="absolute top-40 left-0 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl"></div>
                        <div ref={blob2Ref} className="absolute top-40 right-0 w-80 h-80 bg-accent-glow/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Back Button */}
                        <div className="mb-8">
                            <button
                                onClick={handleBackToHome}
                                className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-white/5 text-gray-300 hover:text-white rounded-lg transition-colors duration-200 border border-white/5 hover:border-accent/30"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Home
                            </button>
                        </div>

                        {/* Section Header */}
                        <div className="text-center mb-16">
                            <h1
                                ref={titleRef}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                            >
                                All Projects
                            </h1>
                            <p
                                ref={subtitleRef}
                                className="text-lg text-muted max-w-2xl mx-auto"
                            >
                                A comprehensive showcase of all my projects -
                                both major and minor works
                            </p>
                            <div className="mt-6 flex justify-center">
                                <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-accent rounded-full"></div>
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
                                        className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border ${
                                            filter === category
                                                ? isProjectType
                                                    ? category === "major"
                                                        ? "bg-accent text-white border-accent shadow-[0_0_15px_rgba(180,83,9,0.3)]"
                                                        : "bg-surface text-gray-300 border-white/10 hover:border-accent/30"
                                                    : "bg-accent text-white border-accent shadow-[0_0_15px_rgba(180,83,9,0.3)]"
                                                : "bg-surface text-gray-400 border-white/5 hover:border-accent/30 hover:text-white"
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
                            <p className="text-muted">
                                Showing {filteredProjects.length} of{" "}
                                {allProjects.length} projects
                                {filter === "major" && " (Major Projects Only)"}
                                {filter === "minor" && " (Minor Projects Only)"}
                                {filter !== "all" &&
                                    filter !== "major" &&
                                    filter !== "minor" &&
                                    ` in "${filter}" category`}
                            </p>
                            <div className="flex justify-center items-center gap-6 mt-3 text-sm text-gray-500">
                                <span className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                                    {projects.major.length} Major Projects
                                </span>
                                <span className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-slate-700 rounded-full"></div>
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
