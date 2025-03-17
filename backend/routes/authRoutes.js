import express from 'express';
import {} from '../controllers/userController';

const authRoutes = express.Router();
authRoutes.post('/register',registerUser)

export default authRoutes;