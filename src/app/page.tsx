"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import Education from "@/sections/Education";
import Tools from "@/sections/Tools";
import ContactForm from "@/sections/ContactForm";

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Header />

            <main>
                <Hero />
                <About />
                <Skills />
                <Tools />
                <Projects />
                <Experience />
                <Education />
                <ContactForm />
            </main>

            <Footer />
        </div>
    );
};

export default Home;
