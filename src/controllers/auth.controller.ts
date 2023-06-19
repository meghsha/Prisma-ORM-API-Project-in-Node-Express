import { NextFunction, Request, Response, Router } from 'express';
import auth from '../utils/auth';
import { createUser, getCurrentUser, login, updateUser } from '../services/auth.service';

const router = Router();

router.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await createUser(req.body.user);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

router.post('/users/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await login(req.body.user);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

router.get('/user', auth.required, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getCurrentUser(req.user?.username as string);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

router.put('/user', auth.required, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await updateUser(req.body.user, req.user?.username as string);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

export default router;