
import { useState } from "react";
import { PictureCard } from "@/components/picture-card";
import { TabScroll } from "@/components/tab-scroll";
  
const pictureFiles = import.meta.glob("@/gallery_data/*/*.{jpg,jpeg,png,gif,webp}", {
  eager: true,
  import: "default"
}) as Record<string, string>;

interface GalleryStructure {
  [folderName: string]: { id: string; src: string; alt: string }[];
}

export const BINJOGallery = () => {
  const galleryByFolder = Object.entries(pictureFiles).reduce(
    (acc: GalleryStructure, [path, url]) => {
      const folderName = path.split('/')[2];
      const filename = path.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';
      
      if (!acc[folderName]) {
        acc[folderName] = [];
      }
      
      acc[folderName].push({
        id: `${folderName}-${acc[folderName].length + 1}`,
        src: url,
        alt: filename.replace(/_/g, ' ').replace(/-/g, ' ')
      });
      
      return acc;
    },
    {}
  );

  const [hoveredCategory, setHoveredCategory] = useState<string>(Object.keys(galleryByFolder)[0] || "");

  const pictureGalleryTabs = Object.entries(galleryByFolder).map(([folderName, pictures]) => ({
    id: folderName,
    label: folderName.replace(/_/g, ' ').replace(/-/g, ' '),
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
              tag={folderName.replace(/_/g, ' ').replace(/-/g, ' ')}
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
        title={<GalleryTitle />}
        onTabHover={setHoveredCategory}
      />
    </>
  );
};

const GalleryTitle = () => {
  return (
    <>
      <h1 className="text-xl md:text-2xl font-bold my-2 md:my-4 text-center">BINJO Gallery</h1>
      <p className="text-xs md:text-sm text-center mb-6">Photos documenting various binjo items.</p>
    </>
  );
};