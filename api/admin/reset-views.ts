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
    const redis = await getRedis();
    const keys = await redis.keys('views:*');
    
    if (keys.length > 0) {
      await redis.del(keys);
    }
    
    return res.json({ 
      message: 'All views reset',
      deletedCount: keys.length 
    });
  } catch (error) {
    return res.status(500).json({ error: String(error) });
  }
}