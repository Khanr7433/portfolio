"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, MapPin, Award, BookOpen } from "lucide-react";
import { education } from "../constants/education";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface EducationCardProps {
    edu: (typeof education)[0];
    index: number;
    isLast: boolean;
}

const EducationCard: React.FC<EducationCardProps> = ({
    edu,
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

    const getGradeColor = (grade: string) => {
        if (grade === "A+" || parseFloat(grade) >= 9.0)
            return "from-accent to-amber-500"; // Bronze/Gold for top grades
        if (grade === "A" || parseFloat(grade) >= 8.0)
            return "from-blue-600 to-indigo-600"; // Deep Midnight Blue for good grades
        if (grade === "B" || parseFloat(grade) >= 7.0)
            return "from-slate-500 to-gray-500"; // Silver/Gray for average
        return "from-gray-600 to-gray-700";
    };

    const formatYear = (year: string) => {
        return year;
    };

    return (
        <div className="relative flex items-center justify-center">
            {/* Timeline dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <div className="w-4 h-4 bg-accent/80 rounded-full border-4 border-background shadow-lg z-10 flex items-center justify-center">
                    <GraduationCap className="w-2 h-2 text-white" />
                </div>
            </div>

            {/* Content */}
            <div
                ref={cardRef}
                className={`w-full max-w-md ${
                    index % 2 === 0 ? "mr-auto pr-8" : "ml-auto pl-8"
                }`}
            >
                <div className="group relative bg-surface rounded-[24px] shadow-lg border border-white/5 hover:border-accent/40 transition-all duration-300 p-6 hover:shadow-[0_0_20px_rgba(180,83,9,0.15)]">
                    {/* Duration badge */}
                    <div className="absolute -top-3 left-6">
                        <span className="px-3 py-1 bg-accent/20 border border-accent/40 text-accent-glow text-xs font-bold rounded-full shadow-lg backdrop-blur-sm group-hover:bg-accent group-hover:text-white transition-all duration-300">
                            {formatYear(edu.startYear)} -{" "}
                            {formatYear(edu.endYear)}
                        </span>
                    </div>

                    {/* Institution and degree */}
                    <div className="mt-4 mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300 mb-2">
                            {edu.degree}
                        </h3>
                        <h4 className="text-lg font-semibold text-accent mb-2">
                            {edu.institution}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-muted mb-2">
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{edu.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <BookOpen className="w-4 h-4" />
                                <span>{edu.field}</span>
                            </div>
                        </div>
                    </div>

                    {/* Grade/CGPA */}
                    <div className="mb-4">
                        <div className="flex items-center gap-4">
                            {edu.cgpa && (
                                <div className="flex items-center gap-2">
                                    <Award className="w-4 h-4 text-accent" />
                                    <span className="text-sm font-medium text-gray-300">
                                        CGPA:{" "}
                                        <span
                                            className={`font-bold bg-gradient-to-r ${getGradeColor(edu.cgpa)} bg-clip-text text-transparent`}
                                        >
                                            {edu.cgpa}
                                        </span>
                                    </span>
                                </div>
                            )}
                            {edu.percentage && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-300">
                                        {edu.percentage}% ({edu.grade})
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Relevant Courses */}
                    {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                        <div className="mb-4">
                            <h5 className="text-sm font-semibold text-gray-300 mb-3">
                                Key Subjects:
                            </h5>
                            <div className="flex flex-wrap gap-2">
                                {edu.relevantCourses
                                    .slice(0, 6)
                                    .map(
                                        (
                                            course: string,
                                            courseIndex: number
                                        ) => (
                                            <span
                                                key={courseIndex}
                                                className="px-2 py-1 bg-background border border-white/5 text-gray-400 text-xs rounded-md font-medium"
                                            >
                                                {course}
                                            </span>
                                        )
                                    )}
                                {edu.relevantCourses.length > 6 && (
                                    <span className="px-2 py-1 bg-background text-gray-500 text-xs rounded-md">
                                        +{edu.relevantCourses.length - 6} more
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Achievement indicator */}
                    <div
                        className={`absolute top-4 right-4 w-3 h-3 bg-gradient-to-r ${getGradeColor(edu.grade || edu.cgpa || "0")} rounded-full shadow-lg`}
                    ></div>
                </div>
            </div>
        </div>
    );
};

const Education: React.FC = () => {
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
                    trigger: "#education-timeline-container",
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
            id="education"
            ref={sectionRef}
            className="py-20 bg-background relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-glow/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-glow/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2
                        ref={titleRef}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        Education
                    </h2>
                    <p
                        ref={subtitleRef}
                        className="text-lg text-muted max-w-2xl mx-auto"
                    >
                        My academic journey and educational achievements
                    </p>
                </div>

                {/* Timeline */}
                <div className="max-w-5xl mx-auto relative">
                    <div
                        className="space-y-12 relative z-10"
                        id="education-timeline-container"
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

                        {education.map(
                            (edu: (typeof education)[0], index: number) => (
                                <EducationCard
                                    key={edu.id}
                                    edu={edu}
                                    index={index}
                                    isLast={index === education.length - 1}
                                />
                            )
                        )}
                    </div>
                </div>

                {/* Education Stats */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                    <div className="text-center p-6 bg-surface rounded-[24px] shadow-lg border border-white/5 hover:border-accent/40 transition-all duration-300">
                        <div className="text-3xl font-bold text-accent mb-2">
                            {education.length}
                        </div>
                        <div className="text-sm text-gray-400">
                            Courses Completed
                        </div>
                    </div>
                    <div className="text-center p-6 bg-surface rounded-[24px] shadow-lg border border-white/5 hover:border-accent/40 transition-all duration-300">
                        <div className="text-3xl font-bold text-accent mb-2">
                            9.11
                        </div>
                        <div className="text-sm text-gray-400">
                            Current CGPA
                        </div>
                    </div>
                    <div className="text-center p-6 bg-surface rounded-[24px] shadow-lg border border-white/5 hover:border-accent/40 transition-all duration-300">
                        <div className="text-3xl font-bold text-accent mb-2">
                            A+
                        </div>
                        <div className="text-sm text-gray-400">
                            Current Grade
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
