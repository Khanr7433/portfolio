"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Calendar, Tag } from "lucide-react";
import { projects } from "@/constants/projects";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ProjectCardProps {
    project: (typeof projects.major)[0];
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
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
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
                        {project.technologies
                            .slice(0, 6)
                            .map((tech, techIndex) => (
                                <span
                                    key={techIndex}
                                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                                >
                                    {tech}
                                </span>
                            ))}
                        {project.technologies.length > 6 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-md">
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

const Projects: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const [filter, setFilter] = useState<string>("all");

    const categories = [
        "all",
        ...new Set(projects.major.map((project) => project.category)),
    ];
    const filteredProjects =
        filter === "all"
            ? projects.major
            : projects.major.filter((project) => project.category === filter);

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
            className="py-20 bg-gray-900 relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2
                        ref={titleRef}
                        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4"
                    >
                        Featured Projects
                    </h2>
                    <p
                        ref={subtitleRef}
                        className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                    >
                        A showcase of my recent work and creative solutions
                    </p>
                    <div className="mt-6 flex justify-center">
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                                filter === category
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                            }`}
                        >
                            {category.charAt(0).toUpperCase() +
                                category.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>

                {/* View More Button */}
                <div className="text-center mt-12">
                    <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden">
                        <span className="relative z-10">View All Projects</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Projects;
