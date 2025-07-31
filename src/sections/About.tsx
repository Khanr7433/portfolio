"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User, Heart, Target, Award } from "lucide-react";
import { profile } from "@/constants/profile";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const About: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (titleRef.current && contentRef.current) {
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
                contentRef.current.children,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }
    }, []);

    const stats = [
        { icon: User, label: "Experience", value: "2+ Years" },
        { icon: Award, label: "Projects", value: "10+" },
        { icon: Target, label: "Success Rate", value: "98%" },
        { icon: Heart, label: "Client Satisfaction", value: "100%" },
    ];

    return (
        <section
            id="about"
            ref={sectionRef}
            className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2
                        ref={titleRef}
                        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                    >
                        About Me
                    </h2>
                </div>

                <div ref={contentRef} className="max-w-6xl mx-auto">
                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        {/* Text Content */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Passionate Full Stack Developer
                            </h3>
                            <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                <p>{profile.basics.summary}</p>
                                <p>
                                    I specialize in building modern, scalable
                                    web applications using the MERN stack. My
                                    passion lies in creating user-centric
                                    solutions that not only look great but also
                                    provide exceptional user experiences.
                                </p>
                                <p>
                                    When I&apos;m not coding, you&apos;ll find
                                    me exploring new technologies, contributing
                                    to open-source projects, or sharing
                                    knowledge with the developer community.
                                </p>
                            </div>

                            {/* Interests */}
                            <div className="mt-8">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Interests & Focus Areas
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                    {profile.interests
                                        .slice(0, 6)
                                        .map((interest, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200"
                                            >
                                                {interest}
                                            </span>
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* Profile Image Placeholder */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative">
                                <div className="w-80 h-80 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <User
                                            size={120}
                                            className="mx-auto mb-4 opacity-30"
                                        />
                                        <h4 className="text-2xl font-bold">
                                            {profile.basics.name}
                                        </h4>
                                        <p className="text-blue-200">
                                            Full Stack Developer
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl blur-xl opacity-30"></div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/20 hover:shadow-xl dark:hover:shadow-gray-900/40 transition-all duration-300 group"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    {stat.value}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
