import React, { useEffect, useState } from "react";

type TabItem = {
  id: string;
  label: string;
  description?: string;
  content: React.ReactNode | ((position: string) => React.ReactNode);
}

interface TabScrollProps {
  tabs: TabItem[];
  title?: React.ReactNode;
  headerComponent?: React.ReactNode;
  showDescription?: boolean;
  onTabHover?: (tabId: string) => void;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
}

export const TabScroll: React.FC<TabScrollProps> = ({ 
  tabs,
  title,
  headerComponent,
  showDescription = true,
  onTabHover,
  gradientFrom = "from-purple-200",
  gradientVia = "via-purple-200",
  gradientTo = "to-pink-300"
}) => {
  const [hoveredTab, setHoveredTab] = useState<string>(tabs[0]?.id || "");
  
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const sectionRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleTabHover = (tabId: string) => {
    setHoveredTab(tabId);
    onTabHover?.(tabId);
    const section = sectionRefs.current[`${tabId}-middle`];
    const container = scrollContainerRef.current;
    if (section && container) {
      const scrollTo = section.offsetLeft - (container.clientWidth / 2) + (section.offsetWidth / 2);
      container.scrollTo({
        left: scrollTo,
        behavior: "smooth"
      });
    }
  };

  // for smooth scroll to hovered tab
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    const middleSection = sectionRefs.current[`${hoveredTab}-middle`];
    
    if (middleSection) {
      const scrollTo = middleSection.offsetLeft - (scrollContainer.clientWidth / 2) + (middleSection.offsetWidth / 2);
      scrollContainer.scrollTo({
        left: scrollTo,
        behavior: "smooth"
      });
    }
  }, [hoveredTab]);

  // for infinite scroll
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const middleSection = sectionRefs.current[`${hoveredTab}-middle`];
      const beforeSection = sectionRefs.current[`${hoveredTab}-before`];
      const afterSection = sectionRefs.current[`${hoveredTab}-after`];
      
      if (!middleSection || !beforeSection || !afterSection) return;

      const scrollLeft = scrollContainer.scrollLeft;
      const beforeThreshold = beforeSection.offsetLeft + beforeSection.offsetWidth * 0.5;
      const afterThreshold = afterSection.offsetLeft + afterSection.offsetWidth * 0.5;

      if (scrollLeft < beforeThreshold) {
        const offset = middleSection.offsetLeft - beforeSection.offsetLeft;
        scrollContainer.scrollLeft = scrollLeft + offset;
      } else if (scrollLeft > afterThreshold) {
        const offset = afterSection.offsetLeft - middleSection.offsetLeft;
        scrollContainer.scrollLeft = scrollLeft - offset;
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [hoveredTab]);

  const currentTab = tabs.find(tab => tab.id === hoveredTab);

  return (
    <div className="overflow-x-hidden w-full">
      {headerComponent}

      <div className={`w-full flex flex-col justify-center bg-gradient-to-br ${gradientFrom} ${gradientVia} ${gradientTo} px-4 md:px-8 py-8 overflow-hidden`}>
        {title}
        <div className="flex gap-2 md:gap-4 overflow-x-auto pb-4 scrollbar-hide mb-6 pr-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onMouseEnter={() => handleTabHover(tab.id)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                hoveredTab === tab.id 
                  ? "bg-white text-gray-900 shadow-lg scale-105" 
                  : "bg-white/60 text-gray-700 hover:bg-white/80 hover:shadow-md"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {showDescription && currentTab?.description && (
          <div className="items-center justify-center w-full mb-6">
            <p className="text-xs xs:text-base text-gray-700 italic">
              {currentTab.description}
            </p>
          </div>
        )}

        <div 
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide w-full"
        >
          {["before", "middle", "after"].map((position) =>
            tabs.map((tab) => (
              <div
                key={`${tab.id}-${position}`}
                ref={(el) => (sectionRefs.current[`${tab.id}-${position}`] = el)}
                className="flex gap-4 md:gap-6 flex-shrink-0"
              >
                {typeof tab.content === 'function' ? tab.content(position) : tab.content}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TabScroll;
