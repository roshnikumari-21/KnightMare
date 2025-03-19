import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from "cloudinary"
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage"
);
import crypto from "crypto";
import nodemailer from "nodemailer";

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
  const { code } = req.body;
  try {
    const { tokens } = await client.getToken(code);
    const idToken = tokens.id_token;
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = new User({
        username: payload.email.split("@")[0],
        email: payload.email,
        authProvider: "google",
        googleId: payload.sub,
        profilePicture: payload.picture,
        isVerified: true,
      });
      await user.save();
    }
    const token = user.generateAuthToken();
    res.status(200).json({
      success: true,
      message: "Google login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Error during Google login:", error);
    res.status(500).json({ success: false, message: "An error occurred during Google login" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 3600000;
    await user.save();
    const resetLink = `${process.env.FRONTEND_URL}/resetpassword?token=${resetToken}`;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      html:`<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p><p>If you didn't request this, please ignore this email.</p>`
    };
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Reset link sent to your email" });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired token." });
    }

    user.passwordHash = password;
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();
    res.json({ success: true, message: "Password reset successfully!" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

export const sendFeedback = async (req, res) => {
  const { name, email, Feedback } = req.body;
  if(!name || !email || !Feedback){
    return res.status(400).json({success:false,message:"Enter all the fields."})
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Feedback Sent Successfully",
      html: `<!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Feedback Confirmation</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  background: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  background: #000000;
                  color: #ffffff;
                  text-align: center;
                  padding: 15px;
                  font-size: 22px;
                  font-weight: bold;
                  border-radius: 8px 8px 0 0;
              }
              .content {
                  padding: 20px;
                  color: #333333;
                  line-height: 1.6;
              }
              .footer {
                  text-align: center;
                  font-size: 14px;
                  color: #777777;
                  margin-top: 20px;
              }
              .highlight {
                  font-weight: bold;
                  color: #e63946;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">Feedback Successfully Sent</div>
              <div class="content">
                  <p>Dear <span class="highlight">${name}</span>,</p>
                  <p>Thank you for reaching out to the <strong>KnightMare Team</strong>! We have successfully received your feedback.</p>
                  <p><strong>Your Feedback:</strong></p>
                  <blockquote style="background: #f8f8f8; padding: 15px; border-left: 5px solid #e63946;">
                      ${Feedback}
                  </blockquote>
                  <p>We truly value your input and will carefully review your message. If necessary, our team will get back to you as soon as possible.</p>
                  <p>Best Regards,</p>
                  <p><strong>KnightMare Support Team</strong></p>
              </div>
              <div class="footer">
                  &copy; 2025 KnightMare Team. All rights reserved.
              </div>
          </div>
      </body>
      </html>`,
    };
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Feedback successfully sent to the KnightMare team!" });

  } catch (error) {
    console.error("Error in sendFeedback:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

export const updateProfilePic = async (req, res) => {
  const { email } = req.body;
  const image = req.files?.image1?.[0];
  if (!image) {
    return res.status(400).json({ success: false, message: "No image file provided." });
  }
  try {
    const result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });
    const imageUrl = result.secure_url;
    const user = await User.findOneAndUpdate(
      { email },
      { profilePicture: imageUrl },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    res.json({ success: true, message: "Profile picture updated successfully!", user:user });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};




export const getUser = async (req, res) => {
};
export const updateUser = async (req, res) => {
};
export const deleteUser = async (req, res) => {
};
export const getAllUsers = async (req, res) => {
};