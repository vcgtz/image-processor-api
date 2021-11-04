import express from 'express';
import * as images from '../../utilities/images';

const imagesRoutes: express.Router = express.Router();

imagesRoutes.get('/', async (req: express.Request, res: express.Response) => {
  const { filename, w, h } = req.query;

  if (!filename) {
    res.status(404).json({ msg: 'Filename is required' });
  }

  if (w && h) {
    await images.createFolderIfNotExists('thumbs');
  }

  try {
    const filePath: string = await images.existFile(filename as string);
    res.sendFile(filePath);
  } catch (e) {
    res.status(404).json({ msg: 'Image not found' });
  }
});

export default imagesRoutes;
