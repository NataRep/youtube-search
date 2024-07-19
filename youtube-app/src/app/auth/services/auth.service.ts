import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // for login //
  private isLoginSubject = new BehaviorSubject<boolean>(false);
  isLogin$ = this.isLoginSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string>('');
  userName$ = this.userNameSubject.asObservable();

  constructor(private router: Router) {}

  isLogin(): boolean {
    // Check that the user has previously logged into the application
    // If an entry has been made previously, automatic logging is performed.
    const token = localStorage.getItem('youtube-app-token');
    if (token) {
      this.userName = localStorage.getItem('youtube-app-username')!;
      this.auth(this.userName);
      this.isLoginSubject.next(true);
    } else {
      this.isLoginSubject.next(false);
    }
    return this.isLoginSubject.value;
  }

  auth(username: string): void {
    const token = localStorage.getItem('youtube-app-token');
    if (token) {
      this.userName = localStorage.getItem('youtube-app-username')!;
      this.isLoginSubject.next(true);
    } else {
      this.userName = username;
      const newToken = this.generateRandomToken();
      localStorage.setItem('youtube-app-token', newToken);
    }
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
