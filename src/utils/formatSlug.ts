export function formatSlug(slug: string): string {
  return slug.replace(/\//g, '-');
}

