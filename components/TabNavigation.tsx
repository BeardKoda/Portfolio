'use client'

interface TabNavigationProps {
  activeTab?: string
  onTabChange?: (tabId: string) => void
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: 'hero', name: 'Home' },
    { id: 'skills', name: 'Skills' },
    { id: 'projects', name: 'Projects' },
    { id: 'experience', name: 'Experience' },
  ]

  const handleClick = (tabId: string) => {
    // Use provided onTabChange or fall back to global handleTabChange
    if (onTabChange) {
      onTabChange(tabId)
    } else if ((window as any).handleTabChange) {
      ;(window as any).handleTabChange(tabId)
    }
  }

  // Get activeTab from window if not provided
  const currentActiveTab = activeTab || (window as any).activeSectionId || 'hero'

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="glass rounded-full px-4 py-2 flex gap-2 backdrop-blur-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.id)}
            className={`px-4 py-2 rounded-full font-body text-sm font-semibold transition-all duration-300 ${
              currentActiveTab === tab.id
                ? 'bg-green-600 text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  )
}

