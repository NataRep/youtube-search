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

  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ) {
    this.checkInitialLoginState();
  }

  private checkInitialLoginState(): void {
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
  }

  logout(): void {
    this.isLoginSubject.next(false);
    this.localStorage.removeToken();
    this.localStorage.removeUsername();
    this.router.navigate(['/login']);
  }

  set userName(value: string) {
    this.userNameSubject.next(value);
  }
  get userName(): string {
    return this.userNameSubject.value;
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
