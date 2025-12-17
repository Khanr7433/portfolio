"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Code,
    Palette,
    Cloud,
    Monitor,
    GitBranch,
    Zap,
    LucideIcon,
} from "lucide-react";
import { tools } from "@/constants/tools";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ToolCategoryProps {
    title: string;
    icon: LucideIcon;
    tools: string[];
    color: string;
    index: number;
}

const ToolCategory: React.FC<ToolCategoryProps> = ({
    title,
    icon: Icon,
    tools,
    color,
    index,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cardRef.current) {
            gsap.fromTo(
                cardRef.current,
                { y: 50, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Hover animation
            const handleMouseEnter = () => {
                gsap.to(cardRef.current, {
                    y: -10,
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out",
                });
            };

            const handleMouseLeave = () => {
                gsap.to(cardRef.current, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                });
            };

            const cardElement = cardRef.current;
            cardElement.addEventListener("mouseenter", handleMouseEnter);
            cardElement.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                cardElement.removeEventListener("mouseenter", handleMouseEnter);
                cardElement.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, [index]);

    return (
        <div
            ref={cardRef}
            className="group relative bg-surface rounded-[24px] overflow-hidden hover:shadow-[0_0_20px_rgba(180,83,9,0.15)] transition-all duration-500 border border-white/5 hover:border-accent/40 p-6"
        >
            {/* Header */}
            <div className="flex items-center mb-4">
                <div
                    className="p-3 bg-accent/10 rounded-xl mr-4 group-hover:bg-accent/20 transition-transform duration-300"
                >
                    <Icon className="w-6 h-6 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                    {title}
                </h3>
            </div>

            {/* Tools grid */}
            <div className="grid grid-cols-1 gap-2">
                {tools.map((tool, toolIndex) => (
                    <div
                        key={toolIndex}
                        className="flex items-center p-2 bg-background/50 rounded-lg group-hover:bg-white/5 transition-colors duration-200 border border-white/5"
                    >
                        <div
                            className="w-2 h-2 bg-accent/50 rounded-full mr-3 group-hover:bg-accent transition-colors duration-300"
                        ></div>
                        <span className="text-sm text-gray-400 font-medium group-hover:text-white transition-colors duration-200">
                            {tool}
                        </span>
                    </div>
                ))}
            </div>

            {/* Tool count badge */}
            <div className="absolute top-4 right-4">
                <span
                    className="px-2 py-1 bg-accent/20 text-accent text-xs font-bold rounded-full group-hover:bg-accent group-hover:text-white transition-colors duration-300"
                >
                    {tools.length}
                </span>
            </div>
        </div>
    );
};

const Tools: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

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

    const toolCategories = [
        {
            title: "Development",
            icon: Code,
            tools: [...tools.development.ide, ...tools.development.buildTools],
            color: "from-blue-500 to-cyan-500",
        },
        {
            title: "Version Control",
            icon: GitBranch,
            tools: tools.development.versionControl,
            color: "from-orange-500 to-red-500",
        },
        {
            title: "API Tools",
            icon: Zap,
            tools: tools.development.apiTools,
            color: "from-green-500 to-emerald-500",
        },
        {
            title: "Design",
            icon: Palette,
            tools: tools.design.ui,
            color: "from-purple-500 to-pink-500",
        },
        {
            title: "Deployment",
            icon: Cloud,
            tools: [
                ...tools.deployment.platforms,
                ...tools.deployment.cloudServices,
            ],
            color: "from-indigo-500 to-purple-500",
        },
        {
            title: "Productivity",
            icon: Monitor,
            tools: [
                ...tools.productivity.office,
                ...tools.productivity.browsers,
            ],
            color: "from-gray-500 to-gray-600",
        },
    ];

    return (
        <section
            id="tools"
            ref={sectionRef}
            className="py-20 bg-background relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-10 w-40 h-40 bg-blue-900/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-accent-glow/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2
                        ref={titleRef}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Tools & Technologies
                    </h2>
                    <p
                        ref={subtitleRef}
                        className="text-lg text-muted max-w-2xl mx-auto"
                    >
                        The essential tools and technologies I use to bring
                        ideas to life
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {toolCategories.map((category, index) => (
                        <ToolCategory
                            key={index}
                            title={category.title}
                            icon={category.icon}
                            tools={category.tools}
                            color={category.color}
                            index={index}
                        />
                    ))}
                </div>

                {/* Additional Stats */}
                <div className="mt-16 text-center">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                        <div className="text-center p-6 bg-surface rounded-[24px] shadow-lg border border-white/5 hover:border-accent/40 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(180,83,9,0.15)]">
                            <div className="text-3xl font-bold text-accent mb-2 group-hover:text-white transition-colors duration-300">
                                {tools.development.ide.length +
                                    tools.development.buildTools.length}
                                +
                            </div>
                            <div className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                                Dev Tools
                            </div>
                        </div>
                        <div className="text-center p-6 bg-surface rounded-[24px] shadow-lg border border-white/5 hover:border-accent/40 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(180,83,9,0.15)]">
                            <div className="text-3xl font-bold text-accent mb-2 group-hover:text-white transition-colors duration-300">
                                {tools.design.ui.length}+
                            </div>
                            <div className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                                Design Tools
                            </div>
                        </div>
                        <div className="text-center p-6 bg-surface rounded-[24px] shadow-lg border border-white/5 hover:border-accent/40 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(180,83,9,0.15)]">
                            <div className="text-3xl font-bold text-accent mb-2 group-hover:text-white transition-colors duration-300">
                                {tools.deployment.platforms.length}+
                            </div>
                            <div className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                                Platforms
                            </div>
                        </div>
                        <div className="text-center p-6 bg-surface rounded-[24px] shadow-lg border border-white/5 hover:border-accent/40 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(180,83,9,0.15)]">
                            <div className="text-3xl font-bold text-accent mb-2 group-hover:text-white transition-colors duration-300">
                                {tools.productivity.office.length +
                                    tools.productivity.browsers.length}
                                +
                            </div>
                            <div className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                                Productivity
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tools;
