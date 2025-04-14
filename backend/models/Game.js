import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const gameSchema = new mongoose.Schema(
  {
    gameId: {
      type: String,
      unique: true,
      required: true,
      default: () => uuidv4(),
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
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
        "ongoing",
      ],
      default: "ongoing",
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
      ai: [{ type: String }],
    },
    startTime: {
      type: Date,
      default: Date.now,
      index: true,
    },
    endTime: {
      type: Date,
      default: null,
    },
    duration: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

gameSchema.methods.endGame = async function (result) {
  this.endTime = new Date();
  this.duration = (this.endTime - this.startTime) / 1000;

  // Base positive rating changes - even losses give some points
  const baseRatingChanges = {
    easy: {
      win: 15,
      lose: 3, // Positive for losing (learning experience)
      draw: 8,
      stalemate: 5,
      threefold_repetition: 5,
      ai_timeout: 15,
      player_timeout: 1, // Small positive for timeout (they tried)
      player_resign: -4, // Only negative for resignations
      ongoing: 0,
    },
    medium: {
      win: 25,
      lose: 5,
      draw: 12,
      stalemate: 8,
      threefold_repetition: 8,
      ai_timeout: 25,
      player_timeout: 2,
      player_resign: -6,
      ongoing: 0,
    },
    hard: {
      win: 40,
      lose: 8, // More points for attempting hard difficulty
      draw: 20,
      stalemate: 12,
      threefold_repetition: 12,
      ai_timeout: 40,
      player_timeout: 3,
      player_resign: -8,
      ongoing: 0,
    },
  };

  let ratingChange = baseRatingChanges[this.difficulty][result];

  // Reward higher-rated players less for easy wins, more for hard challenges
  const ratingFactor = 1 - this.playerRating / 3000; // Normalized factor
  ratingChange *= 0.8 + (this.difficulty === "hard" ? ratingFactor * 0.4 : 0);

  // Reward longer games more
  const moveCount = this.moves.length;
  const lengthFactor = Math.min(1.5, 0.5 + moveCount / 30); // 30 moves = full value
  ratingChange *= lengthFactor;

  // Special handling for resignations - only penalize after minimum moves
  if (result === "player_resign") {
    const minMovesForPenalty = {
      easy: 8,
      medium: 12,
      hard: 15,
    };

    if (moveCount < minMovesForPenalty[this.difficulty]) {
      // Very early resignation - reduced penalty
      ratingChange *= 0.5;
    } else if (moveCount < minMovesForPenalty[this.difficulty] * 2) {
      // Mid-game resignation - partial penalty
      ratingChange *= 0.8;
    }
    // Late resignations keep full penalty
  }
  const playerMaterial = this.capturedPieces?.player?.length || 0;
  const aiMaterial = this.capturedPieces?.ai?.length || 0;
  const materialDifference = aiMaterial - playerMaterial;

  if (materialDifference > 0) {
    ratingChange *= 1 + materialDifference * 0.15;
  } else if (materialDifference < 0) {
    ratingChange *= 1 + materialDifference * 0.03;
  }

  if (ratingChange > 0) {
    ratingChange = Math.max(1, ratingChange);
  }
  if (ratingChange < 0) {
    ratingChange = Math.max(-15, ratingChange);
  }

  this.ratingChange = Math.round(ratingChange);

  return this.save();
};

gameSchema.pre("save", function (next) {
  if (!this.gameId) this.gameId = uuidv4();
  if (this.result !== "ongoing" && this.endTime) {
    this.duration = (this.endTime - this.startTime) / 1000;
  }
  next();
});

const Game = mongoose.model("Game", gameSchema);
export default Game;
