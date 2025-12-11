import GiraffePattern from "@/components/giraffe-pattern";

interface BlogTitleProps {
  onMouseEnter?: () => void;
  className?: string;
}

const BlogTitle: React.FC<BlogTitleProps> = ({ onMouseEnter, className }) => {
  return (
    <div
      className={`flex flex-row justify-center items-center w-full m-8 mb-15 ${className}`}
    >
      <div className="relative inline-block">
        <div className="absolute -top-6 -left-6 w-full h-full rounded-lg overflow-hidden">
          <GiraffePattern className="w-full h-full" />
        </div>
        <div
          className="relative z-10 flex flex-col justify-center items-center p-4 md:p-8 backdrop-blur-sm rounded-lg"
          style={{
            background: "linear-gradient(135deg, var(--pastel-blue), var(--pastel-red))",
          }}
          onMouseEnter={onMouseEnter}
        >
          <h1 className="text-4xl md:text-7xl mb-2 md:mb-4 font-bold text-xxl">
            chickpea purée
          </h1>
          <h2 className="text-base md:text-xl">a blog</h2>
        </div>
      </div>
    </div>
  );
};

export default BlogTitle;
