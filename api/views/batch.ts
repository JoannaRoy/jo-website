import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getRedis } from '../../lib/redis.js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { slugs } = req.body;
    
    if (!Array.isArray(slugs)) {
      return res.status(400).json({ error: 'slugs must be an array' });
    }

    const redis = await getRedis();
    const keys = slugs.map(slug => `views:${slug.replace(/\//g, '-')}`);
    
    const values = await Promise.all(
      keys.map(async (key) => {
        const count = await redis.get(key);
        return parseInt(count || '0');
      })
    );

    const viewsMap = slugs.reduce((acc, slug, index) => {
      acc[slug] = values[index];
      return acc;
    }, {} as Record<string, number>);

    return res.status(200).json({ views: viewsMap });
  } catch (error) {
    return res.status(500).json({ error: String(error) });
  }
}