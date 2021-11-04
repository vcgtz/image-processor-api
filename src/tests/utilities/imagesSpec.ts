import { existFile, existFolder } from '../../utilities/images';

describe('Testing utilities to work with files', () => {
  it('resolve existsFile when the file exists', async () => {
    await expectAsync(existFile('santamonica')).toBeResolved();
  });

  it('reject existsFile when the file exists', async () => {
    await expectAsync(existFile('unknown')).toBeRejected();
  });

  it('resolve existFolder when the folder exists', async () => {
    await expectAsync(existFolder('images')).toBeResolved();
  });
});