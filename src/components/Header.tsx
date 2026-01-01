"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { profile } from "@/constants/profile";
import BackgroundEffects from "@/components/BackgroundEffects";

const Header: React.FC = () => {
    const headerRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const pathname = usePathname();

    const navItems = useMemo(
        () => [
            { name: "Home", href: "#home" },
            { name: "About", href: "#about" },
            { name: "Skills", href: "#skills" },
            { name: "Tools", href: "#tools" },
            { name: "Projects", href: "#projects" },
            { name: "Experience", href: "#experience" },
            { name: "Education", href: "#education" },
            { name: "Contact", href: "#contact-form" },
        ],
        []
    );

    const socialLinks = [
        { icon: Github, href: profile.social.github, label: "GitHub" },
        { icon: Linkedin, href: profile.social.linkedin, label: "LinkedIn" },
        {
            icon: Mail,
            href: `mailto:${profile.basics.contact.email}`,
            label: "Email",
        },
    ];

    useEffect(() => {
        // Set active section based on pathname
        // Set active section based on pathname
        if (pathname === "/all-projects") {
            setActiveSection("projects");
            // Do NOT return here, we need the scroll listener for the background effect
        } else {
            setActiveSection("home"); // Default to home for main page
        }

        // Initial animations
        const tl = gsap.timeline();

        tl.fromTo(
            logoRef.current,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        ).fromTo(
            navRef.current?.children || [],
            { y: -30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
            },
            "-=0.4"
        );

        // Scroll effect and active section detection
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 50);

            // Skip section detection on non-home pages
            if (pathname !== "/") return;

            // Fallback: Manual section detection based on scroll position
            const sections = navItems
                .map((item) => {
                    const element = document.querySelector(item.href);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        return {
                            id: item.href.substring(1),
                            offsetTop: rect.top + scrollY,
                            height: rect.height,
                        };
                    }
                    return null;
                })
                .filter(
                    (
                        section
                    ): section is {
                        id: string;
                        offsetTop: number;
                        height: number;
                    } => section !== null
                );

            const currentScrollPosition = scrollY + 150; // Account for header height

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && currentScrollPosition >= section.offsetTop) {
                    setActiveSection(section.id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Active section detection with improved logic
        const observerOptions = {
            threshold: 0.2,
            rootMargin: "-20% 0px -60% 0px",
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const targetElement = entry.target as HTMLElement;
                    if (targetElement && targetElement.id) {
                        setActiveSection(targetElement.id);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(
            observerCallback,
            observerOptions
        );

        // Add a slight delay to ensure DOM is ready
        const timer = setTimeout(() => {
            // Observe all sections
            navItems.forEach((item) => {
                const sectionId = item.href.substring(1); // Remove the #
                const element = document.querySelector(`#${sectionId}`);
                if (element) {
                    observer.observe(element);
                } else {
                    console.warn(`Section with id "${sectionId}" not found`);
                }
            });
        }, 100);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
            clearTimeout(timer);
        };
    }, [navItems, pathname]);

    useEffect(() => {
        // Animate header background on scroll
        gsap.to(headerRef.current, {
            backgroundColor: isScrolled
                ? "rgba(17, 24, 39, 0.7)" // Reduced opacity for glassy look
                : "transparent",
            backdropFilter: isScrolled ? "blur(12px)" : "none", // Increased blur
            borderBottom: isScrolled
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid transparent", // Added subtle border
            duration: 0.3,
            ease: "power2.out",
        });
    }, [isScrolled]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);

        if (!isMenuOpen) {
            gsap.fromTo(
                mobileMenuRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
            );
            gsap.fromTo(
                mobileMenuRef.current?.querySelectorAll("a") || [],
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.1 }
            );
        } else {
            gsap.to(mobileMenuRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.2,
                ease: "power2.in",
            });
        }
    };

    const handleNavClick = (href: string, itemName: string) => {
        setIsMenuOpen(false);

        // If clicking on Projects and we're on homepage, scroll to projects section
        // If clicking on Projects and we're on all-projects page, stay on all-projects
        // If clicking on Projects from any other context, go to projects section on homepage
        if (itemName === "Projects") {
            if (pathname === "/all-projects") {
                return; // Stay on all-projects page
            } else {
                // Go to projects section on homepage
                if (pathname !== "/") {
                    window.location.href = "/#projects";
                    return;
                }
            }
        } else if (pathname === "/all-projects" && itemName !== "Projects") {
            // If we're on all-projects page and clicking other nav items, go to homepage first
            window.location.href = `/${href}`;
            return;
        }

        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? "shadow-lg" : ""
            }`}
        >
            {/* Background Effects - Visible mostly when scrolled or for subtle depth */}
            <div
                className={`absolute inset-0 transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"}`}
            >
                <div className="absolute inset-0 bg-background/50"></div>
                <BackgroundEffects />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex items-center justify-between h-14 md:h-16">
                    {/* Logo */}
                    <div
                        ref={logoRef}
                        className="flex items-center cursor-pointer group"
                        onClick={() => handleNavClick("#home", "Home")}
                    >
                        <span className="text-2xl md:text-3xl font-bold text-white tracking-tight inline-block transition-all duration-300 hover:text-accent hover:scale-105">
                            RK.
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav
                        ref={navRef}
                        className="hidden lg:flex items-center space-x-8"
                    >
                        {navItems.map((item, index) => {
                            const isActive =
                                activeSection === item.href.substring(1);

                            return (
                                <a
                                    key={index}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(item.href, item.name);
                                    }}
                                    className={`relative font-medium transition-colors duration-300 ${
                                        isActive
                                            ? "text-white"
                                            : "text-muted hover:text-white"
                                    }`}
                                >
                                    {item.name}
                                    {isActive && (
                                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full"></span>
                                    )}
                                </a>
                            );
                        })}
                    </nav>

                    {/* Social Links & Theme Toggle */}
                    <div className="hidden md:flex items-center space-x-4">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="p-2 text-gray-400 hover:text-accent transform hover:scale-110 transition-all duration-300"
                            >
                                <social.icon size={20} />
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center space-x-2">
                        <button
                            onClick={toggleMenu}
                            className="p-2 text-gray-400 hover:text-accent"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div
                        ref={mobileMenuRef}
                        className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl shadow-lg border-t border-white/5"
                    >
                        <nav className="px-4 py-6 space-y-4">
                            {navItems.map((item, index) => {
                                const isActive =
                                    activeSection === item.href.substring(1);
                                return (
                                    <a
                                        key={index}
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(
                                                item.href,
                                                item.name
                                            );
                                        }}
                                        className={`block text-lg font-medium transition-colors duration-300 ${
                                            isActive
                                                ? "text-accent"
                                                : "text-muted hover:text-accent"
                                        }`}
                                    >
                                        {item.name}
                                    </a>
                                );
                            })}
                            <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="p-2 text-gray-400 hover:text-accent"
                                    >
                                        <social.icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
