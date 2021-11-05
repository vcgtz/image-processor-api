import express from 'express';
import sharp from 'sharp';
import NodeCache from 'node-cache';
import * as images from '../../utilities/images';

const imagesRoutes: express.Router = express.Router();
const cache: NodeCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

imagesRoutes.get('/', async (req: express.Request, res: express.Response) => {
  const { filename, width, height } = req.query;

  // Validate if filename param exists
  if (!filename) {
    return res.status(400).json({ msg: 'Filename is required' });
  }

  // Validate if the image exists
  const imagePath = `${images.IMAGES_FOLDER}/${filename}`;
  const existsImage = await images.existImage(filename as string);
  if (!existsImage) {
    return res.status(404).json({ msg: 'Filename does not exists' });
  }

  // Validate if we have width and height
  if ((!width && height) || (!height && width)) {
    return res.status(400).json({ msg: 'You must specify width and height or none' });
  }

  // Return resized image
  try {
    if (width && height) {
      const thumbFilename = `${width}_${height}_${filename}`;
      const thumbImagePath = `${images.THUMBS_FOLDER}/${thumbFilename}`;
      const existsThumbImage = cache.get(thumbFilename);

      if (existsThumbImage) {
        console.log(`Accessed: ${thumbImagePath}`);

        return res.sendFile(thumbImagePath);
      }

      await sharp(imagePath)
        .resize(Number(width as unknown), Number(height as unknown))
        .toFile(thumbImagePath);

      // Store the path to avoid read a file if this exists
      cache.set(thumbFilename, thumbImagePath);
      console.log(`Created: ${thumbImagePath}`);

      return res.sendFile(thumbImagePath);
    }
  } catch (err) {
    console.error(err);

    return res.status(500).json({ msg: String(err) });
  }

  // Return the original image
  console.log(`Accessed: ${imagePath}`);

  return res.sendFile(imagePath);
});

export default imagesRoutes;
