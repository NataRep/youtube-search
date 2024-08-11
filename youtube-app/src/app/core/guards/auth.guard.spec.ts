import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { provideRouter } from '@angular/router';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [AuthGuard, provideRouter([])],
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should have canActivate method', () => {
    expect(guard.canActivate).toBeDefined();
  });
});
