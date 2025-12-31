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
import BackgroundEffects from "@/components/BackgroundEffects";

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
            className="group relative bg-white/5 backdrop-blur-md rounded-[24px] overflow-hidden hover:shadow-[0_0_20px_rgba(180,83,9,0.25)] transition-all duration-500 border border-white/10 hover:border-accent/50 p-6"
        >
            {/* Header */}
            <div className="flex items-center mb-6 relative z-10">
                <div className="p-3 rounded-xl bg-accent/10 mr-4 group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="text-sm text-muted">
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
                            className="group/skill flex items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-accent/20"
                        >
                            <div className="flex items-center space-x-3 flex-1">
                                <div className="p-2 rounded-lg bg-gray-900/50 group-hover/skill:scale-110 transition-transform duration-300">
                                    <TechIcon className="w-4 h-4 text-gray-400 group-hover/skill:text-accent transition-colors duration-300" />
                                </div>
                                <span className="text-sm font-medium text-gray-300 group-hover/skill:text-white transition-colors duration-200">
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
    const [activeTab, setActiveTab] = React.useState<string>("All");

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
            category: "Frontend",
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
            category: "Backend",
        },
        {
            title: "Database & Storage",
            icon: Database,
            skills: skills.technicalSkills.databases,
            color: "purple",
            bgGradient: "from-purple-500 to-pink-500",
            category: "Database",
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
            category: "Mobile",
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
            category: "Real-time",
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
            category: "APIs",
        },
    ];

    const tabs = [
        "All",
        "Frontend",
        "Backend",
        "Database",
        "Mobile",
        "Real-time",
        "APIs",
    ];

    const filteredCategories =
        activeTab === "All"
            ? skillCategories
            : skillCategories.filter((cat) => cat.category === activeTab);

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="py-20 bg-background relative overflow-hidden"
        >
            {/* Background decoration */}
            <BackgroundEffects />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2
                        ref={titleRef}
                        className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    >
                        Technical <span className="text-accent">Skills</span>
                    </h2>
                    <p
                        ref={subtitleRef}
                        className="text-xl text-muted max-w-2xl mx-auto"
                    >
                        Comprehensive expertise across modern web technologies
                        and development tools
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                activeTab === tab
                                    ? "bg-accent text-white shadow-[0_0_15px_rgba(180,83,9,0.4)]"
                                    : "bg-white/5 backdrop-blur-sm text-gray-400 hover:text-white hover:bg-white/10 border border-white/5"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Skills Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 min-h-[400px]">
                    {filteredCategories.map((category, index) => (
                        <SkillCategory
                            key={category.title}
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
                <div className="mt-8 border-t border-white/5 pt-16">
                    <h3 className="text-2xl font-heading font-bold text-center text-white mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Additional Expertise & Soft Skills
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3 max-w-6xl mx-auto">
                        {/* Operating Systems */}
                        {skills.technicalSkills.operatingSystems?.map(
                            (os: string, index: number) => (
                                <div
                                    key={`os-${index}`}
                                    className="group px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 rounded-full text-sm font-medium hover:border-accent/40 hover:text-white transition-all duration-300 transform hover:scale-105 cursor-pointer hover:shadow-[0_0_15px_rgba(180,83,9,0.2)]"
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
                                    className="group px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 rounded-full text-sm font-medium hover:border-accent/40 hover:text-white transition-all duration-300 transform hover:scale-105 cursor-pointer hover:shadow-[0_0_15px_rgba(180,83,9,0.2)]"
                                >
                                    {skill}
                                </div>
                            )) || []}
                        {/* Languages */}
                        {skills.languages?.map(
                            (language: string, index: number) => (
                                <div
                                    key={`lang-${index}`}
                                    className="group px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 rounded-full text-sm font-medium hover:border-accent/40 hover:text-white transition-all duration-300 transform hover:scale-105 cursor-pointer hover:shadow-[0_0_15px_rgba(180,83,9,0.2)]"
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
