"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building } from "lucide-react";
import { experience } from "@/constants/experience";
import BackgroundEffects from "@/components/BackgroundEffects";

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
                <div className="group relative bg-white/5 backdrop-blur-md rounded-[24px] shadow-lg border border-white/10 hover:border-accent/40 transition-all duration-300 p-6 hover:shadow-[0_0_20px_rgba(180,83,9,0.2)] hover:-translate-y-1">
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
                            <div className="p-1.5 rounded-lg bg-accent/10 border border-accent/20">
                                <Building className="w-4 h-4 text-accent" />
                            </div>
                            <h4 className="text-lg font-semibold text-gray-200">
                                {exp.company}
                            </h4>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed">
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
    const [showAll, setShowAll] = React.useState(false);

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
            <BackgroundEffects />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2
                        ref={titleRef}
                        className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    >
                        Work <span className="text-accent">Experience</span>
                    </h2>
                    <p
                        ref={subtitleRef}
                        className="text-xl text-muted max-w-2xl mx-auto"
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

                        {experience
                            .slice(0, showAll ? experience.length : 1)
                            .map(
                                (exp: (typeof experience)[0], index: number) => (
                                    <ExperienceCard
                                        key={exp.id}
                                        exp={exp}
                                        index={index}
                                        isLast={index === (showAll ? experience.length : 1) - 1}
                                    />
                                )
                            )}
                    </div>
                </div>

                {/* Show More / Show Less Button */}
                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="group relative px-8 py-3 bg-white/5 backdrop-blur-sm border border-accent/20 rounded-full overflow-hidden hover:border-accent/60 transition-all duration-300"
                    >
                        <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative z-10 text-white font-medium flex items-center gap-2">
                            {showAll ? "Show Less" : "Show Full Work History"}
                            <svg 
                                className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
};
