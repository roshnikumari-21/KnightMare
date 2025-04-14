import mongoose from "mongoose";
import Game from "../models/Game.js";
import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";
export const endGame = async (req, res) => {
  try {
    const userId = req.headers["userid"] || req.headers["userId"];
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID missing in headers",
      });
    }
    const {
      gameId,
      difficulty,
      moves,
      endedAt,
      createdAt,
      result,
      playerRating,
      capturedPieces,
      duration,
    } = req.body;
    if (!gameId || !difficulty || !moves || !result) {
      return res.status(400).json({
        success: false,
        message: "Missing required game fields",
      });
    }
    let game = await Game.findOne({ gameId });
    if (!game) {
      game = new Game({
        gameId: gameId || uuidv4(),
        player: userId,
        difficulty,
        moves,
        playerRating: playerRating || 0,
        capturedPieces: capturedPieces || [],
        startTime: createdAt ? new Date(createdAt) : new Date(),
        endTime: endedAt ? new Date(endedAt) : new Date(),
      });
    } else {
      game.endTime = endedAt ? new Date(endedAt) : new Date();
    }

    game.result = result;
    await game.endGame(result);

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const ratingChange = game.ratingChange || 0;
    user.score = (user.score || 0) + ratingChange;
    if (isNaN(user.score)) {
      user.score = 0;
    }
    user.ratingHistory.push({
      date: new Date(),
      score: user.score,
    });

    if (result === "win" || result === "ai_timeout") {
      user.gamesWon += 1;
    } else if (result === "lose" || result === "player_timeout") {
      user.gamesLost += 1;
    } else if (["draw", "stalemate", "threefold_repetition"].includes(result)) {
      user.gamesDrawn += 1;
    } else if (result === "player_resign") {
      user.gamesResigned += 1;
    }
    if (game._id) {
      user.gameHistory.push(game._id);
    }

const now = new Date();
const today = now.toISOString().split('T')[0];
user.dailyActivity.push({ date: now });

const isFirstActivityToday = user.dailyActivity.filter(activity => {
  const activityDate = new Date(activity.date).toISOString().split('T')[0];
  return activityDate === today;
}).length === 1;

if (isFirstActivityToday){
  if (user.dailyActivity.length > 1) {
    const uniqueActivityDates = [...new Set(
      user.dailyActivity.map(activity => 
        new Date(activity.date).toISOString().split('T')[0]
      )
    )].sort();
    
    const todayIndex = uniqueActivityDates.indexOf(today);
    
    if (todayIndex > 0) {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (uniqueActivityDates[todayIndex - 1] === yesterdayStr) {
        user.currentStreak += 1;
      } else {
        user.currentStreak = 1;
      }
      user.longestStreak = Math.max(user.currentStreak, user.longestStreak);
    } else {
      user.currentStreak = 1;
      user.longestStreak = 1;
    }
  } else {
    user.currentStreak = 1;
    user.longestStreak = 1;
  }
}
    await user.validate();
    const savedUser = await user.save();
    const responseUser = savedUser.toObject();
    responseUser.ratingHistory = responseUser.ratingHistory.map((item) => ({
      ...item,
      date: item.date.toISOString(),
    }));
    responseUser.dailyActivity = responseUser.dailyActivity.map((item) => ({
      date: item.date.toISOString(),
    }));

    res.status(200).json({
      success: true,
      message: "Game result saved successfully",
      game,
      user: responseUser,
    });
  } catch (error) {
    console.error("Error ending game:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save game result",
      error: error.message,
    });
  }
};

export const getGameHistory = async (req, res) => {
  try {
    const userId = req.body.user?._id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const games = await Game.find({ player: userId })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      games: games || [],
    });
  } catch (error) {
    console.error("Error fetching game history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch game history",
      error: error.message,
    });
  }
};

export const getGameDetails = async (req, res) => {
  try {
    const { gameId } = req.params;
    const userId = req.body.user?._id;

    if (!gameId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Game ID and User ID are required",
      });
    }

    const game = await Game.findOne({ gameId, player: userId });
    if (!game) {
      return res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }

    res.status(200).json({
      success: true,
      game,
    });
  } catch (error) {
    console.error("Error fetching game details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch game details",
      error: error.message,
    });
  }
};

export const getUserGameDuration = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await Game.aggregate([
      {
        $match: {
          player: new mongoose.Types.ObjectId(userId),
        }
      },
      {
        $group: {
          _id: null,
          totalDuration: { $sum: "$duration" }
        }
      }
    ]);

    const totalDuration = result.length > 0 ? result[0].totalDuration : 0;
    const hoursPlayed = Math.round(totalDuration / 3600);

    res.status(200).json({
      success: true,
      totalDuration,
      hoursPlayed
    });
  } catch (error) {
    console.error("Error calculating game duration:", error);
    res.status(500).json({
      success: false,
      message: "Error calculating game duration"
    });
  }
};