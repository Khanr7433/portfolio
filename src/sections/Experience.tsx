"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building } from "lucide-react";
import { experience } from "@/constants/experience";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ExperienceCardProps {
    exp: (typeof experience)[0];
    index: number;
    isLast: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
    exp,
    index,
    isLast,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cardElement = cardRef.current;

        if (cardElement) {
            gsap.fromTo(
                cardElement,
                { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
                {
                    x: 0,
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
        }

        if (lineRef.current && !isLast) {
            gsap.fromTo(
                lineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    duration: 0.8,
                    delay: index * 0.2 + 0.4,
                    ease: "power2.out",
                    transformOrigin: "top",
                    scrollTrigger: {
                        trigger: cardElement,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }
    }, [index, isLast]);

    return (
        <div className="relative flex items-center justify-center">
            {/* Timeline dot and line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>
                {!isLast && (
                    <div
                        ref={lineRef}
                        className="w-0.5 h-24 bg-gradient-to-b from-blue-500 to-purple-600 mt-2"
                    ></div>
                )}
            </div>

            {/* Content */}
            <div
                ref={cardRef}
                className={`w-full max-w-md ${
                    index % 2 === 0 ? "mr-auto pr-8" : "ml-auto pl-8"
                }`}
            >
                <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/20 p-6 hover:shadow-xl dark:hover:shadow-gray-900/40 transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    {/* Date badge */}
                    <div className="absolute -top-3 left-6">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium rounded-full shadow-lg">
                            {exp.start} - {exp.end}
                        </span>
                    </div>

                    {/* Company and role */}
                    <div className="mt-4 mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                            <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                                {exp.company}
                            </h4>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {exp.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export const Experience: React.FC = () => {
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

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
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
                        Work Experience
                    </h2>
                    <p
                        ref={subtitleRef}
                        className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                    >
                        My professional journey in software development
                    </p>
                    <div className="mt-6 flex justify-center">
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-12">
                        {experience.map(
                            (exp: (typeof experience)[0], index: number) => (
                                <ExperienceCard
                                    key={exp.id}
                                    exp={exp}
                                    index={index}
                                    isLast={index === experience.length - 1}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
