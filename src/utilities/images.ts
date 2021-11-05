import fsPromises from 'fs/promises';

const IMAGES_FOLDER: string = `${process.cwd()}/images`;

const THUMBS_FOLDER: string = `${process.cwd()}/thumbs`;

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

export {
  IMAGES_FOLDER,
  THUMBS_FOLDER,
  existImage,
  existThumbImage,
  existFolder,
  createFolder,
};
