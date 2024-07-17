import { TrimVideoNamePipe } from './trim-video-name.pipe';

describe('TrimVideoNamePipe', () => {
  it('create an instance', () => {
    const pipe = new TrimVideoNamePipe();
    expect(pipe).toBeTruthy();
  });
});
