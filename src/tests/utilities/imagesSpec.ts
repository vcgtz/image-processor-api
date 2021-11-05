import sharp from 'sharp';
import fsPromises from 'fs/promises';
import supertest from 'supertest';
import * as images from '../../utilities/images';
import app from '../../index';

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
    const existsThumbFolder: boolean = await images.existFolder(images.THUMBS_FOLDER);

    if (!existsThumbFolder) {
      await images.createFolder(images.THUMBS_FOLDER);
    }
  });

  it('creates 50x50 image', async () => {
    const imagePath: string = `${images.IMAGES_FOLDER}/santamonica.jpg`;
    const thumbFilename: string = '50_50_testing.jpg';
    const thumbImagePath: string = `${images.THUMBS_FOLDER}/${thumbFilename}`;

    await sharp(imagePath).resize(50, 50).toFile(thumbImagePath);

    await expectAsync(images.existThumbImage(thumbFilename)).toBeResolvedTo(true);
  });

  afterAll(async () => {
    const thumbFilename: string = '50_50_testing.jpg';
    const thumbImagePath: string = `${images.THUMBS_FOLDER}/${thumbFilename}`;

    await fsPromises.unlink(thumbImagePath);
  });
});

describe('Testing endpoints to the creation of images', () => {
  const request: supertest.SuperTest<supertest.Test> = supertest(app);

  it('gets the original image', () => {
    request.get('/images?filename=santamonica.jpg').expect(200);
  });

  it('gets message when the filename is not send it', () => {
    request
      .get('http://localhost:3000/images?filename=')
      .expect('Content-Type', /json/)
      .expect(400, { msg: 'Filename is required' });
  });

  it('gets message when the image does not exists', () => {
    request
      .get('http://localhost:3000/images?filename=nofile.jpg')
      .expect('Content-Type', /json/)
      .expect(404, { msg: 'Filename does not exists' });
  });

  it('gets message when the width and the height are incomplete', () => {
    request
      .get('http://localhost:3000/images?filename=santamonica.jpg&width=200')
      .expect('Content-Type', /json/)
      .expect(400, { msg: 'You must specify width and height or none' });
  });
});
