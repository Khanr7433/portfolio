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
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
        >
            {/* Background Gradients */}
            <div ref={backgroundRef} className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent-glow/20 rounded-full blur-[120px]"></div>
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Main Title */}
                    <h1
                        ref={titleRef}
                        className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-none"
                    >
                        <div className="mb-2 text-muted text-2xl sm:text-3xl font-medium tracking-normal">Hello, I&apos;m</div>
                        <span className="bg-gradient-to-r from-white via-white to-accent bg-clip-text text-transparent">
                            {profile.basics.name}
                        </span>
                    </h1>

                    {/* Animated Subtitle */}
                    <div
                        ref={subtitleRef}
                        className="text-2xl sm:text-3xl font-medium text-muted mb-8 h-12 flex items-center justify-center"
                    >
                        {/* Typewriter text will be inserted here */}
                    </div>

                    {/* Description */}
                    <p
                        ref={descriptionRef}
                        className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed text-center"
                    >
                        {profile.basics.summary}
                    </p>

                    {/* CTA Buttons */}
                    <div
                        ref={ctaRef}
                        className="flex justify-center items-center gap-4"
                    >
                        <button
                            onClick={handleViewProjects}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-glow hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(180,83,9,0.4)]"
                        >
                            <Play size={20} fill="currentColor" />
                            View Projects
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
