import { Router } from 'express';
import { registerUser, loginUser, getSession, logoutUser } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/session/:id', authMiddleware, getSession);
router.delete('/logout', authMiddleware, logoutUser);

export default router;
