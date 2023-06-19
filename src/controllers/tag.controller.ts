import { NextFunction, Request, Response, Router } from 'express';
import auth from '../utils/auth';
import getTags from '../services/tag.service';

const router = Router();

// Get top 10 popular tags
router.get('/tags', auth.optional, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await getTags(req.user?.username);
    res.json({ tags });
  } catch (error) {
    next(error);
  }
});
export default router;