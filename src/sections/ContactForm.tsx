"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Send, User, MessageSquare } from "lucide-react";
import { profile } from "@/constants/profile";
import LoadingSpinner from "@/components/LoadingSpinner";
import toast, { Toaster } from "react-hot-toast";

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
                            background:
                                "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "12px",
                            padding: "16px 20px",
                            fontSize: "14px",
                            fontWeight: "500",
                            boxShadow:
                                "0 10px 25px -5px rgba(59, 130, 246, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                        },
                        iconTheme: {
                            primary: "#fff",
                            secondary: "transparent",
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
                        background:
                            "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "12px",
                        padding: "16px 20px",
                        fontSize: "14px",
                        fontWeight: "500",
                        boxShadow:
                            "0 10px 25px -5px rgba(239, 68, 68, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    },
                    iconTheme: {
                        primary: "#fff",
                        secondary: "transparent",
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
                className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden"
            >
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2
                            ref={titleRef}
                            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4"
                        >
                            Get In Touch
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Have a project in mind? Let&apos;s discuss how we
                            can work together to bring your ideas to life.
                        </p>
                        <div className="mt-6 flex justify-center">
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        </div>
                    </div>

                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Let&apos;s Start a Conversation
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-8">
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
                                        className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/20 hover:shadow-xl dark:hover:shadow-gray-900/40 transition-all duration-300 group"
                                    >
                                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                                            <info.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">
                                                {info.label}
                                            </h4>
                                            {info.href !== "#" ? (
                                                <a
                                                    href={info.href}
                                                    className="text-blue-600 dark:text-blue-400 hover:underline"
                                                >
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    {info.value}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Availability Status */}
                            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700">
                                <div className="flex items-center mb-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                                    <span className="font-semibold text-green-800 dark:text-green-300">
                                        {profile.availability.status}
                                    </span>
                                </div>
                                <p className="text-green-700 dark:text-green-400 text-sm">
                                    Available for{" "}
                                    {profile.availability.preferred_work_type
                                        .join(", ")
                                        .toLowerCase()}{" "}
                                    opportunities
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/20 p-8">
                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                        >
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formState.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                        >
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formState.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                        placeholder="Project Discussion"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Message
                                    </label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formState.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={6}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 resize-none"
                                            placeholder="Tell me about your project..."
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
