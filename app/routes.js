// Dependencies
import { Router } from 'express';

// Controllers
import MetaController from './controllers/meta.controller';
import HotelController from './controllers/HotelController';

// Middleware
import errorHandler from './middleware/error-handler';

const routes = new Router();

routes.get('/', MetaController.index);


// Hotel
routes.get('/hotels', HotelController.search);
routes.post('/hotels', HotelController.create);
routes.put('/hotels/:id', HotelController.update);
routes.get('/hotel/:id', HotelController._populate, HotelController.fetch);
routes.delete('/hotel/:id', HotelController.delete);


routes.use(errorHandler);

export default routes;
