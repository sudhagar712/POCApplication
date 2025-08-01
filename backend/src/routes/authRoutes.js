import express from 'express';
import { register, login,getAllUsers, logout, getUser } from '../controllers/authController.js';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post("/logout", logout); 
router.get("/user/:id",protect, authorizeRoles("admin"),  getUser)
router.get('/users',protect,authorizeRoles("admin"),getAllUsers);

export default router;
