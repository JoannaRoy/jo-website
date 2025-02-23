import React from "react";
import { Link } from "react-router-dom";
import "../../styling/Backgrounds.css";
import { PageGrid } from "../../components/ItemGrids";
import { PlainBox } from "../../components/ItemBoxes";
import { BlogContent } from "./BlogContent";
const imageList = ["/src/assets/blog-bgd1.png", "/src/assets/blog-bgd2.png"];

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
            <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
              hummus purée
            </h1>
            <h2 style={{ fontSize: "1rem" }}>a blog</h2>
          </div>
        </div>
        {Object.entries(BlogContent).map(([header, posts]) => (
          <div
            key={header}
            style={{
              width: "100vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <BlogPostSectionHeader
              title={posts[0].data.header}
              index={Object.keys(BlogContent).indexOf(header)}
              boxStyle={{
                width: "90vw",
                padding: "1rem",
                margin: ".5rem",
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                width: "90vw",
              }}
            >
              {posts.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`}>
                  <BlogPostPreview title={post.data.title} />
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
  title: string | undefined;
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
        paddingTop: "5px",
        paddingBottom: "5px",
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
  boxStyle,
}: {
  title: string;
  boxStyle?: React.CSSProperties;
}) => {
  return (
    <PlainBox
      borderColor="var(--turquoise)"
      style={{
        backgroundColor: "var(--white)",
        justifyContent: "center",
        alignItems: "center",
        marginTop: ".25rem",
        ...boxStyle,
      }}
    >
      <div style={{}}>
        <h2>{title}</h2>
      </div>
    </PlainBox>
  );
};

export { Blog, BlogPostSectionHeader };
