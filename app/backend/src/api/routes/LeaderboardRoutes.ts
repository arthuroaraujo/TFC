import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardService from '../services/LeaderboardService';

const leaderboardRoutes = Router();

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRoutes.get(
  '/',
  (req: Request, res:Response) => leaderboardController.readAll(req, res),
);

leaderboardRoutes.get(
  '/home',
  (req: Request, res:Response) => leaderboardController.readHome(req, res),
);

leaderboardRoutes.get(
  '/away',
  (req: Request, res:Response) => leaderboardController.readAway(req, res),
);

export default leaderboardRoutes;
