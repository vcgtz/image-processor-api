import express from 'express';

const imagesRoutes: express.Router = express.Router();

imagesRoutes.get('/', (req: express.Request, res: express.Response) => {
  res.send('Image API');
});

export default imagesRoutes;
