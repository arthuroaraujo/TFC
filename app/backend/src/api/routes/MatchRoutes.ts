import { Router, Request, Response } from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';
import TokenMiddleware from '../middlewares/isTokenValid';
import MatchesMiddleware from '../middlewares/areTeamIdsValid';

const matchRoutes = Router();

const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRoutes.get('/', (req: Request, res:Response) => matchController.readAll(req, res));
matchRoutes.patch(
  '/:id/finish',
  TokenMiddleware.test,
  (req: Request, res:Response) => matchController.update(req, res),
);
matchRoutes.patch(
  '/:id',
  TokenMiddleware.test,
  (req: Request, res:Response) => matchController.updateById(req, res),
);

matchRoutes.post(
  '/',
  TokenMiddleware.test,
  MatchesMiddleware.test,
  (req: Request, res:Response) => matchController.create(req, res),
);

export default matchRoutes;
