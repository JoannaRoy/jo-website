import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getRedis } from '../../lib/redis.js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const { slug } = req.query;
    
    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ error: 'Invalid slug' });
    }

    const redis = await getRedis();
    const key = `views:${slug}`;

    if (req.method === 'POST') {
      const views = await redis.incr(key);
      return res.status(200).json({ views });
    }

    if (req.method === 'GET') {
      const views = await redis.get(key);
      return res.status(200).json({ views: parseInt(views?.toString() || '0') });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in views API:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}