import { SafeUrlPipe } from './safe-url.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

describe('SafeUrlPipe', () => {
  let pipe: SafeUrlPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomSanitizer],
    });
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new SafeUrlPipe(sanitizer);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sanitize the URL', () => {
    const url = 'https://www.youtube.com/embed/D5EAfxDxs44';
    const safeUrl = pipe.transform(url);
    expect(safeUrl).toBe(sanitizer.bypassSecurityTrustResourceUrl(url));
  });
});
export { SafeUrlPipe };
