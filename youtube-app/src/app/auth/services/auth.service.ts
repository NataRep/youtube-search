import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoginSubject = new BehaviorSubject<boolean>(false);
  isLogin$ = this.isLoginSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string>('');
  userName$ = this.userNameSubject.asObservable();

  constructor(private router: Router) {
    this.checkInitialLoginState();
  }

  private checkInitialLoginState(): void {
    const token = localStorage.getItem('youtube-app-token');
    if (token) {
      const userName = localStorage.getItem('youtube-app-username')!;
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
      localStorage.setItem('youtube-app-token', newToken);
    } else {
      localStorage.setItem('youtube-app-token', token);
    }
    localStorage.setItem('youtube-app-username', this.userName);
    this.isLoginSubject.next(true);
  }

  logout(): void {
    this.isLoginSubject.next(false);
    localStorage.removeItem('youtube-app-token');
    localStorage.removeItem('youtube-app-username');
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
