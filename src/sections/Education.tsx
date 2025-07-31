"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, MapPin, Award, BookOpen } from "lucide-react";
import { education } from "@/constants/education";

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

    const getGradeColor = (grade: string) => {
        if (grade === "A+" || parseFloat(grade) >= 9.0)
            return "from-green-500 to-emerald-500";
        if (grade === "A" || parseFloat(grade) >= 8.0)
            return "from-blue-500 to-cyan-500";
        if (grade === "B" || parseFloat(grade) >= 7.0)
            return "from-orange-500 to-yellow-500";
        return "from-gray-500 to-gray-600";
    };

    const formatYear = (year: string) => {
        return year;
    };

    return (
        <div className="relative flex items-center justify-center">
            {/* Timeline dot and line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10 flex items-center justify-center">
                    <GraduationCap className="w-2.5 h-2.5 text-white" />
                </div>
                {!isLast && (
                    <div
                        ref={lineRef}
                        className="w-0.5 h-32 bg-gradient-to-b from-blue-500 to-purple-600 mt-2"
                    ></div>
                )}
            </div>

            {/* Content */}
            <div
                ref={cardRef}
                className={`w-full max-w-lg ${
                    index % 2 === 0 ? "mr-auto pr-8" : "ml-auto pl-8"
                }`}
            >
                <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/20 p-6 hover:shadow-xl dark:hover:shadow-gray-900/40 transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    {/* Duration badge */}
                    <div className="absolute -top-3 left-6">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium rounded-full shadow-lg">
                            {formatYear(edu.startYear)} -{" "}
                            {formatYear(edu.endYear)}
                        </span>
                    </div>

                    {/* Institution and degree */}
                    <div className="mt-4 mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2">
                            {edu.degree}
                        </h3>
                        <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                            {edu.institution}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
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
                                    <Award className="w-4 h-4 text-yellow-500" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {edu.percentage}% ({edu.grade})
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Relevant Courses */}
                    {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                        <div className="mb-4">
                            <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
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
                                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md font-medium"
                                            >
                                                {course}
                                            </span>
                                        )
                                    )}
                                {edu.relevantCourses.length > 6 && (
                                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-md">
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
            id="education"
            ref={sectionRef}
            className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-slate-900 relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-green-400/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2
                        ref={titleRef}
                        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                    >
                        Education
                    </h2>
                    <p
                        ref={subtitleRef}
                        className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                    >
                        My academic journey and educational achievements
                    </p>
                </div>

                {/* Timeline */}
                <div className="max-w-5xl mx-auto">
                    <div className="space-y-16">
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
                    <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/20">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                            {education.length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Degrees Completed
                        </div>
                    </div>
                    <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/20">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                            9.11
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Current CGPA
                        </div>
                    </div>
                    <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/20">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                            A+
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Current Grade
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
