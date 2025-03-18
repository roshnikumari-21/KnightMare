// routes/userRoutes.js
import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  getAllUsers,
} from '../controllers/userController.js';
import authenticateUser from '../middleware/authMiddleware.js';
const userRouter = express.Router();
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser); 
userRouter.post('/logout', authenticateUser, logoutUser);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password/:token', resetPassword);
userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getUser);
userRouter.put('/:userId', authenticateUser, updateUser);
userRouter.delete('/:userId', authenticateUser, deleteUser);
export default userRouter;
