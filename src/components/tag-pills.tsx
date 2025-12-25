interface TagPillsProps {
  tags: string[];
  colours?: string[];
}

export const TagPills = ({ tags, colours = ['from-purple-200 to-pink-200', 'from-blue-200 to-green-200', 'from-yellow-200 to-orange-200', 'from-red-200 to-pink-200'] }: TagPillsProps) => {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={tag}
          className={`bg-linear-to-r ${colours[index % colours.length]} px-3 py-1 rounded-full text-xs md:text-sm font-medium text-gray-800`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};


