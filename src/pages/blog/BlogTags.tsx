const getTagColours = (() => {
  const colours = [
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

  const tagColourMap = new Map<string, string>();
  let colourIndex = 0;

  return (tagName: string): string => {
    if (tagColourMap.has(tagName)) {
      return tagColourMap.get(tagName)!;
    }

    const colour = colours[colourIndex % colours.length];
    tagColourMap.set(tagName, colour);
    colourIndex++;

    return colour;
  };
})();

const BlogTag = ({ name }: { name: string }) => {
  return (
    <div
      className={`${getTagColours(
        name
      )} px-3 py-2 rounded-lg text-xs my-2 text-white`}
    >
      {name}
    </div>
  );
};

export { BlogTag };
