import { Router, Request, Response } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const teamRoutes = Router();

const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRoutes.get('/', (req: Request, res:Response) => teamController.readAll(req, res));
teamRoutes.get('/:id', (req: Request, res:Response) => teamController.readById(req, res));

export default teamRoutes;
