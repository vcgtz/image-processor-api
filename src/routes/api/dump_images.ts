import express from 'express';
import sharp from 'sharp';
import * as images from '../../utilities/images';

const dumpImagesRoutes: express.Router = express.Router();

dumpImagesRoutes.get('/', async (req: express.Request, res: express.Response) => {
  const width: number = Number(req.query.width);
  const height: number = Number(req.query.height);

  const filename = `${width}x${height}.png`;
  const filePath = `${images.DUMMIES_FOLDER}/${filename}`;

  const svg = images.getDummyImageSVG(width, height);
  const svgBuffer = Buffer.from(svg);
  await sharp(svgBuffer).toFile(filePath);

  res.sendFile(filePath);
});

export default dumpImagesRoutes;
