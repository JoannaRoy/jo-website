export type Photo = {
  id: string;
  src: string;
  alt: string;
};

export function stripExtension(filename: string): string {
  return filename.replace(/\.[^/.]+$/, "");
}

export function humanizeId(id: string): string {
  return id.replace(/_/g, " ").replace(/-/g, " ");
}

export function photosFromGlob(globRecord: Record<string, string>): ReadonlyArray<Photo> {
  return Object.entries(globRecord)
    .map(([path, url]) => {
      const filename = path.split("/").pop() ?? "";
      const id = stripExtension(filename);
      return { id, src: url, alt: humanizeId(id) };
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}


