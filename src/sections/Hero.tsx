"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Play } from "lucide-react";
import { profile } from "@/constants/profile";

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.5 });

        // Background animation
        gsap.fromTo(
            backgroundRef.current,
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
        );

        // Main content animations
        tl.fromTo(
            titleRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        )
            .fromTo(
                subtitleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                "-=0.5"
            )
            .fromTo(
                descriptionRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                "-=0.3"
            )
            .fromTo(
                ctaRef.current?.children || [],
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.2,
                    ease: "power2.out",
                },
                "-=0.2"
            );

        // Parallax effect on scroll
        gsap.to(backgroundRef.current, {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });

        // Typewriter effect for titles
        const titles = profile.basics.title;
        let currentIndex = 0;

        const typewriterEffect = () => {
            if (subtitleRef.current) {
                const currentTitle = titles[currentIndex];
                subtitleRef.current.textContent = "";

                gsap.to(
                    {},
                    {
                        duration: currentTitle.length * 0.05,
                        ease: "none",
                        onUpdate: function () {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const progress = (this as any).progress();
                            const charIndex = Math.floor(
                                progress * currentTitle.length
                            );
                            if (subtitleRef.current) {
                                subtitleRef.current.textContent =
                                    currentTitle.slice(0, charIndex);
                            }
                        },
                        onComplete: () => {
                            setTimeout(() => {
                                currentIndex =
                                    (currentIndex + 1) % titles.length;
                                typewriterEffect();
                            }, 2000);
                        },
                    }
                );
            }
        };

        setTimeout(typewriterEffect, 1500);
    }, []);

    const handleViewProjects = () => {
        const projectsSection = document.querySelector("#projects");
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            id="home"
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        >
            {/* Background Elements */}
            <div ref={backgroundRef} className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

                {/* Animated gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Main Title */}
                    <h1
                        ref={titleRef}
                        className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 leading-tight"
                    >
                        <div className="mb-1">Hello, I&apos;m</div>
                        <div className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {profile.basics.name}
                        </div>
                    </h1>

                    {/* Animated Subtitle */}
                    <div
                        ref={subtitleRef}
                        className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-cyan-300 mb-6 h-12 sm:h-16 flex items-center justify-center min-h-[3rem]"
                        style={{ fontFamily: "monospace" }}
                    >
                        {/* Typewriter text will be inserted here */}
                    </div>

                    {/* Description */}
                    <p
                        ref={descriptionRef}
                        className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed text-center"
                    >
                        {profile.basics.summary}
                    </p>

                    {/* CTA Buttons */}
                    <div
                        ref={ctaRef}
                        className="flex justify-center items-center"
                    >
                        <button
                            onClick={handleViewProjects}
                            className="group relative px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-slate-900 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                        >
                            <Play size={20} />
                            View Projects
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping delay-1000"></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-ping delay-2000"></div>
            <div className="absolute bottom-40 left-20 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-3000"></div>
            <div className="absolute bottom-20 right-10 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
        </section>
    );
};

export default Hero;
