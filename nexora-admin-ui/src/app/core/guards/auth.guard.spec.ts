import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard, { provide: AuthService, useValue: spy }]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should allow activation when authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);
    expect(guard.canActivate()).toBe(true);
  });

  it('should block activation and redirect when not authenticated', () => {
    authService.isAuthenticated.and.returnValue(false);
    const result = guard.canActivate();
    expect(result).not.toBe(true);
  });
});
