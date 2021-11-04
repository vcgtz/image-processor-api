import { existFile } from '../../utilities/images';

describe('Test utilities to working with images', () => {
  it('exists image', async () => {
    await expectAsync(existFile('santamonica')).toBeResolved();
  });

  it('does not exists image', async () => {
    await expectAsync(existFile('unknown')).toBeRejected();
  });
});