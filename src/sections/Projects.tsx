"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Calendar, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import { projects } from "@/constants/projects";

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
                    delay: index * 0.2,
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
                        {project.technologies
                            .slice(0, 6)
                            .map((tech, techIndex) => (
                                <span
                                    key={techIndex}
                                    className="px-2 py-1 bg-background border border-white/5 text-gray-300 text-xs rounded-md hover:bg-accent/10 hover:text-accent hover:border-accent/20 transition-colors duration-200"
                                >
                                    {tech}
                                </span>
                            ))}
                        {project.technologies.length > 6 && (
                            <span className="px-2 py-1 bg-background border border-white/5 text-gray-400 text-xs rounded-md">
                                +{project.technologies.length - 6} more
                            </span>
                        )}
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

const Projects: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const router = useRouter();

    // Combine all projects and shuffle them
    const allProjects = useMemo(
        () => [...projects.major, ...projects.minor],
        []
    );

    // State for featured projects to avoid hydration mismatch
    const [featuredProjects, setFeaturedProjects] = useState<
        typeof allProjects
    >(
        allProjects.slice(0, 5) // Show first 5 initially to match server render
    );

    // Shuffle function
    const shuffleArray = <T,>(array: T[]): T[] => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const handleViewAllProjects = () => {
        router.push("/all-projects");
    };

    useEffect(() => {
        // Only shuffle on client side to avoid hydration mismatch
        setFeaturedProjects(shuffleArray(allProjects).slice(0, 5));
    }, [allProjects]);

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
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
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
                    scrollTrigger: {
                        trigger: subtitleRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }
    }, []);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="py-20 bg-background relative overflow-hidden"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2
                        ref={titleRef}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        Featured Projects
                    </h2>
                    <p
                        ref={subtitleRef}
                        className="text-lg text-muted max-w-2xl mx-auto"
                    >
                        A curated selection from my portfolio
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>

                {/* View More Button */}
                <div className="text-center mt-12">
                    <button
                        onClick={handleViewAllProjects}
                        className="px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-glow hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(180,83,9,0.3)]"
                    >
                        View All Projects
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Projects;
