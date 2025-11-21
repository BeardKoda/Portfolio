"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import Image from "next/image";
import TypewriterText from "@/components/TypewriterText";
import SectionCover from "@/components/SectionCover";
import AnimatedBorder from "@/components/AnimatedBorder";
import ContentAnimatedBorder from "@/components/ContentAnimatedBorder";
import { socialLinks } from "@/data/herodata";

export default function Hero() {
  const profileImageRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (profileImageRef.current) {
      // Initial entrance animation for profile image
      anime({
        targets: profileImageRef.current,
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: "easeOutCubic",
      });
    }

    if (borderRef.current) {
      // Initial entrance animation for border
      anime({
        targets: borderRef.current,
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: "easeOutCubic",
        complete: () => {
          // Start continuous rotation of border after entrance
          if (borderRef.current) {
            anime({
              targets: borderRef.current,
              rotate: 360,
              duration: 20000,
              easing: "linear",
              loop: true,
            });
          }
        },
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

  return (
    <SectionCover id="hero" className="flex h-[80vh] relative justify-center items-center !my-auto">
      <AnimatedBorder sectionId="hero" nextSectionId="skills" />
      <section className=" flex flex-col items-center justify-center px-6 pt-20 my-auto h-full">
        <div ref={contentContainerRef} className="max-w-6xl mx-auto w-full relative">
          {/* <ContentAnimatedBorder containerRef={contentContainerRef} nextSectionId="skills" /> */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
            {/* First Section: Profile Image with Social Icons */}
            <div className="flex flex-col items-center gap-8 w-full lg:w-1/3">
              <div className="relative w-64 h-64">
                {/* Rotating Border */}
                <div
                  ref={borderRef}
                  className="absolute inset-0 rounded-full border-4 border-green-600/30"
                  style={{
                    boxShadow: "0 0 20px rgba(0, 255, 136, 0.3)",
                  }}
                />
                {/* Profile Image */}
                <div
                  ref={profileImageRef}
                  className="absolute inset-0 rounded-full overflow-hidden shadow-2xl hover:scale-102 transition-all duration-300"
                  style={{
                    margin: "4px",
                  }}
                >
                  {/* Placeholder for profile image - replace with actual image */}
                  <div className="w-full h-full bg-gradient-to-br from-green-600/20 to-blue-accent/20 flex items-center justify-center">
                    {/* <span className="text-6xl font-bold text-white/50">BK</span> */}
                    <Image
                      src="https://beardkoda-portfolio.sfo3.cdn.digitaloceanspaces.com/public/beardkoda.jpeg"
                      alt="Profile"
                      width={256}
                      height={256}
                    />
                  </div>
                </div>
              </div>

              {/* Social Icons */}
              <div className="grid grid-cols-4 gap-4">
                {socialLinks.map(
                  ({ name, url, icon: IconComponent }, index) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 rounded-full hover:bg-green-600/20 hover:border-green-600/50 transition-all duration-300 hover:scale-250"
                      aria-label={name}
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <div className="text-white/70 group-hover:text-green-600 transition-colors duration-300">
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </a>
                  )
                )}
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
              <div className="flex flex-col gap-4">
                <TypewriterText
                  text={`I'm a DevOps Engineer and System Architect with a deep passion for building scalable, secure, and high-performance infrastructure. I specialize in cloud architecture, container orchestration, CI/CD automation, AI integrations, and designing production-ready RAG systems that connect real-time data to intelligent workflows. My focus is always the same: systems that are fast, stable, and ready for real-world pressure.

Beyond engineering, I'm a hands-on maker — I love fixing things, working with tools, and building small mechanical projects. I'm also fueled by creativity: I produce music, create remixes, and enjoy exploring sound design whenever I get the chance.

Whether it's distributed systems, AI-powered apps, or a new beat, I enjoy taking ideas from zero to fully working — fast, clean, and elegant.`}
                  className="text-lg md:text-xl font-body text-white/70 leading-relaxed whitespace-pre-line"
                  delay={1800}
                  speed={5}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionCover>
  );
}
