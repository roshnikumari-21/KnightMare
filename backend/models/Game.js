import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const gameSchema = new mongoose.Schema({
  gameId: { 
    type: String, 
    unique: true, 
    required: true,
    default: () => uuidv4()
  },
  player: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    index: true
  },
  difficulty: { 
      type: String, 
      enum: ["easy", "medium", "hard"], 
      required: true 
  },
  moves: [{ type: String, required: true }],
  result: {
    type: String,
    enum: [
      "win", 
      "lose", 
      "player_resign", 
      "player_timeout", 
      "ai_timeout", 
      "draw", 
      "stalemate",
      "threefold_repetition",
      "ongoing"
    ],
    default: "ongoing"
  },
  ratingChange: { 
    type: Number, 
    default: 0,
  },
  playerRating: { 
    type: Number, 
    required: true,
  },
  capturedPieces: {
    player: [{ type: String }],
    ai: [{ type: String }]
  },
  startTime: { 
    type: Date, 
    default: Date.now,
    index: true 
  },
  endTime: { 
    type: Date, 
    default: null 
  },
  duration: { 
    type: Number, 
    default: 0,
    min: 0 
  },
}, { 
  timestamps: true});

gameSchema.methods.endGame = async function(result) {
  this.duration = (this.endTime - this.startTime) / 1000;
  const ratingChanges = {
    easy: {
      win: 5,
      lose: -7,
      player_resign: -8,
      player_timeout: -2,
      ai_timeout: 5,
      draw: 0,
      stalemate: 0,
      threefold_repetition: 0,
      ongoing: 0
    },
    medium: {
      win: 10,
      lose: -5,
      player_resign: -6,
      player_timeout: -4,
      ai_timeout: 10,
      draw: 2,
      stalemate: 2,
      threefold_repetition: 2,
      ongoing: 0
    },
    hard: {
      win: 20,
      lose: -3,
      player_resign: -4,
      player_timeout: -1,
      ai_timeout: 20,
      draw: 5,
      stalemate: 5,
      threefold_repetition: 5,
      ongoing: 0
    }
  };
  this.ratingChange = ratingChanges[this.difficulty][this.result];
  return this.save();
};


gameSchema.pre('save', function(next) {
  if (!this.gameId) this.gameId = uuidv4();
  if (this.result !== 'ongoing' && this.endTime) {
    this.duration = (this.endTime - this.startTime) / 1000;
  }
  next();
});

const Game = mongoose.model("Game", gameSchema);
export default Game;