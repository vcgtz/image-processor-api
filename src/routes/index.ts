import express from 'express';
import images from './api/images';

const routes: express.Router = express.Router();

routes.get('/', (req: express.Request, res: express.Response) => {
  res.send('Image Processor API');
});

routes.use('/images', images);

export default routes;
