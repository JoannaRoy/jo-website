import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../styling/Backgrounds.css";
import { PageGrid } from "../components/ItemGrids";

const imageList = ["/src/assets/blog-bgd1.png", "/src/assets/blog-bgd2.png"];

const Blog: React.FC = () => {
  const divStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  };
  const infoList = [
    {
      title: "Title 1",
      content:
        "n a world where the relentless pace of technological innovation continues to shape every facet of human existence, influencing how we communicate, work, learn, and even dream, the complex interplay between the promises of progress—such as artificial intelligence capable of diagnosing diseases, solving climate change challenges, or creating art indistinguishable from that crafted by human hands—and the perils that arise, including privacy breaches, misinformation, job displacement, and ethical quandaries, prompts an urgent call for thoughtful deliberation among policymakers, technologists, ethicists, and citizens alike, who must collaboratively navigate an ever-shifting landscape in which the line between what is possible and what is permissible blurs, leaving humanity with the responsibility to determine how best to harness these tools for good while safeguarding against their misuse, which requires not only technical acumen but also deep philosophical inquiry, as society grapples with questions such as what it means to be human in an age where machines simulate human cognition, whether the pursuit of efficiency should outweigh the preservation of individual agency, and how we might bridge the growing divide between those who reap the benefits of technological advances and those left behind in an increasingly digital world—a divide exacerbated by systemic inequities in access to resources, education, and opportunities—while simultaneously addressing existential risks posed by autonomous systems, climate instability, and the unintended consequences of interconnected global systems that, despite their immense potential to foster collaboration and innovation, also amplify vulnerabilities to cyberattacks, supply chain disruptions, and sociopolitical unrest, demanding an unprecedented level of global coordination, adaptability, and foresight to ensure that, as we march forward into an uncertain future, we do so not only with caution and humility but also with a profound commitment to equity, sustainability, and the enduring values that define our shared humanity. n a world where the relentless pace of technological innovation continues to shape every facet of human existence, influencing how we communicate, work, learn, and even dream, the complex interplay between the promises of progress—such as artificial intelligence capable of diagnosing diseases, solving climate change challenges, or creating art indistinguishable from that crafted by human hands—and the perils that arise, including privacy breaches, misinformation, job displacement, and ethical quandaries, prompts an urgent call for thoughtful deliberation among policymakers, technologists, ethicists, and citizens alike, who must collaboratively navigate an ever-shifting landscape in which the line between what is possible and what is permissible blurs, leaving humanity with the responsibility to determine how best to harness these tools for good while safeguarding against their misuse, which requires not only technical acumen but also deep philosophical inquiry, as society grapples with questions such as what it means to be human in an age where machines simulate human cognition, whether the pursuit of efficiency should outweigh the preservation of individual agency, and how we might bridge the growing divide between those who reap the benefits of technological advances and those left behind in an increasingly digital world—a divide exacerbated by systemic inequities in access to resources, education, and opportunities—while simultaneously addressing existential risks posed by autonomous systems, climate instability, and the unintended consequences of interconnected global systems that, despite their immense potential to foster collaboration and innovation, also amplify vulnerabilities to cyberattacks, supply chain disruptions, and sociopolitical unrest, demanding an unprecedented level of global coordination, adaptability, and foresight to ensure that, as we march forward into an uncertain future, we do so not only with caution and humility but also with a profound commitment to equity, sustainability, and the enduring values that define our shared humanity.",
    },
    { title: "Title 2", content: "Content 2" },
    { title: "Title 3", content: "Content 3" },
  ];

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
        {infoList.map((info, index) => (
          <div key={index}>
            <Link to={`/blog/${index}`}>
              <BlogPostPreview
                title={info.title}
                content={info.content}
                index={index}
              />
            </Link>
          </div>
        ))}
      </PageGrid>

      <Routes>
        {infoList.map((info, index) => (
          <Route
            key={index}
            path={`/blog/${index}`}
            element={
              <BlogPost
                title={info.title}
                content={info.content}
                index={index}
              />
            }
          />
        ))}
      </Routes>
    </div>
  );
};

const BlogPostPreview = ({
  title,
  content,
  index,
}: {
  title: string;
  content: string;
  index: number;
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${imageList[index % 2]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "90vw",
        paddingLeft: "50px",
        paddingRight: "50px",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <h1>{title}</h1>
      <p>
        {content.length > 100 ? content.substring(0, 100) + " ..." : content}
      </p>
    </div>
  );
};

const BlogPost = ({
  title,
  content,
  index,
}: {
  title: string;
  content: string;
  index: number;
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "var(--white)",
        zIndex: 1000,
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
        width: "90vw",
        height: "90vh",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      <button
        style={{
          position: "absolute",
          top: "5px",
          right: "10px",
          cursor: "pointer",
          border: "none",
          backgroundColor: "transparent",
          color: "black",
          fontSize: "24px",
        }}
        onClick={() => (window.location.href = "/blog")}
      >
        X
      </button>
      <div
        style={{
          backgroundImage: `url(${imageList[index % 2]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          paddingLeft: "50px",
          paddingRight: "50px",
          paddingTop: "20px",
          paddingBottom: "20px",
          width: "90%",
        }}
      >
        <h1>{title}</h1>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default Blog;
