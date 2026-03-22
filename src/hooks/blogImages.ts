const rawModules = import.meta.glob("../blog_data/preview_images/**/*.{png,jpg,jpeg,gif,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const PREFIX = "../blog_data/preview_images/";

const urlByKey = new Map<string, string>();
for (const [path, url] of Object.entries(rawModules)) {
  if (!path.startsWith(PREFIX)) continue;
  urlByKey.set(path.slice(PREFIX.length), url);
}

export function resolveBlogImageSrc(src: string, postSlug: string | undefined): string {
  const trimmed = src.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  const candidates: string[] = [trimmed];
  if (postSlug && !trimmed.includes("/")) {
    const folder = postSlug.split("/").pop();
    if (folder) candidates.push(`${folder}/${trimmed}`);
  }
  for (const key of candidates) {
    const resolved = urlByKey.get(key);
    if (resolved) return resolved;
  }
  return trimmed;
}
