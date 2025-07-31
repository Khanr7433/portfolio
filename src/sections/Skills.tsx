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
    Star,
} from "lucide-react";
import { skills } from "@/constants/skills";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

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
    color,
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
                {skills.map((skill, skillIndex) => (
                    <div
                        key={skillIndex}
                        className="group/skill flex items-center p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg hover:bg-white dark:hover:bg-gray-600/50 transition-all duration-300 border border-gray-200/50 dark:border-gray-600/30"
                    >
                        <div className="flex items-center space-x-2 flex-1">
                            <div className="flex space-x-1">
                                {[...Array(5)].map((_, starIndex) => (
                                    <Star
                                        key={starIndex}
                                        className={`w-3 h-3 ${
                                            starIndex < 4
                                                ? `text-yellow-400 fill-yellow-400`
                                                : "text-gray-300 dark:text-gray-600"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover/skill:text-gray-900 dark:group-hover/skill:text-white transition-colors duration-200">
                            {skill}
                        </span>
                    </div>
                ))}
            </div>

            {/* Progress indicator */}
            <div className="mt-6 relative z-10">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Proficiency
                    </span>
                    <span className="text-sm font-bold text-gray-800 dark:text-white">
                        85%
                    </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                        className={`h-full bg-gradient-to-r ${bgGradient} rounded-full relative transition-all duration-1000 group-hover:animate-pulse`}
                        style={{ width: "85%" }}
                    >
                        <div className="absolute inset-0 bg-white/20 rounded-full"></div>
                    </div>
                </div>
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

    // Define skill categories with icons and colors
    const skillCategories = [
        {
            title: "Frontend Development",
            icon: Code,
            skills: [
                "React",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "HTML5",
                "CSS3",
                "JavaScript",
                "Vue.js",
            ],
            color: "blue",
            bgGradient: "from-blue-500 to-cyan-500",
        },
        {
            title: "Backend Development",
            icon: Server,
            skills: [
                "Node.js",
                "Express.js",
                "Python",
                "Django",
                "FastAPI",
                "REST APIs",
                "GraphQL",
                "Microservices",
            ],
            color: "green",
            bgGradient: "from-green-500 to-emerald-500",
        },
        {
            title: "Database & Storage",
            icon: Database,
            skills: [
                "MongoDB",
                "PostgreSQL",
                "MySQL",
                "Redis",
                "Firebase",
                "Supabase",
                "Prisma",
                "Mongoose",
            ],
            color: "purple",
            bgGradient: "from-purple-500 to-pink-500",
        },
        {
            title: "Mobile Development",
            icon: Smartphone,
            skills: [
                "React Native",
                "Flutter",
                "Expo",
                "iOS Development",
                "Android Development",
                "Progressive Web Apps",
            ],
            color: "orange",
            bgGradient: "from-orange-500 to-red-500",
        },
        {
            title: "Cloud & DevOps",
            icon: Globe,
            skills: [
                "AWS",
                "Google Cloud",
                "Docker",
                "Kubernetes",
                "CI/CD",
                "Nginx",
                "Linux",
                "Git",
            ],
            color: "indigo",
            bgGradient: "from-indigo-500 to-purple-500",
        },
        {
            title: "Tools & Technologies",
            icon: Zap,
            skills: [
                "VS Code",
                "Git",
                "Figma",
                "Postman",
                "Jest",
                "Cypress",
                "Webpack",
                "Vite",
            ],
            color: "pink",
            bgGradient: "from-pink-500 to-rose-500",
        },
    ];

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 relative overflow-hidden"
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
                    <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                        {skills.technicalSkills.databases?.map(
                            (db: string, index: number) => (
                                <div
                                    key={`db-${index}`}
                                    className="group px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-800/40 dark:hover:to-purple-800/40 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-sm hover:shadow-md"
                                >
                                    {db}
                                </div>
                            )
                        ) || []}
                        {skills.softSkills
                            ?.slice(0, 8)
                            .map((skill: string, index: number) => (
                                <div
                                    key={`soft-${index}`}
                                    className="group px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:from-green-200 hover:to-emerald-200 dark:hover:from-green-800/40 dark:hover:to-emerald-800/40 hover:text-green-700 dark:hover:text-green-300 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-sm hover:shadow-md"
                                >
                                    {skill}
                                </div>
                            )) || []}
                    </div>
                </div>

                {/* Skills Stats */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                    {[
                        { label: "Years Experience", value: "5+" },
                        { label: "Projects Completed", value: "50+" },
                        { label: "Technologies", value: "30+" },
                        { label: "Certifications", value: "10+" },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 group"
                        >
                            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
