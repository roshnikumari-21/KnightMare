import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const gameSchema = new mongoose.Schema({
  gameId: { type: String, unique: true, required: true },
  player: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  aiOpponent: {
    difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true }
  },
  moves: [{ type: String, required: true }],
  result: {
    type: String,
    enum: ["player_checkmate", "ai_checkmate", "player_resign", "player_timeout", "ai_timeout", "draw", "ongoing"],
    default: "ongoing"
  },
  ratingChange: { type: Number, default: 0 },
  playerRating: { type: Number, required: true },
  capturedPieces: {
    player: [{ type: String }],
    ai: [{ type: String }]
  },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, default: null },
  duration: { type: Number, default: 0 }
});
gameSchema.pre("save", function (next) {
  if (!this.gameId) {
    this.gameId = uuidv4();}next();
});

const Game = mongoose.model("Game", gameSchema);
export default Game;