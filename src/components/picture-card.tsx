export const PictureCard = ({ 
  src, 
  alt, 
  tag, 
  isHighlighted = false 
}: { 
  src: string; 
  alt: string; 
  tag?: string;
  isHighlighted?: boolean;
}) => {
  return (
    <div className="group relative w-full h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect fill='%23e5e7eb' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='0.3em' fill='%239ca3af' font-family='Arial, sans-serif' font-size='16'%3EImage not found%3C/text%3E%3C/svg%3E";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {tag && (
        <div className="absolute top-4 left-4">
          <span className={`text-[0.65rem] md:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider transition-all duration-200 ${
            isHighlighted 
              ? "bg-white text-gray-900 shadow-lg" 
              : "text-white bg-black/50 backdrop-blur-sm"
          }`}>
            {tag}
          </span>
        </div>
      )}
    </div>
  );
};