import express from 'express';
import { register, login, refresh, logout } from '../controllers/authController.js';
import { verifyToken, checkRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/refresh', refresh);
router.post('/logout', logout);

// Protected examples
router.get('/user', verifyToken, checkRole('user', 'editor', 'admin'), (req, res) => {
  res.json({ message: `Hello ${req.user.role}` });
});

router.get('/admin', verifyToken, checkRole('admin'), (req, res) => {
  res.json({ message: 'Admin route access granted' });
});

export default router;
