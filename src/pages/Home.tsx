import type React from "react";
import { useState } from "react";
import { PageGrid } from "@/components/item-grids.tsx";
import "@/styling/Animations.css";
import { Link } from "react-router-dom";

const exploreLinks = [
  {
    to: "/blog",
    label: "Blog",
    description:
      "Articles I've written about tech, projects, living abroad, and other misc topics.",
  },
  {
    to: "/projects",
    label: "Projects",
    description:
      "Coding, research, and other projects I've built or worked on.",
  },
  {
    to: "/binjo",
    label: "BINJO",
    description:
      "A card where I keep track of my bucket list items for the year.",
  },
];

const tabs = [
  {
    id: "professionally",
    label: "Professionally",
    content: (
      <>
        <p className="text-sm text-gray-600 leading-relaxed">
          I currently work as a software engineer at{" "}
          <a href="https://trail-ml.com" className="underline hover:text-gray-900">
            trail
          </a>
          , a Munich-based AI Governance start-up. I am interested in technical AI governance and policy. Specifically, in 
          (a) how incoming tech regulations can be written in an ‘implementable’ way, and 
          (b) how existing tech regulations should be translated to practice – going from what’s written in the policy to operationalizable/monitorable technical specifications. 
          I am currently focused on how software can be built and used to facilitate this.

          <br />
          <br />

          I graduated from <a href="https://discover.engineering.utoronto.ca/programs/engineering-programs/engineering-science/" className="underline hover:text-gray-900">Engineering Science</a> (Electrical and Computer
          Engineering major) at the University of Toronto in 2024.
        </p>
      </>
    ),
  },
  {
    id: "personally",
    label: "Personally",
    content: (
      <>
        <p className="text-sm text-gray-600 leading-relaxed">
          I grew up in Canada but I'm currently living in Germany. I
          have a cat named Barney, and a guinea pig named Bonnie.
          I love running, hiking, cross-country skiing, and
          generally exploring outside & trying new sports or races. I
          also really love reading and listening to podcasts and am
          always open to recommendations! :)
        </p>
      </>
    ),
  },
  {
    id: "all-the-rest",
    label: "All the Rest",
    content: (
      <>
        <p className="text-sm text-gray-600 leading-relaxed">
          Of course there is lots more to me than can be shown here! 
          If anything on this site is of interest to you,
          definitely reach out. I love meeting new people (and
          re-finding old people) so I'd love to chat :)
        </p>
      </>
    ),
  },
];

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className="flex flex-col justify-center min-h-[calc(100vh-200px)]">
      <PageGrid columns={0} style={{ width: "100%", maxWidth: "100vw" }}>
        <div className="flex flex-col w-full px-4 md:px-8 lg:px-20 max-w-full">
          <div className="flex flex-row items-center gap-8 md:gap-12 mb-6 md:my-14 z-10">
            <div className="flex items-center justify-center shrink-0">
              <img
                src="/assets/jo.jpg"
                alt="jo"
                className="h-32 md:h-48 max-w-full rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-lg md:text-2xl font-semibold text-gray-900">
                Hello! My name is Joanna.
              </h2>
              <p
                className="typewriter mt-2 text-sm md:text-base text-gray-500"
                style={
                  {
                    "--type-steps": 46,
                    "--type-target": "46ch",
                  } as React.CSSProperties
                }
           
              >
                Welcome to my little corner of the internet :)
              </p>
            </div>
          </div>
          <div className="border-b border-gray-300 mb-6 md:mb-8" />
          <div className="flex flex-col md:flex-row w-full items-stretch gap-4 md:gap-4 max-w-full">

              <div className="relative z-10 flex flex-col md:flex-row flex-1 px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-3 gap-3 md:gap-8 bg-blue-50/70 border border-gray-300 rounded-lg">
              <div className="flex flex-row md:flex-col gap-1 shrink-0 mt-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`text-left text-xs sm:text-sm leading-relaxed px-2 sm:px-3 py-1 md:py-2 rounded transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "text-gray-900 font-medium bg-blue-100"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 rounded-lg py-1 px-1 sm:px-3 sm:py-2 md:px-4 md:py-2 overflow-hidden min-h-[180px] md:min-h-[200px]">
                {activeContent}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2 md:mt-4">
            {exploreLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group flex flex-col gap-1 p-3 md:p-4 rounded-lg border border-gray-300 bg-gray-100/60 hover:bg-gray-100/90 hover:border-gray-400 transition-colors no-underline"
              >
                <span className="text-sm md:text-base font-medium text-gray-900 group-hover:text-(--purple) transition-colors">
                  {link.label} →
                </span>
                <span className="text-xs md:text-sm text-gray-600 leading-snug">
                  {link.description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </PageGrid>
    </div>
  );
};

export default Home;
