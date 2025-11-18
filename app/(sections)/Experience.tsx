'use client'

import Timeline from '@/components/Timeline'
import SectionCover from '@/components/SectionCover'
import NavigationButton from '@/components/NavigationButton'

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
  {
    company: 'StartupXY',
    role: 'Backend Developer',
    years: '2018 - 2020',
    responsibilities: [
      'Developed scalable backend services handling 100K+ requests/day',
      'Designed and implemented database schemas',
      'Collaborated with frontend team on API design',
    ],
  },
  {
    company: 'StartupXZ',
    role: 'Backend Developer',
    years: '2018 - 2020',
    responsibilities: [
      'Developed scalable backend services handling 100K+ requests/day',
      'Designed and implemented database schemas',
      'Collaborated with frontend team on API design',
    ],
  },
  {
    company: 'StartupYZ',
    role: 'Backend Developer',
    years: '2018 - 2020',
    responsibilities: [
      'Developed scalable backend services handling 100K+ requests/day',
      'Designed and implemented database schemas',
      'Collaborated with frontend team on API design',
    ],
  },
  {
    company: 'StartupYZ',
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
  const navigateToProjects = () => {
    const handleTabChange = (window as any).handleTabChange
    if (handleTabChange) {
      handleTabChange('projects')
    }
  }

  return (
    <SectionCover id="experience" className="min-h-screen overflow-hidden py-20">
      <section
        className="min-h-screen flex flex-col items-center px-6 pt-20 pb-20 h-screen"
      >
      <div className="flex flex-col max-w-6xl mx-auto w-full h-full">
        <div className="flex flex-col mb-4 text-center lg:text-left !py-6 flex-shrink-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 relative inline-block">
            Experience
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-accent animate-[underline_1s_ease-out_forwards]" />
          </h2>
        </div>
        <div className="w-full overflow-y-auto py-6 flex-1 max-h-[calc(100vh-250px)]">
          <Timeline items={experience} />
        </div>
        <div className="flex items-center justify-start mt-8 gap-4 flex-shrink-0">
          <NavigationButton
            onClick={navigateToProjects}
            direction="backward"
            delay={1000}
          />
        </div>
      </div>
    </section>
    </SectionCover>
  )
}

