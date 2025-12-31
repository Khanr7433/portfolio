"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Play } from "lucide-react";
import { profile } from "@/constants/profile";
import BackgroundEffects from "@/components/BackgroundEffects";

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.2 });

        // Main content animations
        tl.fromTo(
            titleRef.current,
            { y: 100, opacity: 0, filter: "blur(10px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" }
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
            yPercent: -20,
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

    const handleScrollTo = (id: string) => {
        const section = document.querySelector(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            id="home"
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
        >
            {/* Background Gradients & Particles */}
            <div ref={backgroundRef} className="absolute inset-0 z-0">
                <BackgroundEffects />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Main Title */}
                    <div className="mb-8">
                        <div className="mb-4 text-muted text-xl sm:text-2xl font-medium tracking-wide uppercase opacity-80">
                            Hello, I&apos;m
                        </div>
                        <h1
                            ref={titleRef}
                            className="text-7xl sm:text-8xl lg:text-9xl font-heading font-bold text-white mb-2 tracking-tighter leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        >
                             <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                                {profile.basics.name}
                            </span>
                        </h1>
                        <div className="h-1 w-24 mx-auto bg-accent rounded-full mt-6 mb-6 shadow-[0_0_15px_rgba(180,83,9,0.5)]"></div>
                    </div>

                    {/* Animated Subtitle */}
                    <div
                        ref={subtitleRef}
                        className="text-2xl sm:text-4xl font-light text-accent-glow mb-8 h-12 flex items-center justify-center tracking-wide"
                    >
                        {/* Typewriter text */}
                    </div>

                    {/* Description */}
                    <p
                        ref={descriptionRef}
                        className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed text-center"
                    >
                        {profile.basics.summary}
                    </p>

                    {/* CTA Buttons */}
                    <div
                        ref={ctaRef}
                        className="flex flex-col sm:flex-row justify-center items-center gap-6"
                    >
                        <button
                            onClick={() => handleScrollTo("#projects")}
                            className="group px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-glow hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-[0_0_25px_rgba(180,83,9,0.4)] ring-2 ring-transparent hover:ring-white/20"
                        >
                            <Play size={20} fill="currentColor" className="group-hover:translate-x-1 transition-transform" />
                            View Projects
                        </button>
                        
                        <button
                            onClick={() => handleScrollTo("#contact-form")}
                            className="group px-8 py-4 bg-transparent border-2 border-white/10 text-white font-semibold rounded-full hover:bg-white/5 hover:border-white/30 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
                        >
                            Contact Me
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
