import React from "react";
import "../../styling/Backgrounds.css";
import { PageGrid } from "../../components/ItemGrids";
import { PlainBox } from "../../components/ItemBoxes";
import { useParams } from "react-router-dom";
import { BlogPostSectionHeader } from "./BlogHome";

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
    date: "2024-01-01",
    tags: ["tag1", "tag2", "tag3"],
  },

  {
    title: "this is the title of the second blog post",
    content: "this is the content of the second blog post",
    date: "2024-01-02",
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    title: "this is the title of the third blog post",
    content: "this is the content of the third blog post",
    date: "2024-01-03",
    tags: ["tag1", "tag2", "tag3"],
  },
];

interface BlogPostProps {
  title?: string;
  date?: string;
  content?: string;
  tags?: string[];
}

const BlogPost: React.FC<BlogPostProps> = () => {
  const { index } = useParams();
  const numericIndex = parseInt(index || "0", 10);
  const blogSection = blogSectionList[numericIndex];
  return (
    <PageGrid columns={1}>
      <div
        style={{
          padding: "2rem",
          marginRight: "2rem",
          width: "90vw",
          height: "100%",
        }}
      >
        <BlogPostSectionHeader
          title={blogSectionHeaderList[numericIndex].title}
          index={numericIndex}
        />
        <PlainBox
          borderColor="var(--turquoise)"
          style={{
            backgroundColor: "var(--white)",
            padding: "2rem",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            {blogSection.title}
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "2rem",
            }}
          >
            <p style={{ color: "var(--turquoise)", textAlign: "left" }}>
              {blogSection.date}
            </p>
            {blogSection.tags && (
              <div style={{ display: "flex", gap: "1rem" }}>
                {blogSection.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      backgroundColor: "var(--turquoise)",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "15px",
                      fontSize: "0.9rem",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div
            style={{
              textAlign: "left",
              lineHeight: "1.8",
            }}
          >
            {blogSection.content.split("\n").map((paragraph, index) => (
              <p key={index} style={{ textAlign: "left" }}>
                {paragraph}
              </p>
            ))}
          </div>
        </PlainBox>
      </div>
    </PageGrid>
  );
};

export default BlogPost;
