import express from "express";
import { endGame, getGameHistory, getGameDetails } from "../controllers/gameController.js";

const gameRoutes = express.Router();
gameRoutes.post("/end",endGame);
gameRoutes.get("/history", getGameHistory);
gameRoutes.get("/:gameId", getGameDetails);

export default gameRoutes;