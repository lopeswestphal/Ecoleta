import express from 'express';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

// mandar as rotas do servidor para um outro arquivo.
const routes = express.Router(); 
const pointsController = new PointsController(); 
const itemsController = new ItemsController(); 

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;