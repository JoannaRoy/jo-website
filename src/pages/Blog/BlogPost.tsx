import React from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import "../../styling/Backgrounds.css";
import { PageGrid } from "../../components/ItemGrids";
import { PlainBox } from "../../components/ItemBoxes";
import { BlogPostSectionHeader } from "./BlogHome";
import { BlogContent } from "./BlogContent";

interface BlogPostProps {
  title?: string;
  date?: string;
  content?: string;
  tags?: string[];
}

const BlogPost: React.FC<BlogPostProps> = () => {
  const { header, title } = useParams();
  const slug = `${header}/${title}`;
  console.log(BlogContent);
  const post = BlogContent[header as string].find((post) => post.slug === slug);
  console.log(post);
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
        <BlogPostSectionHeader title={post?.data.header} index={0} />
        <PlainBox
          borderColor="var(--turquoise)"
          style={{
            backgroundColor: "var(--white)",
            padding: "2rem",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            {post?.data.title}
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
              {post?.data.date}
            </p>
            {post?.data.tags && (
              <div style={{ display: "flex", gap: "1rem" }}>
                {post?.data.tags.map((tag: string) => (
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
            <Markdown>{post?.content}</Markdown>
          </div>
        </PlainBox>
      </div>
    </PageGrid>
  );
};

export default BlogPost;
