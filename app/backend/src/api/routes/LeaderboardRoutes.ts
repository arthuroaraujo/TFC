import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardService from '../services/LeaderboardService';

const leaderboardRoutes = Router();

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRoutes.get(
  '/home',
  (req: Request, res:Response) => leaderboardController.readHome(req, res),
);

export default leaderboardRoutes;
