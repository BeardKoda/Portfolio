'use client'

import Timeline from '@/components/Timeline'
import SectionCover from '@/components/SectionCover'

const experience = [
  {
    company: 'Tech Corp',
    role: 'Senior DevOps Engineer',
    years: '2022 - Present',
    responsibilities: [
      'Led infrastructure automation initiatives reducing deployment time by 60%',
      'Architected multi-cloud solutions serving 1M+ users',
      'Mentored team of 5 engineers on best practices',
    ],
  },
  {
    company: 'Cloud Solutions Inc',
    role: 'DevOps Engineer',
    years: '2020 - 2022',
    responsibilities: [
      'Built CI/CD pipelines for 20+ microservices',
      'Implemented container orchestration with Kubernetes',
      'Reduced infrastructure costs by 40% through optimization',
    ],
  },
  {
    company: 'StartupXYZ',
    role: 'Backend Developer',
    years: '2018 - 2020',
    responsibilities: [
      'Developed scalable backend services handling 100K+ requests/day',
      'Designed and implemented database schemas',
      'Collaborated with frontend team on API design',
    ],
  },
]

export default function Experience() {
  return (
    <SectionCover id="experience" className="min-h-screen">
      <section
        className="min-h-screen py-20 px-6"
      >
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 relative inline-block">
            Experience
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-accent animate-[underline_1s_ease-out_forwards]" />
          </h2>
        </div>
        <Timeline items={experience} />
      </div>
    </section>
    </SectionCover>
  )
}

