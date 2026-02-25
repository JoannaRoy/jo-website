import type React from "react";
import { useState } from "react";
import { PageGrid } from "@/components/item-grids.tsx";
import "@/styling/Animations.css";
import Sparkles from "react-sparkle";

const tabs = [
  {
    id: "professionally",
    label: "professionally",
    content: (
      <>
        <p className="text-sm text-gray-600 leading-relaxed">
          I currently work as a software engineer at{" "}
          <a href="https://trail-ml.com" className="underline hover:text-gray-900">
            Trail
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
    label: "personally",
    content: (
      <>
        <p className="text-sm text-gray-600 leading-relaxed">
          I grew up in Canada but I'm currently living in Germany. I
          have a cat named Barney, and two guinea pigs named Bonnie &
          Clyde.
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
    label: "all the rest",
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
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className="flex flex-col">
      <div className="relative">
        <Sparkles
          color="gold"
          count={isMobile ? 50 : 200}
          minSize={isMobile ? 2 : 5}
          maxSize={isMobile ? 8 : 10}
          overflowPx={0}
          fadeOutSpeed={10}
        />
        <PageGrid columns={0} style={{ width: "100%", maxWidth: "100vw" }}>
          <div className="flex flex-col md:flex-row w-full items-center py-10 md:py-20 px-4 md:px-0 max-w-full">
            <div className="flex justify-center items-center z-10 my-4 md:my-0 md:ml-20">
              <img
                src="/assets/jo.jpg"
                alt="jo"
                className="h-40 md:h-50 max-w-full rounded-xl"
              />
            </div>
            <div className="flex flex-col w-full md:w-8/10 h-30 text-left align-middle">
              <h1 className="font-bold text-center md:text-left md:ml-10 mb-3 md:mb-5 mt-4 md:mt-10">
                hello!
              </h1>
              <p className="text-center md:text-left px-4 md:px-0 md:ml-10 md:mr-20">
                My name is Joanna :) Welcome to my little corner of the
                internet.
              </p>
            </div>
          </div>
        </PageGrid>
        <div className="border-b border-gray-300" />
        <div className="py-5 md:py-5">
        <div className="relative z-10 flex flex-col md:flex-row p-6 md:px-12 lg:px-20 gap-8 md:gap-12 bg-blue-50/70 mx-5 rounded-lg items-center h-60">
          <div className="flex flex-row md:flex-col gap-2 md:gap-1 shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`text-left text-sm px-3 py-2 rounded transition-colors ${
                  activeTab === tab.id
                    ? "text-gray-900 font-medium bg-blue-100"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 rounded-lg p-6">
            {activeContent}
          </div>
        </div>
      </div>
      </div>

      
    </div>
  );
};

export default Home;
