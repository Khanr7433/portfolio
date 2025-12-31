"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import { profile } from "@/constants/profile";
import BackgroundEffects from "@/components/BackgroundEffects";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const Footer: React.FC = () => {
    const footerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            gsap.fromTo(
                contentRef.current.children,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const socialLinks = [
        { icon: Github, href: profile.social.github, label: "GitHub" },
        { icon: Linkedin, href: profile.social.linkedin, label: "LinkedIn" },
        {
            icon: Mail,
            href: `mailto:${profile.basics.contact.email}`,
            label: "Email",
        },
    ];

    const quickLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Tools", href: "#tools" },
        { name: "Projects", href: "#projects" },
        { name: "Experience", href: "#experience" },
        { name: "Education", href: "#education" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <footer
            id="contact"
            ref={footerRef}
            className="relative bg-background text-white pt-20 pb-8 overflow-hidden"
        >
            {/* Background decoration */}
            <BackgroundEffects />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div ref={contentRef}>
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {/* About Section */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center mb-6 cursor-default">
                                <span className="text-3xl font-bold text-white tracking-tight inline-block transition-all duration-300 hover:text-accent hover:scale-105">
                                    RK.
                                </span>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                                {profile.basics.summary}
                            </p>
                            <div className="flex items-center gap-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="group relative p-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:border-accent/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(180,83,9,0.2)]"
                                    >
                                        <social.icon className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors duration-300" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="flex justify-center md:justify-start">
                            <div className="w-full max-w-xs">
                                <h4 className="text-xl font-semibold text-white mb-8 text-center md:text-left">
                                    Quick Links
                                </h4>
                                <ul className="grid grid-cols-2 gap-y-4 gap-x-6">
                                    {quickLinks.map((link, index) => (
                                        <li key={index}>
                                            <a
                                                href={link.href}
                                                className="text-muted hover:text-accent transition-colors duration-300 font-medium block"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const element =
                                                        document.querySelector(
                                                            link.href
                                                        );
                                                    if (element) {
                                                        element.scrollIntoView({
                                                            behavior: "smooth",
                                                        });
                                                    }
                                                }}
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-white/5 relative">
                        <div className="flex items-center justify-center">
                            <div className="flex items-center gap-2 text-muted text-base font-medium">
                                <span>Made with</span>
                                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                                <span>by</span>
                                <span className="text-white font-semibold">
                                    {profile.basics.name}
                                </span>
                            </div>
                        </div>

                        {/* Scroll to Top Button - Positioned on the right side */}
                        <button
                            onClick={scrollToTop}
                            className="group absolute right-0 top-1/2 transform -translate-y-1/2 p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:border-accent/40 hover:bg-accent hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(180,83,9,0.3)]"
                            aria-label="Scroll to top"
                        >
                            <ArrowUp className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-slate-900 via-accent to-slate-900 opacity-30"></div>
        </footer>
    );
};

export default Footer;
