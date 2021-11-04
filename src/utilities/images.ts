import fsPromises from 'fs/promises';

const existFile = (filename: string): Promise<string> => new Promise((resolve, reject) => {
  const cwd: string = process.cwd();
  const filePath: string = `${cwd}/images/${filename}.jpg`;

  fsPromises.access(filePath)
    .then(() => resolve(filePath))
    .catch((err) => reject(err));
});

const e = () => false;

export {
  existFile,
  e,
};
