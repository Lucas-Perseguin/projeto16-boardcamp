import { Router } from 'express';
import { getGames, postGame } from '../controllers/games.controller.js';
import validateGameModel from '../middlewares/validateGameModel.middleware.js';
import validateGameToPost from '../middlewares/validateGameToPost.middleware.js';

const router = Router();

router.get('/games', getGames);
router.post('/games', validateGameModel, validateGameToPost, postGame);

export default router;
