import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username or email already exists" });
    }
    const passwordHash = password;
    const newUser = new User({
      username,
      email,
      passwordHash,
      authProvider: "local",
    });
    await newUser.save();
    const token = newUser.generateAuthToken();
    const user = await User.findOne({ $or: [{ username }, { email }] });
    res.status(201).json({
      success: true,
      message: "Registration successful",
      user:user,
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, message: "An error occurred during registration" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }
    const token = user.generateAuthToken();
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: user,
      token,
    });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "An error occurred during login" });
  }
};

export const googleLogin = async (req, res) => {
  const { code } = req.query; 
  try {
    const ticket = await client.verifyIdToken({
      idToken: code,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = new User({
        username: payload.email.split('@')[0],
        email: payload.email,
        authProvider: "google",
        googleId: payload.sub,
        profilePicture: payload.picture,
        isVerified: true, 
      });
      await user.save();
    }
    const newuser = await User.findOne({email:user.email});
    const token = user.generateAuthToken();
    res.status(200).json({
      success: true,
      message: "Google login successful",
      token,
      user: newuser,
    });
  } catch (error) {
    console.error("Error during Google login:", error);
    res.status(500).json({ success: false, message: "An error occurred during Google login" });
  }
};


export const logoutUser = async (req, res) => {
};
export const getUser = async (req, res) => {
};
export const updateUser = async (req, res) => {
};
export const deleteUser = async (req, res) => {
};
export const forgotPassword = async (req, res) => {
};
export const resetPassword = async(req,res) =>{
}
export const getAllUsers = async (req, res) => {
};