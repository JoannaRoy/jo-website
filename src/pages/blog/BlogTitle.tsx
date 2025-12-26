

interface BlogTitleProps {
  className?: string;
}

const BlogTitle: React.FC<BlogTitleProps> = ({ className }) => {
  return (
    <div
      className={`flex justify-center items-start w-full m-8 mb-15 ${className}`}
    >
      <div className="relative inline-block text-center">
        <h1
          className="text-4xl md:text-7xl mb-2 md:mb-4 font-bold text-xxl"
          style={{
            fontFamily:
              '"Marker Felt","Chalkboard SE","Comic Sans MS","Bradley Hand",cursive',
          }}
        >
          chickpea purée:
        </h1>
        <h2 className="text-base md:text-xl">a blog</h2>
      </div>
    </div>
  );
};

export default BlogTitle;
