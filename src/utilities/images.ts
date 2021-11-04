import fsPromises from 'fs/promises';

const existFile = (filename: string): Promise<string> => new Promise((resolve, reject) => {
  const cwd: string = process.cwd();
  const filePath: string = `${cwd}/images/${filename}.jpg`;

  fsPromises.access(filePath)
    .then(() => resolve(filePath))
    .catch((err) => reject(err));
});

const existFolder = (folderName: string): Promise<string> => new Promise((resolve, reject) => {
  const cwd: string = process.cwd();
  const folderPath: string = `${cwd}/${folderName}`;

  fsPromises.access(folderPath)
    .then(() => resolve(folderPath))
    .catch(() => reject(folderPath));
});

const createFolder = (folderPath: string): Promise<string> => new Promise((resolve, reject) => {
  fsPromises.mkdir(folderPath)
    .then(() => resolve(folderPath))
    .catch(() => reject(folderPath));
});

const createFolderIfNotExists = async (folderName: string): Promise<boolean> => {
  try {
    const folderPath: string = await existFolder(folderName);

    return !!folderPath;
  } catch (folderPath) {
    return createFolder(folderPath as string)
      .then(() => true)
      .catch(() => false);
  }
};

export {
  existFile,
  existFolder,
  createFolder,
  createFolderIfNotExists,
};
