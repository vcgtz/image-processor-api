import fsPromises from 'fs/promises';

const existFile = async (filename: string): Promise<void> => {
  const cwd: string = process.cwd();

  return fsPromises.access(`${cwd}/images/${filename}.jpg`);
};

const e = () => false;

export {
  existFile,
  e,
};
