import React from "react";
import "../../styling/Backgrounds.css";
import { PageGrid } from "../../components/ItemGrids";
import { PlainBox } from "../../components/ItemBoxes";
import { FlowerDecoration } from "../../components/Decorations";

interface BlogPostProps {
  title: string;
  date: string;
  content: string;
  tags?: string[];
}

const BlogPost: React.FC<BlogPostProps> = ({
  title = "hello",
  date = "hello",
  content = "hello",
  tags = ["hello"],
}) => {
  return (
    <div className="blog-bgd">
      <PageGrid columns={0}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <PlainBox
            borderColor="var(--purple)"
            style={{
              width: "100%",
              backgroundColor: "var(--white)",
              padding: "2rem",
            }}
          >
            <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
              {title}
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "2rem",
              }}
            >
              <p style={{ color: "var(--purple)", textAlign: "left" }}>
                {date}
              </p>
              {tags && (
                <div style={{ display: "flex", gap: "1rem" }}>
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        backgroundColor: "var(--pastel-purple)",
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
              {content.split("\n").map((paragraph, index) => (
                <p key={index} style={{ textAlign: "left" }}>
                  {paragraph}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  the rapidly evolving landscape of modern technology and
                  societal change, we find ourselves at a crucial intersection
                  where traditional values meet innovative solutions. The
                  challenges we face today—from climate change and social
                  inequality to the ethical implications of artificial
                  intelligence—demand not just technological advancement, but
                  also thoughtful consideration of their human impact. As we
                  navigate through these complex waters, it becomes increasingly
                  apparent that the solutions to our most pressing problems will
                  require a delicate balance between embracing progress and
                  preserving the fundamental aspects of human connection and
                  dignity. The interconnected nature of our global community
                  means that decisions made in one corner of the world can have
                  far-reaching consequences, creating ripple effects that touch
                  lives across continents and generations. This reality
                  underscores the importance of approaching these challenges
                  with both creativity and compassion, understanding that
                  sustainable solutions must account for both technological
                  feasibility and social responsibility. The path forward
                  requires us to think not just in terms of immediate results,
                  but to consider the long-term implications of our choices on
                  future generations, ensuring that our progress serves to unite
                  rather than divide, to elevate rather than diminish, and to
                  inspire rather than discourage.
                </p>
              ))}
            </div>
          </PlainBox>
          <FlowerDecoration style={{ width: "100%" }} />
          <PlainBox
            borderColor="var(--purple)"
            style={{
              width: "100%",
              backgroundColor: "var(--white)",
              padding: "2rem",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              Related Posts
            </h2>
          </PlainBox>
        </div>
      </PageGrid>
    </div>
  );
};

export default BlogPost;
