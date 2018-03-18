// Dependencies
/* import fs from 'fs';
import multer from 'multer';
import * as path from 'path';*/
import { Router } from 'express';

// const upload = multer({ dest: 'public/images/hotels/' });

// Controllers
import MetaController from './controllers/meta.controller';
import AuthController from './controllers/AuthController';
import UsersController from './controllers/UserController';
import PostsController from './controllers/PostController';
import HotelController from './controllers/HotelController';

// Middleware
import authenticate from './middleware/authenticate';
import accessControl from './middleware/access-control';
import errorHandler from './middleware/error-handler';

const routes = new Router();

routes.get('/', MetaController.index);

// Authentication
// routes.post('/auth/login', AuthController.login);

// Users
/* routes.get('/users', UsersController.search);
routes.post('/users', UsersController.create);
routes.get('/users/me', authenticate, UsersController.fetch);
routes.put('/users/me', authenticate, UsersController.update);
routes.delete('/users/me', authenticate, UsersController.delete);
routes.get('/users/:username', UsersController._populate, UsersController.fetch);

// Post
routes.get('/posts', PostsController.search);
routes.post('/posts', authenticate, PostsController.create);
routes.get('/posts/:id', PostsController._populate, PostsController.fetch);
routes.delete('/posts/:id', authenticate, PostsController.delete); */

// Hotel
routes.get('/hotels', HotelController.search);
routes.post('/hotels', HotelController.create);
// routes.put('/hotels/:id', HotelController.update);
routes.get('/hotel/:id', HotelController._populate, HotelController.fetch);
// routes.delete('/hotels/:id', HotelController.delete);

// Admin
routes.get('/admin', accessControl('admin'), MetaController.index);

/* routes.post('/testUpload', function(req, res) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const images = req.files.images;

  console.log(images);

  images.mv('public/images/hotels/' + images.name, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});*/

routes.get('/images', async (req, res) => {
  try {
    res.setHeader('Content-Type', 'image/jpeg');
    fs.createReadStream(path.join('public/images/hotels/', '74aabeef23eafe46a3c4e71d382b3ec0')).pipe(res);
  } catch (err) {
    res.sendStatus(400);
  }
});

routes.use(errorHandler);

export default routes;
