"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User, Heart, Target, Award } from "lucide-react";
import { profile } from "@/constants/profile";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

import BackgroundEffects from "@/components/BackgroundEffects";

// ... (imports remain the same)

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
            <BackgroundEffects />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2
                        ref={titleRef}
                        className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    >
                        About <span className="text-accent">Me</span>
                    </h2>
                </div>

                <div ref={contentRef} className="max-w-6xl mx-auto">
                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        {/* Text Content */}
                        <div>
                            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                Passionate Full Stack Developer
                            </h3>
                            <div className="space-y-4 text-muted text-lg leading-relaxed">
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
                                <h4 className="text-xl font-semibold text-white mb-6">
                                    Interests & Focus Areas
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                    {profile.interests
                                        .slice(0, 6)
                                        .map((interest, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 rounded-full text-sm font-medium hover:bg-accent/20 hover:border-accent/50 transition-all duration-300"
                                            >
                                                {interest}
                                            </span>
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* Profile Image Placeholder */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative group">
                                <div className="w-80 h-80 bg-white/5 backdrop-blur-md border border-white/10 rounded-[24px] flex items-center justify-center overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                                    <div className="text-center text-white">
                                        <User
                                            size={120}
                                            className="mx-auto mb-4 opacity-50 group-hover:text-accent transition-colors duration-300"
                                        />
                                        <h4 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                            {profile.basics.name}
                                        </h4>
                                        <p className="text-accent font-medium mt-2">
                                            Full Stack Developer
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-accent-glow/20 rounded-[24px] blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="text-center p-8 bg-white/5 backdrop-blur-md rounded-[24px] shadow-lg border border-white/10 hover:border-accent/40 transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(180,83,9,0.3)]"
                            >
                                <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-2xl mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                                    <stat.icon className="w-7 h-7 text-accent" />
                                </div>
                                <h4 className="text-3xl font-bold text-white mb-2">
                                    {stat.value}
                                </h4>
                                <p className="text-muted font-medium">
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
