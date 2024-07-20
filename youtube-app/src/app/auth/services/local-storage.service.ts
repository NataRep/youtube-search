import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getToken(): string | null {
    return localStorage.getItem('youtube-app-token');
  }

  setToken(token: string) {
    localStorage.setItem('youtube-app-token', token);
  }

  getUsername(): string | null {
    return localStorage.getItem('youtube-app-username');
  }

  setUsername(username: string) {
    localStorage.setItem('youtube-app-username', username);
  }

  removeToken(): void {
    localStorage.removeItem('youtube-app-token');
  }

  removeUsername(): void {
    localStorage.removeItem('youtube-app-username');
  }
}
