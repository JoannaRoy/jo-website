import React, { useState } from "react";

type TabItem = {
  id: string;
  label: string;
  description?: string;
  content: React.ReactNode | ((position: string) => React.ReactNode);
  colour?: string;
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
  backgroundPattern?: React.ReactNode;
  backgroundVariant?: "gradient" | "transparent" | "color";
  backgroundColor?: string;
  dividerComponent?: React.ReactNode | null;
}

export const TabScroll: React.FC<TabScrollProps> = ({ 
  tabs,
  title,
  headerComponent,
  showDescription = true,
  onTabHover,
  gradientFrom = "from-purple-200",
  gradientVia = "via-purple-200",
  gradientTo = "to-pink-300",
  backgroundPattern,
  backgroundVariant = "gradient",
  backgroundColor,
  dividerComponent = null
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

  const handleScroll: React.UIEventHandler<HTMLDivElement> = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

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

  const currentTab = tabs.find(tab => tab.id === hoveredTab);
  const backgroundClasses =
    backgroundVariant === "transparent"
      ? "bg-transparent"
      : backgroundVariant === "color"
        ? (backgroundColor ?? "")
        : backgroundVariant === "gradient"
          ? `bg-gradient-to-br ${gradientFrom} ${gradientVia} ${gradientTo}`
          : "";

  return (
    <div className="overflow-x-hidden w-full">
      {headerComponent}
      {dividerComponent}
      <div className="relative w-full overflow-hidden">
        {backgroundPattern && (
          <div className="absolute inset-0 w-full h-full">
            {backgroundPattern}
          </div>
        )}
        <div className={`relative z-10 w-full flex flex-col justify-center ${backgroundClasses} px-4 md:px-8 py-8 overflow-hidden`}>
          {title}
          <div className="flex gap-2 md:gap-4 overflow-x-auto pb-4 scrollbar-hide mb-6 pr-16">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onMouseEnter={() => handleTabHover(tab.id)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  hoveredTab === tab.id 
                    ? "bg-white text-gray-900 shadow-lg scale-105" 
                    : `${tab.colour ?? "bg-white/60"} text-gray-700 hover:bg-white/80 hover:shadow-md`
                }`}
                type="button"
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
          onScroll={handleScroll}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide w-full"
        >
          {["before", "middle", "after"].map((position) =>
            tabs.map((tab) => (
              <div
                key={`${tab.id}-${position}`}
                ref={(el) => {
                  sectionRefs.current[`${tab.id}-${position}`] = el;
                }}
                className="flex gap-4 md:gap-6 shrink-0 rounded-md shadow-md"
              >
                {typeof tab.content === 'function' ? tab.content(position) : tab.content}
              </div>
            ))
          )}
        </div>
      </div>
      </div>
      {dividerComponent}
    </div>
  );
};

export default TabScroll;
