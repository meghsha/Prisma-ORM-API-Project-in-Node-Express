import { NextFunction, Request, Response, Router } from 'express';
import auth from '../utils/auth';
import {
  addComment,
  createArticle,
  deleteArticle,
  deleteComment,
  favoriteArticle,
  getArticle,
  getArticles,
  getCommentsByArticle,
  getFeed,
  unfavoriteArticle,
  updateArticle,
} from '../services/article.service';

const router = Router();

router.get('/articles', auth.optional, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getArticles(req.query, req.user?.username);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/articles/feed',
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getFeed(
        Number(req.query.offset),
        Number(req.query.limit),
        req.user?.username as string,
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

router.post('/articles', auth.required, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const article = await createArticle(req.body.article, req.user?.username as string);
    res.json({ article });
  } catch (error) {
    next(error);
  }
});


// Get unique article
router.get(
  '/articles/:slug',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const article = await getArticle(req.params.slug, req.user?.username as string);
      res.json({ article });
    } catch (error) {
      next(error);
    }
  },
);

// Update article
router.put(
  '/articles/:slug',
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const article = await updateArticle(
        req.body.article,
        req.params.slug,
        req.user?.username as string,
      );
      res.json({ article });
    } catch (error) {
      next(error);
    }
  },
);

// Delete article
router.delete(
  '/articles/:slug',
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteArticle(req.params.slug);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },
);

// Get comments from an article
router.get(
  '/articles/:slug/comments',
  auth.optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comments = await getCommentsByArticle(req.params.slug, req.user?.username);
      res.json({ comments });
    } catch (error) {
      next(error);
    }
  },
);

// Add comment to article
router.post(
  '/articles/:slug/comments',
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comment = await addComment(
        req.body.comment.body,
        req.params.slug,
        req.user?.username as string,
      );
      res.json({ comment });
    } catch (error) {
      next(error);
    }
  },
);

// Delete comment
router.delete(
  '/articles/:slug/comments/:id',
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteComment(Number(req.params.id), req.user?.username as string);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },
);

// Favorite article
router.post(
  '/articles/:slug/favorite',
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const article = await favoriteArticle(req.params.slug, req.user?.username as string);
      res.json({ article });
    } catch (error) {
      next(error);
    }
  },
);

// Unfavorite article
router.delete(
  '/articles/:slug/favorite',
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const article = await unfavoriteArticle(req.params.slug, req.user?.username as string);
      res.json({ article });
    } catch (error) {
      next(error);
    }
  },
);

export default router;