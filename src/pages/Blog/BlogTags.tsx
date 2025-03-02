const getTagColors = (() => {
  const colors = [
    "bg-green-300",
    "bg-blue-300",
    "bg-purple-300",
    "bg-pink-300",
    "bg-gray-300",
    "bg-red-300",
    "bg-orange-300",
    "bg-yellow-300",
    "bg-indigo-300",
    "bg-teal-300",
  ];

  const tagColorMap = new Map<string, string>();
  let colorIndex = 0;

  return (tagName: string): string => {
    if (tagColorMap.has(tagName)) {
      return tagColorMap.get(tagName)!;
    }

    const color = colors[colorIndex % colors.length];
    tagColorMap.set(tagName, color);
    colorIndex++;

    return color;
  };
})();

const BlogTag = ({ name }: { name: string }) => {
  return (
    <div
      className={`${getTagColors(
        name
      )} px-3 py-2 rounded-lg text-xs my-2 text-white`}
    >
      {name}
    </div>
  );
};

export { BlogTag };
