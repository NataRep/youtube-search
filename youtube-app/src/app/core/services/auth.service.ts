import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoginSubject = new BehaviorSubject<boolean>(false);
  isLogin$ = this.isLoginSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string>('');
  userName$ = this.userNameSubject.asObservable();

  private currentUrl: string | null = null;

  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ) {
    this.checkInitialLoginState();
    window.addEventListener('storage', (event) =>
      this.handleStorageChange(event)
    );
  }

  get isLoggedIn(): boolean {
    return this.isLoginSubject.value;
  }

  checkInitialLoginState(): void {
    const token = this.localStorage.getToken();
    if (token) {
      const userName = this.localStorage.getUsername()!;
      this.auth(userName, token);
      this.isLoginSubject.next(true);
    } else {
      this.isLoginSubject.next(false);
    }
  }

  auth(username: string, token?: string): void {
    this.userName = username;
    if (!token) {
      const newToken = this.generateRandomToken();
      this.localStorage.setToken(newToken);
    } else {
      this.localStorage.setToken(token);
    }
    this.localStorage.setUsername(this.userName);
    this.isLoginSubject.next(true);

    // Dispatch a storage event to update other tabs
    localStorage.setItem('auth-update', new Date().toISOString());
  }

  logout(): void {
    this.isLoginSubject.next(false);
    this.localStorage.removeToken();
    this.localStorage.removeUsername();
    this.router.navigate(['/login']);

    // Dispatch a storage event to update other tabs
    localStorage.setItem('auth-update', new Date().toISOString());
  }

  set userName(value: string) {
    this.userNameSubject.next(value);
  }
  get userName(): string {
    return this.userNameSubject.value;
  }

  private handleStorageChange(event: StorageEvent): void {
    if (event.key === 'auth-update') {
      this.checkInitialLoginState();
      console.log(this.router.url);

      if (!this.isLoggedIn && this.router.url !== '/login') {
        // Redirect to login if not authenticated
        this.router.navigate(['login']);
      }

      if (this.isLoggedIn && this.router.url == '/login') {
        // Redirect to main if authenticated
        this.router.navigate(['']);
      }
    }
  }

  generateRandomToken(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
