// routes/userRoutes.js
import express from 'express';
import upload from '../middleware/multer.js';
import {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deactivateAccount,
  forgotPassword,
  resetPassword,
  getAllUsers,
  googleLogin,
  sendFeedback,
  uploadProfilePic
} from '../controllers/userController.js';
import authenticateUser from '../middleware/authMiddleware.js';
const userRouter = express.Router();
userRouter.post('/uploadProfilePic',upload.single('image1'),uploadProfilePic)
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/googlelogin',googleLogin);
userRouter.post('/forgotpassword', forgotPassword);
userRouter.post('/resetpassword', resetPassword);
userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getUser);
userRouter.put('/:userId', authenticateUser, updateUser);
userRouter.post('/deactivateAccount', authenticateUser, deactivateAccount);
userRouter.post('/sendFeedback',sendFeedback);
export default userRouter;
