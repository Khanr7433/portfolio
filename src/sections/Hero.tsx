"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ChevronDown, Download, Play } from "lucide-react";
import { profile } from "@/constants/profile";

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);
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
            )
            .fromTo(
                scrollIndicatorRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
                "-=0.1"
            );

        // Floating animation for scroll indicator
        gsap.to(scrollIndicatorRef.current, {
            y: 10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
        });

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

    const handleScrollDown = () => {
        const nextSection = document.querySelector("#about");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleDownloadCV = () => {
        // Add CV download logic here
        console.log("Download CV clicked");
    };

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
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background */}
            <div
                ref={backgroundRef}
                className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
            >
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                </div>

                {/* Animated gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-4xl mx-auto">
                    {/* Main Title */}
                    <h1
                        ref={titleRef}
                        className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6"
                    >
                        Hello, I&apos;m{" "}
                        <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {profile.basics.name}
                        </span>
                    </h1>

                    {/* Animated Subtitle */}
                    <div
                        ref={subtitleRef}
                        className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-cyan-300 mb-8 h-12 sm:h-16 flex items-center justify-center min-h-[3rem]"
                        style={{ fontFamily: "monospace" }}
                    >
                        {/* Typewriter text will be inserted here */}
                    </div>

                    {/* Description */}
                    <p
                        ref={descriptionRef}
                        className="text-lg sm:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        {profile.basics.summary}
                    </p>

                    {/* CTA Buttons */}
                    <div
                        ref={ctaRef}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
                    >
                        <button
                            onClick={handleDownloadCV}
                            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                        >
                            <Download size={20} />
                            Download CV
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                        </button>

                        <button
                            onClick={handleViewProjects}
                            className="group relative px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-slate-900 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                        >
                            <Play size={20} />
                            View Projects
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div
                    ref={scrollIndicatorRef}
                    onClick={handleScrollDown}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
                >
                    <div className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300">
                        <span className="text-sm mb-2 group-hover:text-cyan-400">
                            Scroll Down
                        </span>
                        <ChevronDown size={24} className="animate-bounce" />
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
