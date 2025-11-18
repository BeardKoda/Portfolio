"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import AnimatedText from "@/components/AnimatedText";
import TypewriterText from "@/components/TypewriterText";
import SectionCover from "@/components/SectionCover";

export default function Hero() {
  const profileImageRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (profileImageRef.current) {
      anime({
        targets: profileImageRef.current,
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: "easeOutCubic",
      });
    }

    // Animate the greeting container
    if (greetingRef.current) {
      anime({
        targets: greetingRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.95, 1],
        duration: 1200,
        easing: "easeOutExpo",
        delay: 200,
      });
    }
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    {
      name: "Twitter",
      url: "https://twitter.com/beardkoda",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/beardkoda",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/beardkoda",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Email",
      url: "mailto:contact@beardkoda.com",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
  ];

  return (
    <SectionCover id="hero" className="min-h-screen">
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 pt-20"
      >
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* First Section: Profile Image with Social Icons */}
          <div className="flex flex-col items-center gap-8 w-full lg:w-1/3">
            <div
              ref={profileImageRef}
              className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-green-600/30 shadow-2xl"
            >
              {/* Placeholder for profile image - replace with actual image */}
              <div className="w-full h-full bg-gradient-to-br from-green-600/20 to-blue-accent/20 flex items-center justify-center">
                <span className="text-6xl font-bold text-white/50">BK</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass p-4 rounded-full hover:bg-green-600/20 hover:border-green-600/50 transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="text-white/70 group-hover:text-green-600 transition-colors duration-300">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Second Section: Welcome Message */}
          <div className="flex flex-col justify-center w-full lg:w-2/3 text-center lg:text-left gap-4">
            <div
              ref={greetingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight opacity-0"
            >
              <TypewriterText
                text="Hi 👋, I'm Beardkoda."
                className="text-white"
                delay={500}
                speed={30}
                highlightWord="Beardkoda"
                highlightColor="text-green-600"
              />
            </div>
            <div className="flex flex-col gap-2">
              <TypewriterText
                text="I'm a DevOps & System Architect with a passion for building scalable, reliable systems. With expertise in cloud architecture, containerization, and automation, I help teams deliver high-quality software faster and more efficiently."
                className="text-lg md:text-xl font-body text-white/70 leading-relaxed"
                delay={1800}
                speed={30}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
    </SectionCover>
  );
}
