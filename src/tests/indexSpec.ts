import { hello, goodbye } from '../index';

describe('Example of testing', () => {
  it('says hello', () => {
    expect(hello()).toEqual('hello');
  });

  it('says goodbye', () => {
    expect(goodbye()).toEqual('goodbye');
  });
});
