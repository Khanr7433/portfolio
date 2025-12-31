"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";

const BackgroundEffects: React.FC = () => {
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        setMounted(true);
        
        // Background pulses
        gsap.to(".bg-orb", {
            scale: 1.2,
            opacity: 0.4,
            duration: 4,
            stagger: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Floating particles
        const particles = document.querySelectorAll(".particle");
        particles.forEach((particle) => {
            gsap.to(particle, {
                y: "random(-100, 100)",
                x: "random(-100, 100)",
                opacity: "random(0.3, 0.8)",
                duration: "random(10, 20)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        });
    }, [mounted]);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Large Orbs */}
            <div className="bg-orb absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[120px]"></div>
            <div className="bg-orb absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent-glow/10 rounded-full blur-[120px]"></div>
            <div className="bg-orb absolute top-[40%] left-[40%] transform -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-purple-900/5 rounded-full blur-[100px]"></div>
            
            {/* Particles - Only render on client to avoid hydration mismatch */}
            {mounted && Array.from({ length: 15 }).map((_, i) => (
                <div
                    key={i}
                    className="particle absolute rounded-full bg-white/5"
                    style={{
                        width: Math.random() * 6 + 2 + "px",
                        height: Math.random() * 6 + 2 + "px",
                        top: Math.random() * 100 + "%",
                        left: Math.random() * 100 + "%",
                    }}
                ></div>
            ))}
        </div>
    );
};

export default BackgroundEffects;
