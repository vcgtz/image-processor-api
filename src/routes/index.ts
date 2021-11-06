import express from 'express';
import images from './api/images';
import dumpImages from './api/dump_images';

const routes: express.Router = express.Router();

routes.get('/', (req: express.Request, res: express.Response) => {
  res.send('Image Processor API');
});

routes.use('/api/images', images);
routes.use('/api/dump-images', dumpImages);

export default routes;
