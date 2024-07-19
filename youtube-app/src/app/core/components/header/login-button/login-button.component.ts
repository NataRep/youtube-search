import { Component } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.scss',
})
export class LoginButtonComponent {
  userName: string = '';
  isLogin: boolean = false;

  constructor(private authService: AuthService) {
    this.userName = this.authService.userName;
    this.isLogin = this.authService.isLogin;
  }
}
