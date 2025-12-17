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
    }, [index, isLast]);

    return (
        <div className="relative flex items-center justify-center">
            {/* Timeline dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <div className="w-4 h-4 bg-accent/80 rounded-full border-4 border-background shadow-lg z-10"></div>
            </div>

            {/* Content */}
            <div
                ref={cardRef}
                className={`w-full max-w-md ${
                    index % 2 === 0 ? "mr-auto pr-8" : "ml-auto pl-8"
                }`}
            >
                <div className="group relative bg-surface rounded-[24px] shadow-lg border border-white/5 hover:border-accent/40 transition-all duration-300 p-6 hover:shadow-[0_0_20px_rgba(180,83,9,0.15)]">
                    {/* Date badge */}
                    <div className="absolute -top-3 left-6">
                        <span className="px-3 py-1 bg-accent/20 border border-accent/40 text-accent-glow text-xs font-bold rounded-full shadow-lg backdrop-blur-sm group-hover:bg-accent group-hover:text-white transition-all duration-300">
                            {exp.start} - {exp.end}
                        </span>
                    </div>

                    {/* Company and role */}
                    <div className="mt-4 mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                            {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                            <Building className="w-4 h-4 text-accent" />
                            <h4 className="text-lg font-semibold text-accent">
                                {exp.company}
                            </h4>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted text-sm leading-relaxed">
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
    const timelineRef = useRef<HTMLDivElement>(null);

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

        // Continuous timeline line animation
        if (timelineRef.current) {
            gsap.set(timelineRef.current, {
                scaleY: 0,
                transformOrigin: "top",
            });

            gsap.to(timelineRef.current, {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: "#timeline-container",
                    start: "top 75%",
                    end: "bottom 25%",
                    scrub: 1,
                    onUpdate: (self) => {
                        gsap.set(timelineRef.current, {
                            scaleY: self.progress,
                        });
                    },
                },
            });
        }
    }, []);

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="py-20 bg-background relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-glow/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2
                        ref={titleRef}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        Work Experience
                    </h2>
                    <p
                        ref={subtitleRef}
                        className="text-lg text-muted max-w-2xl mx-auto"
                    >
                        My professional journey in software development
                    </p>
                </div>

                {/* Timeline */}
                <div className="max-w-4xl mx-auto relative">
                    <div
                        className="space-y-12 relative z-10"
                        id="timeline-container"
                    >
                        {/* Continuous Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 top-2 -bottom-2 h-full w-0.5">
                            {/* Static Background Track */}
                            <div className="absolute inset-0 w-full h-full bg-white/5 rounded-full"></div>
                            
                            {/* Animated Progress Line */}
                            <div
                                ref={timelineRef}
                                className="absolute top-0 left-0 w-full h-full bg-accent shadow-[0_0_15px_rgba(180,83,9,0.6)] rounded-full"
                                style={{ transformOrigin: "top" }}
                            ></div>
                        </div>

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
