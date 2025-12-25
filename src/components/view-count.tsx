interface ViewCountProps {
  views: number;
  loading: boolean;
  className?: string;
}

export const ViewCount = ({ views, loading, className }: ViewCountProps) => {
  return (
    <div className={`text-xs md:text-sm text-gray-500 font-medium ${className ?? ""}`}>
      {loading ? "Loading views..." : `${views} views`}
    </div>
  );
};


