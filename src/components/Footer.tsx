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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-6">
                                Quick Links
                            </h4>
                            <ul className="space-y-3">
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
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

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-6">
                                Get In Touch
                            </h4>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-gray-300">Email</p>
                                    <a
                                        href={`mailto:${profile.basics.contact.email}`}
                                        className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                                    >
                                        {profile.basics.contact.email}
                                    </a>
                                </div>
                                <div>
                                    <p className="text-gray-300">Phone</p>
                                    <a
                                        href={`tel:${profile.basics.contact.phone}`}
                                        className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                                    >
                                        {profile.basics.contact.phone}
                                    </a>
                                </div>
                                <div>
                                    <p className="text-gray-300">Location</p>
                                    <p className="text-white">
                                        {profile.basics.location.city},{" "}
                                        {profile.basics.location.state}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-gray-700/50">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-gray-300">
                                <span>Made with</span>
                                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                                <span>by {profile.basics.name}</span>
                            </div>

                            <div className="text-gray-400 text-sm">
                                © {new Date().getFullYear()}{" "}
                                {profile.basics.name}. All rights reserved.
                            </div>

                            <button
                                onClick={scrollToTop}
                                className="group p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                                aria-label="Scroll to top"
                            >
                                <ArrowUp className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        </footer>
    );
};

export default Footer;
