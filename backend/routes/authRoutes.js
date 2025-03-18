// routes/userRoutes.js
import express from 'express';
import {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  getAllUsers,
  googleLogin,
  sendFeedback
} from '../controllers/userController.js';
import authenticateUser from '../middleware/authMiddleware.js';
const userRouter = express.Router();
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/googlelogin',googleLogin);
userRouter.post('/forgotpassword', forgotPassword);
userRouter.post('/resetpassword', resetPassword);
userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getUser);
userRouter.put('/:userId', authenticateUser, updateUser);
userRouter.delete('/:userId', authenticateUser, deleteUser);
userRouter.post('/sendFeedback',sendFeedback);
export default userRouter;
