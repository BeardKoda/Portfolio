'use client'

import ProjectCard from '@/components/ProjectCard'
import SectionCover from '@/components/SectionCover'

const projects = [
  {
    title: 'Cloud Infrastructure Platform',
    description: 'Scalable multi-cloud infrastructure management platform with automated provisioning and monitoring.',
    techStack: ['AWS', 'Terraform', 'Kubernetes', 'Python'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://demo.example.com',
  },
  {
    title: 'CI/CD Pipeline Automation',
    description: 'Enterprise-grade CI/CD pipeline with automated testing, deployment, and rollback capabilities.',
    techStack: ['Jenkins', 'Docker', 'Git', 'Bash'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://demo.example.com',
  },
  {
    title: 'Microservices Architecture',
    description: 'Containerized microservices application with service mesh and distributed tracing.',
    techStack: ['Kubernetes', 'Docker', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://demo.example.com',
  },
  {
    title: 'DevOps Dashboard',
    description: 'Real-time monitoring and analytics dashboard for infrastructure and application metrics.',
    techStack: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://demo.example.com',
  },
  {
    title: 'Infrastructure as Code',
    description: 'Comprehensive IaC solution for managing cloud resources across multiple environments.',
    techStack: ['Terraform', 'Ansible', 'AWS', 'Python'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://demo.example.com',
  },
  {
    title: 'Container Orchestration',
    description: 'Advanced container orchestration system with auto-scaling and load balancing.',
    techStack: ['Kubernetes', 'Docker', 'Helm', 'Prometheus'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://demo.example.com',
  },
]

export default function Projects() {
  return (
    <SectionCover id="projects" className="min-h-screen">
      <section
        className="min-h-screen py-20 px-6"
      >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 relative inline-block">
            Projects
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-accent animate-[underline_1s_ease-out_forwards]" />
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              githubUrl={project.githubUrl}
              demoUrl={project.demoUrl}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
    </SectionCover>
  )
}

