import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unique: true, required: true },
    passwordHash: { 
      type: String, 
      required: function () { return this.authProvider === "local"; }
    },
    authProvider: { type: String, enum: ["local", "google"], default: "local" },
    googleId: { type: String,sparse: true, default: null },
    profilePicture: { type: String, default:"https://res.cloudinary.com/dzqazpfsq/image/upload/v1742382970/zgp1qxjtz2yca3qkbhb3.png" },
    isVerified: { type: Boolean, default: false },
    resetToken: { type: String, default: null },
    resetTokenExpires: { type: Date, default: null },

    score: { type: Number, default: 0 },
    gamesPlayed: { type: Number, default: 0 },
    gamesWon: { type: Number, default: 0 },
    gamesLost: { type: Number, default: 0 },
    gamesDrawn: { type: Number, default: 0 },
    gamesResigned :{type : Number , default : 0},
    gameHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game", default: () => [] }],
    dailyActivity: [{ type: Date, default:Date.now}],
    longestStreak: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    ratingHistory: [
      {
        date: { type: Date, default: Date.now },
        score: { type: Number, required: true, min: 0 }
      }
    ],
  });
  userSchema.pre('save', function (next) {
    if (this.authProvider === 'local' && !this.passwordHash) {
      return next(new Error('Password is required for local authentication'));
    }
    if (this.resetTokenExpires && this.resetTokenExpires < new Date()) {
      this.resetToken = null;
      this.resetTokenExpires = null;
    }
    this.gamesPlayed = this.gamesWon + this.gamesLost + this.gamesDrawn;
    if (this.dailyActivity.length > 365) {
      this.dailyActivity = this.dailyActivity.slice(-365);
    }
    if (this.authProvider !== 'local') {
      this.isVerified = true;
    }
    next();
  });
userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  next();
});
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.passwordHash);
};
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
const User = mongoose.model("User", userSchema);
export default User;

