import fsPromises from 'fs/promises';

const IMAGES_FOLDER: string = `${process.cwd()}/images`;

const THUMBS_FOLDER: string = `${process.cwd()}/thumbs`;

const RESIZED_FOLDER: string = `${process.cwd()}/thumbs/resized`;

const DUMMIES_FOLDER: string = `${process.cwd()}/thumbs/dummies`;

const existImage = async (filename: string): Promise<boolean> => {
  try {
    await fsPromises.access(`${IMAGES_FOLDER}/${filename}`);
    return true;
  } catch (e) {
    return false;
  }
};

const existThumbImage = async (filename: string): Promise<boolean> => {
  try {
    await fsPromises.access(`${THUMBS_FOLDER}/${filename}`);
    return true;
  } catch (e) {
    return false;
  }
};

const existFolder = async (folder: string): Promise<boolean> => {
  try {
    await fsPromises.access(`${process.cwd()}/${folder}`);
    return true;
  } catch (e) {
    return false;
  }
};

const createFolder = async (path: string): Promise<boolean> => {
  try {
    await fsPromises.mkdir(path);
    return true;
  } catch (e) {
    return false;
  }
};

const getDummyImageSVG = (width: number, height: number): string => {
  return `
    <svg width="${width}" height="${height}">
      <style>
        .title { fill: #001; font-size: 1.5em; font-family: sans-serif; font-weight: bold;}
      </style>
      <rect width="100%" height="100%" fill="#eeeeee" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="title">${width} x ${height}</text>
    </svg>
  `;
};

export { IMAGES_FOLDER, THUMBS_FOLDER, RESIZED_FOLDER, DUMMIES_FOLDER, existImage, existThumbImage, existFolder, createFolder, getDummyImageSVG };
