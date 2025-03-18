import express from 'express';
// import {
//   createGame,
//   getGame,
//   updateGame,
//   getAllGames
// } from '../controllers/gameController.js';
import authenticateUser from '../middleware/authMiddleware.js';
const gameRouter = express.Router();
// gameRouter.post('/', authenticateUser, createGame);
// gameRouter.get('/:gameId', authenticateUser, getGame);
// gameRouter.put('/:gameId', authenticateUser, updateGame);
// gameRouter.get('/', authenticateUser, getAllGames);
export default gameRouter;