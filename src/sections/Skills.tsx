"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Code,
    Globe,
    Database,
    Smartphone,
    Server,
    Zap,
    LucideIcon,
    Layers,
    Cpu,
    Monitor,
    Terminal,
    Workflow,
    Settings,
    Box,
    FileCode,
    Braces,
    Palette,
} from "lucide-react";
import { skills } from "@/constants/skills";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Function to get technology icon based on skill name
const getTechIcon = (skillName: string): LucideIcon => {
    const skill = skillName.toLowerCase();
    if (
        skill.includes("react") ||
        skill.includes("javascript") ||
        skill.includes("typescript") ||
        skill.includes("js") ||
        skill.includes("tsx")
    ) {
        return Braces;
    } else if (
        skill.includes("python") ||
        skill.includes("django") ||
        skill.includes("flask")
    ) {
        return Terminal;
    } else if (
        skill.includes("database") ||
        skill.includes("sql") ||
        skill.includes("mongo") ||
        skill.includes("mysql") ||
        skill.includes("postgres")
    ) {
        return Database;
    } else if (
        skill.includes("mobile") ||
        skill.includes("android") ||
        skill.includes("ios") ||
        skill.includes("flutter") ||
        skill.includes("react native")
    ) {
        return Smartphone;
    } else if (
        skill.includes("server") ||
        skill.includes("node") ||
        skill.includes("express") ||
        skill.includes("api") ||
        skill.includes("backend")
    ) {
        return Server;
    } else if (
        skill.includes("css") ||
        skill.includes("html") ||
        skill.includes("design") ||
        skill.includes("ui") ||
        skill.includes("tailwind")
    ) {
        return Palette;
    } else if (
        skill.includes("git") ||
        skill.includes("docker") ||
        skill.includes("devops") ||
        skill.includes("aws") ||
        skill.includes("cloud")
    ) {
        return Settings;
    } else if (
        skill.includes("real-time") ||
        skill.includes("socket") ||
        skill.includes("websocket")
    ) {
        return Zap;
    } else if (
        skill.includes("framework") ||
        skill.includes("library") ||
        skill.includes("vue") ||
        skill.includes("angular")
    ) {
        return Layers;
    } else if (
        skill.includes("testing") ||
        skill.includes("jest") ||
        skill.includes("cypress")
    ) {
        return FileCode;
    } else if (
        skill.includes("system") ||
        skill.includes("os") ||
        skill.includes("linux") ||
        skill.includes("windows")
    ) {
        return Monitor;
    } else if (
        skill.includes("workflow") ||
        skill.includes("ci") ||
        skill.includes("cd")
    ) {
        return Workflow;
    } else if (skill.includes("container") || skill.includes("kubernetes")) {
        return Box;
    } else if (skill.includes("processor") || skill.includes("performance")) {
        return Cpu;
    } else {
        return Code;
    }
};

interface SkillCategoryProps {
    title: string;
    icon: LucideIcon;
    skills: string[];
    color: string;
    bgGradient: string;
    index: number;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({
    title,
    icon: Icon,
    skills,
    bgGradient,
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
                    scale: 1.02,
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
            className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg dark:shadow-gray-900/20 p-6 hover:shadow-2xl dark:hover:shadow-gray-900/50 transition-all duration-500 border border-white/20 dark:border-gray-700/50 overflow-hidden"
        >
            {/* Background gradient overlay */}
            <div
                className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
            ></div>

            {/* Animated border */}
            <div
                className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                style={{
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                }}
            ></div>

            {/* Header */}
            <div className="flex items-center mb-6 relative z-10">
                <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${bgGradient} mr-4 group-hover:scale-110 transition-transform duration-300`}
                >
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {skills.length} technologies
                    </p>
                </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-3 relative z-10">
                {skills.map((skill, skillIndex) => {
                    const TechIcon = getTechIcon(skill);
                    return (
                        <div
                            key={skillIndex}
                            className="group/skill flex items-center p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg hover:bg-white dark:hover:bg-gray-600/50 transition-all duration-300 border border-gray-200/50 dark:border-gray-600/30"
                        >
                            <div className="flex items-center space-x-3 flex-1">
                                <div
                                    className={`p-2 rounded-lg bg-gradient-to-br ${bgGradient} group-hover/skill:scale-110 transition-transform duration-300`}
                                >
                                    <TechIcon className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover/skill:text-gray-900 dark:group-hover/skill:text-white transition-colors duration-200">
                                    {skill}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const Skills: React.FC = () => {
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

    // Define skill categories with icons and colors using data from constants
    const skillCategories = [
        {
            title: "Frontend Development",
            icon: Code,
            skills:
                skills.technicalSkills.programming.find(
                    (cat) => cat.category === "Frontend"
                )?.skills || [],
            color: "blue",
            bgGradient: "from-blue-500 to-cyan-500",
        },
        {
            title: "Backend Development",
            icon: Server,
            skills:
                skills.technicalSkills.programming.find(
                    (cat) => cat.category === "Backend"
                )?.skills || [],
            color: "green",
            bgGradient: "from-green-500 to-emerald-500",
        },
        {
            title: "Database & Storage",
            icon: Database,
            skills: skills.technicalSkills.databases,
            color: "purple",
            bgGradient: "from-purple-500 to-pink-500",
        },
        {
            title: "Mobile Development",
            icon: Smartphone,
            skills:
                skills.technicalSkills.programming.find(
                    (cat) => cat.category === "Mobile Development"
                )?.skills || [],
            color: "orange",
            bgGradient: "from-orange-500 to-red-500",
        },
        {
            title: "Real-time Technologies",
            icon: Zap,
            skills:
                skills.technicalSkills.programming.find(
                    (cat) => cat.category === "Real-time Technologies"
                )?.skills || [],
            color: "indigo",
            bgGradient: "from-indigo-500 to-purple-500",
        },
        {
            title: "APIs & Libraries",
            icon: Globe,
            skills:
                skills.technicalSkills.programming.find(
                    (cat) => cat.category === "APIs & Libraries"
                )?.skills || [],
            color: "pink",
            bgGradient: "from-pink-500 to-rose-500",
        },
    ];

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="py-20 bg-gradient-to-br from-gray-900 to-slate-900 relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2
                        ref={titleRef}
                        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4"
                    >
                        Technical Skills
                    </h2>
                    <p
                        ref={subtitleRef}
                        className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                    >
                        Comprehensive expertise across modern web technologies
                        and development tools
                    </p>
                    <div className="mt-6 flex justify-center">
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                </div>

                {/* Skills Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {skillCategories.map((category, index) => (
                        <SkillCategory
                            key={index}
                            title={category.title}
                            icon={category.icon}
                            skills={category.skills}
                            color={category.color}
                            bgGradient={category.bgGradient}
                            index={index}
                        />
                    ))}
                </div>

                {/* Additional Skills & Soft Skills */}
                <div className="mt-16">
                    <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
                        Additional Expertise & Soft Skills
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3 max-w-6xl mx-auto">
                        {/* Operating Systems */}
                        {skills.technicalSkills.operatingSystems?.map(
                            (os: string, index: number) => (
                                <div
                                    key={`os-${index}`}
                                    className="group px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-800/40 dark:hover:to-purple-800/40 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-sm hover:shadow-md"
                                >
                                    {os}
                                </div>
                            )
                        ) || []}
                        {/* Soft Skills */}
                        {skills.softSkills
                            ?.slice(0, 12)
                            .map((skill: string, index: number) => (
                                <div
                                    key={`soft-${index}`}
                                    className="group px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:from-green-200 hover:to-emerald-200 dark:hover:from-green-800/40 dark:hover:to-emerald-800/40 hover:text-green-700 dark:hover:text-green-300 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-sm hover:shadow-md"
                                >
                                    {skill}
                                </div>
                            )) || []}
                        {/* Languages */}
                        {skills.languages?.map(
                            (language: string, index: number) => (
                                <div
                                    key={`lang-${index}`}
                                    className="group px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:from-yellow-200 hover:to-orange-200 dark:hover:from-yellow-800/40 dark:hover:to-orange-800/40 hover:text-yellow-700 dark:hover:text-yellow-300 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-sm hover:shadow-md"
                                >
                                    {language}
                                </div>
                            )
                        ) || []}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
