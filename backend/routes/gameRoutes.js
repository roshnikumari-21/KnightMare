import express from "express";
import { endGame, getGameHistory, getGameDetails ,getUserGameDuration } from "../controllers/gameController.js";

const gameRoutes = express.Router();
gameRoutes.post("/end",endGame);
gameRoutes.get("/history", getGameHistory);
gameRoutes.get("/:gameId", getGameDetails);
gameRoutes.get('/user/:userId/game-duration', getUserGameDuration);

export default gameRoutes;