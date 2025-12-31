"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Send, User, MessageSquare } from "lucide-react";
import { profile } from "@/constants/profile";
import LoadingSpinner from "@/components/LoadingSpinner";
import toast, { Toaster } from "react-hot-toast";
import BackgroundEffects from "@/components/BackgroundEffects";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface FormState {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const ContactForm: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [formState, setFormState] = useState<FormState>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (titleRef.current && formRef.current) {
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
                formRef.current.children,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // EmailJS configuration - using Next.js public environment variables
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
            const toEmail = process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL;

            // Check if all required environment variables are present
            if (!serviceId || !templateId || !publicKey || !toEmail) {
                throw new Error(
                    "EmailJS configuration is incomplete. Please check your environment variables."
                );
            }

            // Prepare template parameters
            const templateParams = {
                from_name: formState.name,
                from_email: formState.email,
                subject: formState.subject,
                message: formState.message,
                to_email: toEmail,
            };

            // Send email using EmailJS
            const response = await fetch(
                "https://api.emailjs.com/api/v1.0/email/send",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        service_id: serviceId,
                        template_id: templateId,
                        user_id: publicKey,
                        template_params: templateParams,
                    }),
                }
            );

            if (response.ok) {
                // Reset form
                setFormState({ name: "", email: "", subject: "", message: "" });
                toast.success(
                    "🚀 Message sent successfully! I'll get back to you soon.",
                    {
                        duration: 5000,
                        position: "top-center",
                        style: {
                            background: "#0f172a", // surface
                            color: "#fff",
                            border: "1px solid rgba(180, 83, 9, 0.3)", // accent/30
                            borderRadius: "16px",
                            padding: "16px 20px",
                            fontSize: "14px",
                            fontWeight: "500",
                            boxShadow:
                                "0 10px 25px -5px rgba(180, 83, 9, 0.2)",
                        },
                        iconTheme: {
                            primary: "#b45309", // accent
                            secondary: "#fff",
                        },
                    }
                );
            } else {
                throw new Error("Failed to send email");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            toast.error(
                "⚠️ Failed to send message. Please try again or contact me directly via email.",
                {
                    duration: 6000,
                    position: "top-center",
                    style: {
                        background: "#0f172a", // surface
                        color: "#fff",
                        border: "1px solid rgba(220, 38, 38, 0.3)", // red-600/30
                        borderRadius: "16px",
                        padding: "16px 20px",
                        fontSize: "14px",
                        fontWeight: "500",
                        boxShadow:
                            "0 10px 25px -5px rgba(220, 38, 38, 0.2)",
                    },
                    iconTheme: {
                        primary: "#dc2626", // red-600
                        secondary: "#fff",
                    },
                }
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: Mail,
            label: "Email",
            value: profile.basics.contact.email,
            href: `mailto:${profile.basics.contact.email}`,
        },
        {
            icon: Phone,
            label: "Phone",
            value: profile.basics.contact.phone,
            href: `tel:${profile.basics.contact.phone}`,
        },
        {
            icon: MapPin,
            label: "Location",
            value: `${profile.basics.location.city}, ${profile.basics.location.state}, ${profile.basics.location.country}, ${profile.basics.location.postalCode}`,
            href: "#",
        },
    ];

    return (
        <>
            <Toaster />
            <section
                id="contact-form"
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
                            Get In <span className="text-accent">Touch</span>
                        </h2>
                        <p className="text-xl text-muted max-w-2xl mx-auto">
                            Have a project in mind? Let&apos;s discuss how we
                            can work together.
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-3xl font-heading font-bold text-white mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                    Let&apos;s Start a Conversation
                                </h3>
                                <p className="text-muted mb-8 text-lg leading-relaxed">
                                    I&apos;m always open to discussing new
                                    opportunities, creative projects, or
                                    potential collaborations. Feel free to reach
                                    out through any of the following channels.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center p-6 bg-white/5 backdrop-blur-md rounded-[24px] shadow-lg border border-white/10 hover:border-accent/40 transition-all duration-300 group hover:-translate-x-[-8px] hover:shadow-[0_0_20px_rgba(180,83,9,0.15)]"
                                    >
                                        <div className="p-4 bg-accent/10 rounded-xl mr-6 group-hover:bg-accent/20 transition-colors duration-300">
                                            <info.icon className="w-6 h-6 text-accent" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg mb-1">
                                                {info.label}
                                            </h4>
                                            {info.href !== "#" ? (
                                                <a
                                                    href={info.href}
                                                    className="text-gray-400 hover:text-accent transition-colors duration-200"
                                                >
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className="text-gray-400">
                                                    {info.value}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Availability Status */}
                            <div className="p-6 bg-white/5 backdrop-blur-md rounded-[24px] border border-accent/20 hover:border-accent/40 transition-colors duration-300">
                                <div className="flex items-center mb-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                                    <span className="font-semibold text-white">
                                        {profile.availability.status}
                                    </span>
                                </div>
                                <p className="text-muted text-sm">
                                    Available for{" "}
                                    {profile.availability.preferred_work_type
                                        .join(", ")
                                        .toLowerCase()}{" "}
                                    opportunities
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white/5 backdrop-blur-md rounded-[24px] shadow-xl border border-white/10 p-8 relative overflow-hidden group hover:border-accent/30 transition-all duration-300">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-white mb-2"
                                        >
                                            Full Name
                                        </label>
                                        <div className="relative group/input">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within/input:text-accent transition-colors duration-200" />
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formState.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-4 bg-background/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-accent/50 focus:border-accent text-white placeholder-gray-600 transition-all duration-200 outline-none"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-white mb-2"
                                        >
                                            Email Address
                                        </label>
                                        <div className="relative group/input">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within/input:text-accent transition-colors duration-200" />
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formState.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-4 bg-background/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-accent/50 focus:border-accent text-white placeholder-gray-600 transition-all duration-200 outline-none"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block text-sm font-medium text-white mb-2"
                                    >
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formState.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-4 bg-background/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-accent/50 focus:border-accent text-white placeholder-gray-600 transition-all duration-200 outline-none"
                                        placeholder="Project Discussion"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-white mb-2"
                                    >
                                        Message
                                    </label>
                                    <div className="relative group/input">
                                        <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-500 group-focus-within/input:text-accent transition-colors duration-200" />
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formState.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={6}
                                            className="w-full pl-10 pr-4 py-4 bg-background/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-accent/50 focus:border-accent text-white placeholder-gray-600 transition-all duration-200 resize-none outline-none"
                                            placeholder="Tell me about your project..."
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-accent text-white font-bold py-4 px-6 rounded-full hover:shadow-[0_0_25px_rgba(180,83,9,0.4)] transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-white/10"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <LoadingSpinner
                                                size="sm"
                                                color="white"
                                            />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactForm;
