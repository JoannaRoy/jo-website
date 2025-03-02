interface FlipCardProps {
  isFlipped: boolean;
  onFlip: () => void;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  backgroundClass: string;
  backgroundPosition?: string;
  style?: React.CSSProperties;
}

const FlipCard: React.FC<FlipCardProps> = ({
  isFlipped,
  onFlip,
  frontContent,
  backContent,
  backgroundClass,
  backgroundPosition = "center",
  style,
}) => {
  return (
    <div
      className={`relative w-[25vw] h-[25vw] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl hover:scale-105 ${
        isFlipped ? "rotate-y-180" : "rotate-y-0"
      } ${backgroundClass}`}
      onClick={onFlip}
      style={{
        perspective: "1000px",
        ...style,
        backgroundPosition,
      }}
    >
      <div className="absolute inset-0 w-full h-full preserve-3d">
        {/* Front side */}
        <div
          className={`absolute w-full h-full flex justify-center items-center backface-hidden transition-transform duration-700 p-10 ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          style={{
            background: "inherit",
            backgroundPosition: "inherit",
            transformStyle: "preserve-3d",
          }}
        >
          <h2 className="text-black font-bold text-base no-underline my-4">
            {frontContent}
          </h2>
        </div>
        {/* Back side */}
        <div
          className={`absolute w-full h-full flex justify-center items-center transition-all p-10 ${
            isFlipped ? "rotate-y-180 opacity-100 duration-800" : "opacity-0"
          }`}
        >
          {backContent}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
