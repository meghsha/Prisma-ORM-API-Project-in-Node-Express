import { NextFunction, Request, Response, Router } from 'express';
import auth from '../utils/auth';
import { followUser, getProfile, unfollowUser } from '../services/profile.service';

const router = Router();

// Get profile
router.get(
  '/profiles/:username',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profile = await getProfile(req.params?.username, req.user?.username as string);
      res.json({ profile });
    } catch (error) {
      next(error);
    }
  },
);

// Follow user
router.post(
  '/profiles/:username/follow',
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profile = await followUser(req.params?.username, req.user?.username as string);
      res.json({ profile });
    } catch (error) {
      next(error);
    }
  },
);

// Unfollow user
router.delete(
  '/profiles/:username/follow',
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profile = await unfollowUser(req.params.username, req.user?.username as string);
      res.json({ profile });
    } catch (error) {
      next(error);
    }
  },
);

export default router;