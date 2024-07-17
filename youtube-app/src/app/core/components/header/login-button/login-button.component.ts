import { Component } from '@angular/core';
import { CoreService } from '../../../services/core.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.scss',
})
export class LoginButtonComponent {
  userName: string = '';
  isLogin: boolean = false;

  constructor(private coreService: CoreService) {
    this.userName = this.coreService.userName;
    this.isLogin = this.coreService.isLogin;
  }
}
