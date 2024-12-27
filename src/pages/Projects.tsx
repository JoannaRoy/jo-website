import React from "react";
import "../styling/Backgrounds.css";
import { ItemGroup, PageGrid } from "../components/ItemGrids";
import { Link } from "react-router-dom";
import { Content } from "../components/SubPage";
import { SubPagePreview } from "../components/SubPage";
import { SubPage } from "../components/SubPage";

const imageList = ["/src/assets/rainbow-circles-gradient.png"];
const projectList1 = [
  {
    title: "Title 1",
    content:
      "In a world where the relentless pace of technological innovation continues to shape every facet of human existence, influencing how we communicate, work, learn, and even dream, the complex interplay between the promises of progress—such as artificial intelligence capable of diagnosing diseases, solving climate change challenges, or creating art indistinguishable from that crafted by human hands—and the perils that arise, including privacy breaches, misinformation, job displacement, and ethical quandaries, prompts an urgent call for thoughtful deliberation among policymakers, technologists, ethicists, and citizens alike, who must collaboratively navigate an ever-shifting landscape in which the line between what is possible and what is permissible blurs, leaving humanity with the responsibility to determine how best to harness these tools for good while safeguarding against their misuse, which requires not only technical acumen but also deep philosophical inquiry, as society grapples with questions such as what it means to be human in an age where machines simulate human cognition, whether the pursuit of efficiency should outweigh the preservation of individual agency, and how we might bridge the growing divide between those who reap the benefits of technological advances and those left behind in an increasingly digital world—a divide exacerbated by systemic inequities in access to resources, education, and opportunities—while simultaneously addressing existential risks posed by autonomous systems, climate instability, and the unintended consequences of interconnected global systems that, despite their immense potential to foster collaboration and innovation, also amplify vulnerabilities to cyberattacks, supply chain disruptions, and sociopolitical unrest, demanding an unprecedented level of global coordination, adaptability, and foresight to ensure that, as we march forward into an uncertain future, we do so not only with caution and humility but also with a profound commitment to equity, sustainability, and the enduring values that define our shared humanity. n a world where the relentless pace of technological innovation continues to shape every facet of human existence, influencing how we communicate, work, learn, and even dream, the complex interplay between the promises of progress—such as artificial intelligence capable of diagnosing diseases, solving climate change challenges, or creating art indistinguishable from that crafted by human hands—and the perils that arise, including privacy breaches, misinformation, job displacement, and ethical quandaries, prompts an urgent call for thoughtful deliberation among policymakers, technologists, ethicists, and citizens alike, who must collaboratively navigate an ever-shifting landscape in which the line between what is possible and what is permissible blurs, leaving humanity with the responsibility to determine how best to harness these tools for good while safeguarding against their misuse, which requires not only technical acumen but also deep philosophical inquiry, as society grapples with questions such as what it means to be human in an age where machines simulate human cognition, whether the pursuit of efficiency should outweigh the preservation of individual agency, and how we might bridge the growing divide between those who reap the benefits of technological advances and those left behind in an increasingly digital world—a divide exacerbated by systemic inequities in access to resources, education, and opportunities—while simultaneously addressing existential risks posed by autonomous systems, climate instability, and the unintended consequences of interconnected global systems that, despite their immense potential to foster collaboration and innovation, also amplify vulnerabilities to cyberattacks, supply chain disruptions, and sociopolitical unrest, demanding an unprecedented level of global coordination, adaptability, and foresight to ensure that, as we march forward into an uncertain future, we do so not only with caution and humility but also with a profound commitment to equity, sustainability, and the enduring values that define our shared humanity.",
  },
  { title: "Title 2", content: "Content 2" },
  { title: "Title 3", content: "Content 3" },
  { title: "Title 4", content: "Content 4" },
];
const projectList2 = [
  {
    title: "Title 1",
    content:
      "In a world where the relentless pace of technological innovation continues to shape every facet of human existence, influencing how we communicate, work, learn, and even dream, the complex interplay between the promises of progress—such as artificial intelligence capable of diagnosing diseases, solving climate change challenges, or creating art indistinguishable from that crafted by human hands—and the perils that arise, including privacy breaches, misinformation, job displacement, and ethical quandaries, prompts an urgent call for thoughtful deliberation among policymakers, technologists, ethicists, and citizens alike, who must collaboratively navigate an ever-shifting landscape in which the line between what is possible and what is permissible blurs, leaving humanity with the responsibility to determine how best to harness these tools for good while safeguarding against their misuse, which requires not only technical acumen but also deep philosophical inquiry, as society grapples with questions such as what it means to be human in an age where machines simulate human cognition, whether the pursuit of efficiency should outweigh the preservation of individual agency, and how we might bridge the growing divide between those who reap the benefits of technological advances and those left behind in an increasingly digital world—a divide exacerbated by systemic inequities in access to resources, education, and opportunities—while simultaneously addressing existential risks posed by autonomous systems, climate instability, and the unintended consequences of interconnected global systems that, despite their immense potential to foster collaboration and innovation, also amplify vulnerabilities to cyberattacks, supply chain disruptions, and sociopolitical unrest, demanding an unprecedented level of global coordination, adaptability, and foresight to ensure that, as we march forward into an uncertain future, we do so not only with caution and humility but also with a profound commitment to equity, sustainability, and the enduring values that define our shared humanity. n a world where the relentless pace of technological innovation continues to shape every facet of human existence, influencing how we communicate, work, learn, and even dream, the complex interplay between the promises of progress—such as artificial intelligence capable of diagnosing diseases, solving climate change challenges, or creating art indistinguishable from that crafted by human hands—and the perils that arise, including privacy breaches, misinformation, job displacement, and ethical quandaries, prompts an urgent call for thoughtful deliberation among policymakers, technologists, ethicists, and citizens alike, who must collaboratively navigate an ever-shifting landscape in which the line between what is possible and what is permissible blurs, leaving humanity with the responsibility to determine how best to harness these tools for good while safeguarding against their misuse, which requires not only technical acumen but also deep philosophical inquiry, as society grapples with questions such as what it means to be human in an age where machines simulate human cognition, whether the pursuit of efficiency should outweigh the preservation of individual agency, and how we might bridge the growing divide between those who reap the benefits of technological advances and those left behind in an increasingly digital world—a divide exacerbated by systemic inequities in access to resources, education, and opportunities—while simultaneously addressing existential risks posed by autonomous systems, climate instability, and the unintended consequences of interconnected global systems that, despite their immense potential to foster collaboration and innovation, also amplify vulnerabilities to cyberattacks, supply chain disruptions, and sociopolitical unrest, demanding an unprecedented level of global coordination, adaptability, and foresight to ensure that, as we march forward into an uncertain future, we do so not only with caution and humility but also with a profound commitment to equity, sustainability, and the enduring values that define our shared humanity.",
  },
  { title: "Title 2", content: "Content 2" },
  { title: "Title 3", content: "Content 3" },
  { title: "Title 4", content: "Content 4" },
];

const Projects: React.FC = () => {
  return (
    <PageGrid
      columns={1}
      style={{
        alignItems: "right",
        justifyContent: "right",
        alignContent: "right",
      }}
    >
      <ItemGroup title="Projects" columns={4}>
        {projectList1.map((info, index) => (
          <Link to={`/projects/${index}`}>
            <ProjectPreview
              content={info}
              index={index}
              boxStyle={{ width: "10vw", height: "20vw" }}
            />
          </Link>
        ))}
      </ItemGroup>
      <ItemGroup title="Projects" columns={4}>
        {projectList2.map((info, index) => (
          <Link to={`/projects/${index}`}>
            <ProjectPreview
              content={info}
              index={index}
              boxStyle={{ width: "10vw", height: "20vw" }}
            />
          </Link>
        ))}
      </ItemGroup>
    </PageGrid>
  );
};

const ProjectPreview = ({
  content,
  index,
  boxStyle,
}: {
  content: Content;
  index: number;
  boxStyle?: React.CSSProperties;
}) => {
  return (
    <SubPagePreview
      content={content}
      image={imageList[index % imageList.length]}
      boxStyle={boxStyle}
    />
  );
};

const ProjectSubPage = () => {
  return <SubPage contentList={projectList1} imageList={imageList} />;
};

export { Projects, ProjectSubPage };
