import express from 'express';
import * as images from '../../utilities/images';

const imagesRoutes: express.Router = express.Router();

imagesRoutes.get('/', (req: express.Request, res: express.Response) => {
  const { filename } = req.query;

  if (!filename) {
    res.status(404).json({ msg: 'Filename is required' });
  }

  images.existFile(filename as string)
    .then((filePath) => res.sendFile(filePath))
    .catch(() => {
      res.status(404).json({ msg: 'Image not found' });
    });
});

export default imagesRoutes;
