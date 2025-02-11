import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../../styling/Backgrounds.css";
import { PageGrid } from "../../components/ItemGrids";
import { PlainBox } from "../../components/ItemBoxes";
// import BlogPost from "./BlogPost";

const imageList = ["/src/assets/blog-bgd1.png", "/src/assets/blog-bgd2.png"];
const blogSectionHeaderList = [
  {
    title: "Heading 1",
  },
  {
    title: "Heading 2",
  },
  {
    title: "Heading 3",
  },
];
const blogSectionList = [
  {
    title: "this is the title of the first blog post",
    content:
      "n a world where the relentless pace of technological innovation continues to shape every facet of human existence, influencing how we communicate, work, learn, and even dream, the complex interplay between the promises of progress—such as artificial intelligence capable of diagnosing diseases, solving climate change challenges, or creating art indistinguishable from that crafted by human hands—and the perils that arise, including privacy breaches, misinformation, job displacement, and ethical quandaries, prompts an urgent call for thoughtful deliberation among policymakers, technologists, ethicists, and citizens alike, who must collaboratively navigate an ever-shifting landscape in which the line between what is possible and what is permissible blurs, leaving humanity with the responsibility to determine how best to harness these tools for good while safeguarding against their misuse, which requires not only technical acumen but also deep philosophical inquiry, as society grapples with questions such as what it means to be human in an age where machines simulate human cognition, whether the pursuit of efficiency should outweigh the preservation of individual agency, and how we might bridge the growing divide between those who reap the benefits of technological advances and those left behind in an increasingly digital world—a divide exacerbated by systemic inequities in access to resources, education, and opportunities—while simultaneously addressing existential risks posed by autonomous systems, climate instability, and the unintended consequences of interconnected global systems that, despite their immense potential to foster collaboration and innovation, also amplify vulnerabilities to cyberattacks, supply chain disruptions, and sociopolitical unrest, demanding an unprecedented level of global coordination, adaptability, and foresight to ensure that, as we march forward into an uncertain future, we do so not only with caution and humility but also with a profound commitment to equity, sustainability, and the enduring values that define our shared humanity. n a world where the relentless pace of technological innovation continues to shape every facet of human existence, influencing how we communicate, work, learn, and even dream, the complex interplay between the promises of progress—such as artificial intelligence capable of diagnosing diseases, solving climate change challenges, or creating art indistinguishable from that crafted by human hands—and the perils that arise, including privacy breaches, misinformation, job displacement, and ethical quandaries, prompts an urgent call for thoughtful deliberation among policymakers, technologists, ethicists, and citizens alike, who must collaboratively navigate an ever-shifting landscape in which the line between what is possible and what is permissible blurs, leaving humanity with the responsibility to determine how best to harness these tools for good while safeguarding against their misuse, which requires not only technical acumen but also deep philosophical inquiry, as society grapples with questions such as what it means to be human in an age where machines simulate human cognition, whether the pursuit of efficiency should outweigh the preservation of individual agency, and how we might bridge the growing divide between those who reap the benefits of technological advances and those left behind in an increasingly digital world—a divide exacerbated by systemic inequities in access to resources, education, and opportunities—while simultaneously addressing existential risks posed by autonomous systems, climate instability, and the unintended consequences of interconnected global systems that, despite their immense potential to foster collaboration and innovation, also amplify vulnerabilities to cyberattacks, supply chain disruptions, and sociopolitical unrest, demanding an unprecedented level of global coordination, adaptability, and foresight to ensure that, as we march forward into an uncertain future, we do so not only with caution and humility but also with a profound commitment to equity, sustainability, and the enduring values that define our shared humanity.",
  },
  {
    title: "this is the title of the second blog post",
    content: "this is the content of the second blog post",
  },
  {
    title: "this is the title of the third blog post",
    content: "this is the content of the third blog post",
  },
];

const Blog: React.FC = () => {
  const divStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  };

  return (
    <div>
      <PageGrid columns={1}>
        <div style={{ flexDirection: "row", width: "100%", ...divStyle }}>
          <div
            style={{
              width: "90vw",
              flexDirection: "column",
              right: "0",
              padding: "2rem",
              ...divStyle,
            }}
          >
            <h1 style={{ fontSize: "3rem" }}>hummus purée</h1>
            <h2 style={{ fontSize: "1rem" }}>a blog</h2>
          </div>
        </div>
        {blogSectionHeaderList.map((info, index) => (
          <div
            style={{
              width: "100vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <BlogPostSectionHeader
              title={info.title}
              index={index}
              boxStyle={{ width: "90vw" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                width: "90vw",
              }}
            >
              {blogSectionList.map((info, index) => (
                <Link to={`/blog/${index}`}>
                  <BlogPostPreview title={info.title} content={info.content} />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </PageGrid>
    </div>
  );
};

const BlogPostSectionHeader = ({
  title,
  index,
  boxStyle,
}: {
  title: string;
  index: number;
  boxStyle?: React.CSSProperties;
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${imageList[index % imageList.length]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        paddingTop: "20px",
        paddingBottom: "20px",
        marginBottom: "1rem",
        ...boxStyle,
      }}
    >
      <h1>{title}</h1>
    </div>
  );
};

const BlogPostPreview = ({
  title,
  content,
  boxStyle,
}: {
  title: string;
  content: string;
  boxStyle?: React.CSSProperties;
}) => {
  return (
    <PlainBox
      borderColor="var(--turquoise)"
      // borderColor="black"
      style={{
        backgroundColor: "var(--white)",
        justifyContent: "center",
        alignItems: "center",
        marginTop: ".25rem",
        ...boxStyle,
      }}
    >
      <div
        style={{
          display: "flex",
          // padding: "1rem",
        }}
      >
        <h2>{title}</h2>
        {/* <p style={{ margin: 2, textAlign: "left" }}>
          {content.length > 100 ? content.substring(0, 100) + "..." : content}
        </p> */}
      </div>
    </PlainBox>
  );
};

export default Blog;
