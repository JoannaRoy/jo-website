import { useState } from "react";
import { PictureCard } from "@/components/picture-card";
import { TabScroll } from "@/components/tab-scroll";
import { humanizeId, stripExtension } from "@/utils/media";

const allPictureFiles = import.meta.glob("@/gallery_data/**/*.{jpg,jpeg,png,gif,webp}", {
  eager: true,
  import: "default"
}) as Record<string, string>;

interface GalleryStructure {
  [folderName: string]: { id: string; src: string; alt: string }[];
}

interface BINJOGalleryProps {
  year?: number;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
}

export const BINJOGallery = ({ 
  year = 2026,
  gradientFrom = "from-purple-200",
  gradientVia = "via-purple-200",
  gradientTo = "to-pink-300"
}: BINJOGalleryProps) => {
  const yearPrefix = `/gallery_data/${year}/`;
  
  const pictureFiles = Object.entries(allPictureFiles).filter(([path]) => 
    path.includes(yearPrefix)
  );

  const galleryByFolder = pictureFiles.reduce(
    (acc: GalleryStructure, [path, url]) => {
      const parts = path.split('/');
      const folderName = parts[4];
      const filename = stripExtension(path.split('/').pop() ?? "");
      
      if (!acc[folderName]) {
        acc[folderName] = [];
      }
      
      acc[folderName].push({
        id: `${folderName}-${acc[folderName].length + 1}`,
        src: url,
        alt: humanizeId(filename),
      });
      
      return acc;
    },
    {}
  );

  const [hoveredCategory, setHoveredCategory] = useState<string>(Object.keys(galleryByFolder)[0] || "");

  const pictureGalleryTabs = Object.entries(galleryByFolder).map(([folderName, pictures]) => ({
    id: folderName,
    label: humanizeId(folderName),
    content: (position: string) => (
      <>
        {pictures.map((picture) => (
          <div
            key={`${picture.id}-${position}`}
            className="flex-shrink-0 w-[280px] md:w-[350px] h-[280px] md:h-[350px]"
          >
            <PictureCard 
              src={picture.src} 
              alt={picture.alt}
              hoverLabel={picture.alt}
              tag={humanizeId(folderName)}
              isHighlighted={hoveredCategory === folderName}
            />
          </div>
        ))}
      </>
    )
  }));

  if (pictureGalleryTabs.length === 0) {
    return null;
  }

  return (
    <>
      <TabScroll 
        tabs={pictureGalleryTabs} 
        title={<GalleryTitle year={year} />}
        onTabHover={setHoveredCategory}
        gradientFrom={gradientFrom}
        gradientVia={gradientVia}
        gradientTo={gradientTo}
      />
    </>
  );
};

const GalleryTitle = ({ year }: { year: number }) => {
  return (
    <>
      <h1 className="text-xl md:text-2xl font-bold my-2 md:my-4 text-center">BINJO Gallery {year}</h1>
      <p className="text-xs md:text-sm text-center mb-6">Photos documenting various binjo items.</p>
    </>
  );
};