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
        { icon: User, label: "Years Experience", value: "1+" },
        { icon: Award, label: "Projects Completed", value: "15+" },
        { icon: Target, label: "Technologies", value: "30+" },
        { icon: Heart, label: "Certifications", value: "4+" },
    ];

    return (
        <section
            id="about"
            ref={sectionRef}
            className="py-20 bg-background relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-40 h-40 bg-blue-900/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent-glow/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2
                        ref={titleRef}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        About Me
                    </h2>
                </div>

                <div ref={contentRef} className="max-w-6xl mx-auto">
                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        {/* Text Content */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6">
                                Passionate Full Stack Developer
                            </h3>
                            <div className="space-y-4 text-muted">
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
                                <h4 className="text-lg font-semibold text-white mb-4">
                                    Interests & Focus Areas
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                    {profile.interests
                                        .slice(0, 6)
                                        .map((interest, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-2 bg-surface border border-accent/20 text-gray-300 rounded-full text-sm font-medium hover:border-accent/60 transition-colors duration-200"
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
                                <div className="w-80 h-80 bg-surface border border-white/10 rounded-[24px] flex items-center justify-center overflow-hidden">
                                    <div className="text-center text-white">
                                        <User
                                            size={120}
                                            className="mx-auto mb-4 opacity-30"
                                        />
                                        <h4 className="text-2xl font-bold">
                                            {profile.basics.name}
                                        </h4>
                                        <p className="text-accent">
                                            Full Stack Developer
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-accent-glow/20 rounded-[24px] blur-xl -z-10"></div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="text-center p-6 bg-surface rounded-[24px] shadow-lg border border-white/5 hover:border-accent/40 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(180,83,9,0.15)]"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-xl mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                                    <stat.icon className="w-6 h-6 text-accent" />
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-2">
                                    {stat.value}
                                </h4>
                                <p className="text-muted text-sm">
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
