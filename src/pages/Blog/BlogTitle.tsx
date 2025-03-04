interface BlogTitleProps {
  onMouseEnter?: () => void;
  className?: string;
}

const BlogTitle: React.FC<BlogTitleProps> = ({ onMouseEnter, className }) => {
  return (
    <div
      className={`flex flex-row justify-center items-center w-full ${className}`}
    >
      <div
        className="flex flex-col justify-center items-center p-4 md:p-8"
        onMouseEnter={onMouseEnter}
      >
        <h1 className="text-4xl md:text-7xl mb-2 md:mb-4 font-bold text-xxl">
          chickpea purée
        </h1>
        <h2 className="text-base md:text-xl">a blog</h2>
      </div>
    </div>
  );
};

export default BlogTitle;
