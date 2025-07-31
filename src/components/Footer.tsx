"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import { profile } from "@/constants/profile";

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
            className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white pt-20 pb-8 overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div ref={contentRef}>
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {/* About Section */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4">
                                    RK
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">
                                        {profile.basics.name}
                                    </h3>
                                    <p className="text-gray-400">
                                        Full Stack Developer
                                    </p>
                                </div>
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
                                        className="group relative p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                                    >
                                        <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="flex justify-center md:justify-start">
                            <div className="w-full max-w-xs">
                                <h4 className="text-xl font-semibold text-white mb-8 text-center md:text-left">
                                    Navigation
                                </h4>
                                <ul className="grid grid-cols-2 gap-y-4 gap-x-6">
                                    {quickLinks.map((link, index) => (
                                        <li key={index}>
                                            <a
                                                href={link.href}
                                                className="group relative text-gray-300 hover:text-white transition-all duration-300 font-medium flex items-center gap-2"
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
                                                <span className="w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                                <span className="group-hover:translate-x-1 transform transition-transform duration-300">
                                                    {link.name}
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-gray-700/50 relative">
                        <div className="flex items-center justify-center">
                            <div className="flex items-center gap-2 text-gray-300 text-base font-medium">
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
                            className="group absolute right-0 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-lg border border-blue-400/30 hover:border-blue-400/50 hover:from-blue-500/30 hover:to-purple-600/30 transition-all duration-300 hover:scale-110"
                            aria-label="Scroll to top"
                        >
                            <ArrowUp className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors duration-300" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        </footer>
    );
};

export default Footer;
