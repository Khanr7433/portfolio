"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Calendar, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import { projects } from "@/constants/projects";
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
    }, []);

    return (
        <div
            ref={cardRef}
            className="group relative bg-white/5 backdrop-blur-md rounded-[24px] overflow-hidden hover:shadow-[0_0_30px_rgba(180,83,9,0.25)] transition-all duration-500 border border-white/10 hover:border-accent/50 hover:-translate-y-2"
        >
            {/* Project Image/Visual */}
            <div className="relative h-48 sm:h-60 bg-surface overflow-hidden group-hover:bg-slate-900 transition-colors duration-500">
                <div
                    ref={imageRef}
                    className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-slate-800/80 flex items-center justify-center group-hover:from-slate-800 group-hover:to-slate-900 transition-all duration-500"
                >
                    <div className="text-center transform transition-transform duration-500 group-hover:scale-110">
                        <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 backdrop-blur-md rounded-full flex items-center justify-center border border-accent/20 group-hover:border-accent/50 group-hover:shadow-[0_0_20px_rgba(180,83,9,0.3)] transition-all duration-300">
                            <Tag className="w-8 h-8 text-accent group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-200 px-4 group-hover:text-white transition-colors duration-300">
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
                            ? "Major Project"
                            : "Minor Project"}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-8">
                {/* Title and Duration */}
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                        {project.title}
                    </h3>
                    <div className="flex items-center text-sm text-muted bg-white/5 px-3 py-1 rounded-full">
                        <Calendar className="w-4 h-4 mr-2" />
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
                <div className="mb-8">
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
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
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

const Projects: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const router = useRouter();
    // Local state not needed for navigation approach
    
    // Select top 3 projects for preview
    const [featuredProjects, setFeaturedProjects] = useState<
        (typeof projects.major | typeof projects.minor)
    >([]);

    useEffect(() => {
        const allProjects = [...projects.major, ...projects.minor];
        setFeaturedProjects(allProjects.slice(0, 3));
    }, []);

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
                    duration: 0.8,
                    delay: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }
    }, []);

    const handleViewAllProjects = () => {
        router.push('/all-projects');
    };

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="py-20 bg-background relative overflow-hidden"
        >
            <BackgroundEffects />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2
                        ref={titleRef}
                        className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    >
                        Featured <span className="text-accent">Projects</span>
                    </h2>
                    <p
                        ref={subtitleRef}
                        className="text-xl text-muted max-w-2xl mx-auto"
                    >
                        A curated selection of my work
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {featuredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>

                {/* View More Button */}
                <div className="text-center">
                    <button
                        onClick={handleViewAllProjects}
                        className="group px-10 py-4 bg-transparent border-2 border-accent text-accent font-bold rounded-full hover:bg-accent hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(180,83,9,0.2)] hover:shadow-[0_0_30px_rgba(180,83,9,0.5)] flex items-center justify-center gap-2 mx-auto"
                    >
                        View All Projects
                        <ExternalLink
                            size={20}
                            className="group-hover:translate-x-1 transition-transform duration-300"
                        />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Projects;
