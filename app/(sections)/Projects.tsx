'use client'

import ProjectCard from '@/components/ProjectCard'
import SectionCover from '@/components/SectionCover'
import projects from '@/data/projects'

export default function Projects() {

  return (
    <SectionCover id="projects" className="flex h-[80vh] relative justify-center items-center !my-auto">
      <section
        className="flex flex-col items-center justify-center px-6 pt-20"
      >
      <div className="flex flex-col max-w-6xl mx-auto w-full gap-6">
        <div className="mb-4 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 relative inline-block">
            Projects
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-accent animate-[underline_1s_ease-out_forwards]" />
          </h2>
        </div>
        <div className="text-lg md:text-xl font-body text-white/70 leading-relaxed mb-6">
          <p>
            Projects we've worked on range from cloud infrastructure to AI automation—each built clean, efficient, and built to last.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              githubUrl={project.githubUrl}
              demoUrl={project.demoUrl}
              imageUrl={project.imageUrl}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
    </SectionCover>
  )
}

