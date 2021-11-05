import sharp from 'sharp';
import fsPromises from 'fs/promises';
import * as images from '../../utilities/images';

describe('Testing utilities to work with files', () => {
  it('resolve existsImage when the file exists', async () => {
    await expectAsync(images.existImage('santamonica.jpg')).toBeResolvedTo(true);
  });

  it('reject existsFile when the file exists', async () => {
    await expectAsync(images.existImage('unknown')).toBeResolvedTo(false);
  });

  it('resolve existFolder when the folder exists', async () => {
    await expectAsync(images.existFolder('images')).toBeResolvedTo(true);
  });
});

describe('Testing creation of thumbnails', () => {
  beforeEach(async () => {
    const existsThumbFolder = await images.existFolder(images.THUMBS_FOLDER);

    if (!existsThumbFolder) {
      await images.createFolder(images.THUMBS_FOLDER);
    }
  });

  it('creates 50x50 image', async () => {
    const imagePath = `${images.IMAGES_FOLDER}/santamonica.jpg`;
    const thumbFilename = '50_50_testing.jpg';
    const thumbImagePath = `${images.THUMBS_FOLDER}/${thumbFilename}`;

    await sharp(imagePath)
      .resize(50, 50)
      .toFile(thumbImagePath);
    
    await expectAsync(images.existThumbImage(thumbFilename)).toBeResolvedTo(true);
  });

  afterAll(async () => {
    const thumbFilename = '50_50_testing.jpg';
    const thumbImagePath = `${images.THUMBS_FOLDER}/${thumbFilename}`;

    await fsPromises.unlink(thumbImagePath);
  });
});