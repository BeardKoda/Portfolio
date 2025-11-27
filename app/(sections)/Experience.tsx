'use client'

import Timeline from '@/components/Timeline'
import SectionCover from '@/components/SectionCover'

const experience = [
  {
    company: 'Tender Trade',
    role: 'Co-Founder & CTO',
    years: '2022 - Present',
    responsibilities: [
      'Led infrastructure automation initiatives reducing deployment time by 60%',
      'Architected multi-cloud solutions serving 1M+ users',
      'Mentored team of 5 engineers on best practices',
    ],
  },
  {
    company: 'Pakt World',
    role: 'System Architect',
    years: '2022 - 2025',
    responsibilities: [
      'Built CI/CD pipelines for 20+ microservices',
      'Implemented container orchestration with Kubernetes',
      'Reduced infrastructure costs by 40% through optimization',
    ],
  },
  {
    company: 'Protocoh',
    role: 'Software Engineer | Cloud & DevOps Engineer',
    years: '2021 - 2022',
    responsibilities: [
      'Built scalable backend services handling 100K+ requests/day',
      'Designed and implemented database schemas',
      'Collaborated with frontend team on API design and architecture',
      'Built scalable backend services handling 100K+ requests/day',
      'Designed and implemented database schemas',
      'Collaborated with frontend team on API design and architecture',
    ],
  },
  {
    company: 'LendSqr',
    role: 'Software Engineer',
    years: '2020 - 2021',
    responsibilities: [
      'Developed scalable backend services handling 100K+ requests/day',
      'Designed and implemented database schemas',
      'Collaborated with frontend team on API design',
    ],
  },
  {
    company: 'Bitmama',
    role: 'Software Engineer',
    years: '2020',
    responsibilities: [
      'Developed scalable backend services handling 100K+ requests/day',
      'Designed and implemented database schemas',
      'Collaborated with frontend team on API design and architecture',
    ],
  },
]

export default function Experience() {

  return (
    <SectionCover id="experience" className="min-h-screen py-20">
      <section
        className="min-h-screen flex flex-col items-center px-6 pt-20 pb-20"
      >
      <div className="flex flex-col max-w-6xl mx-auto w-full">
        <div className="flex flex-col mb-4 text-center lg:text-left !py-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 relative inline-block">
            Experience
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-accent animate-[underline_1s_ease-out_forwards]" />
          </h2>
        </div>
        <div className="w-full py-6">
          <Timeline items={experience} />
        </div>
      </div>
    </section>
    </SectionCover>
  )
}

