import express from 'express';
import sharp from 'sharp';
import * as images from '../../utilities/images';

const imagesRoutes: express.Router = express.Router();

imagesRoutes.get('/', async (req: express.Request, res: express.Response) => {
  const { filename, w, h } = req.query;

  if (!filename) {
    res.status(404).json({ msg: 'Filename is required' });
  }

  if (w && h) {
    const thumbsFolder: string | boolean = await images.createFolderIfNotExists('thumbs');

    if (thumbsFolder) {
      const filePath: string = await images.existFile(filename as string);

      sharp(filePath)
        .resize(Number(w as unknown), Number(h as unknown))
        .toFile(`${thumbsFolder}/${filename}_${w}_${h}.jpg`)
        .then(() => res.sendFile(`${thumbsFolder}/${filename}_${w}_${h}.jpg`))
        .catch((err) => console.log(err));
    }
  }

  try {
    const filePath: string = await images.existFile(filename as string);
    res.sendFile(filePath);
  } catch (e) {
    res.status(404).json({ msg: 'Image not found' });
  }
});

export default imagesRoutes;
