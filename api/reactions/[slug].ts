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
    const slugFormatted = slug.replace(/\//g, '-');
    const key = `reactions:${slugFormatted}`;

    if (req.method === 'POST') {
      const { emoji, action } = req.body;
      
      if (!emoji || [...emoji].length > 10) {
        return res.status(400).json({ error: 'Invalid emoji' });
      }
      
      if (action === 'remove') {
        const current = await redis.hGet(key, emoji);
        const count = parseInt(current?.toString() || '0');
        
        if (count > 0) {
          await redis.hIncrBy(key, emoji, -1);
          
          if (count === 1) {
            await redis.hDel(key, emoji);
          }
        }
      } else {
        const currentReactions = await redis.hGetAll(key);
        if (Object.keys(currentReactions).length >= 50 && !currentReactions[emoji]) {
          return res.status(400).json({ error: 'Too many unique reactions' });
        }
        
        await redis.hIncrBy(key, emoji, 1);
      }
      
      const reactions = await redis.hGetAll(key);
      return res.status(200).json({ reactions });
    }

    if (req.method === 'GET') {
      const reactions = await redis.hGetAll(key);
      return res.status(200).json({ reactions: reactions || {} });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in reactions API:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}