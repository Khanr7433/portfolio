import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export class AnimationUtils {
    static fadeInUp(element: string | Element, delay: number = 0) {
        return gsap.fromTo(
            element,
            {
                y: 50,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay,
                ease: "power2.out",
            }
        );
    }

    static fadeInLeft(element: string | Element, delay: number = 0) {
        return gsap.fromTo(
            element,
            {
                x: -50,
                opacity: 0,
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                delay,
                ease: "power2.out",
            }
        );
    }

    static fadeInRight(element: string | Element, delay: number = 0) {
        return gsap.fromTo(
            element,
            {
                x: 50,
                opacity: 0,
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                delay,
                ease: "power2.out",
            }
        );
    }

    static scaleIn(element: string | Element, delay: number = 0) {
        return gsap.fromTo(
            element,
            {
                scale: 0.8,
                opacity: 0,
            },
            {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                delay,
                ease: "back.out(1.7)",
            }
        );
    }

    static staggerChildren(container: string | Element, childSelector: string) {
        return gsap.fromTo(
            `${container} ${childSelector}`,
            {
                y: 30,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
            }
        );
    }

    static parallax(element: string | Element, speed: number = 0.5) {
        return gsap.to(element, {
            yPercent: -50 * speed,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });
    }

    static typeWriter(
        element: string | Element,
        text: string,
        speed: number = 0.05
    ) {
        const target =
            typeof element === "string"
                ? document.querySelector(element)
                : element;
        if (!target) return;

        target.textContent = "";

        return gsap.to(
            {},
            {
                duration: text.length * speed,
                ease: "none",
                onUpdate: function () {
                    const progress = this.progress();
                    const currentIndex = Math.floor(progress * text.length);
                    target.textContent = text.slice(0, currentIndex);
                },
            }
        );
    }

    static morphPath(element: string | Element, newPath: string) {
        return gsap.to(element, {
            attr: { d: newPath },
            duration: 1,
            ease: "power2.inOut",
        });
    }

    static infiniteRotate(element: string | Element) {
        return gsap.to(element, {
            rotation: 360,
            duration: 10,
            repeat: -1,
            ease: "none",
        });
    }

    static hoverLift(element: string | Element) {
        const target =
            typeof element === "string"
                ? document.querySelectorAll(element)
                : [element];

        target.forEach((el) => {
            el.addEventListener("mouseenter", () => {
                gsap.to(el, {
                    y: -10,
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });

            el.addEventListener("mouseleave", () => {
                gsap.to(el, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });
        });
    }

    static scrollReveal(trigger: string | Element, element?: string | Element) {
        const targetElement = element || trigger;

        return gsap.fromTo(
            targetElement,
            {
                y: 100,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }

    static magneticEffect(element: string | Element) {
        const target =
            typeof element === "string"
                ? document.querySelector(element)
                : element;
        if (!target) return;

        const handleMouseMove = (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const rect = target.getBoundingClientRect();
            const x = mouseEvent.clientX - rect.left - rect.width / 2;
            const y = mouseEvent.clientY - rect.top - rect.height / 2;

            gsap.to(target, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(target, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)",
            });
        };

        target.addEventListener("mousemove", handleMouseMove);
        target.addEventListener("mouseleave", handleMouseLeave);
    }
}

export default AnimationUtils;
