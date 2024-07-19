import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.scss',
})
export class LoginButtonComponent implements OnInit {
  userName: string = '';
  isLogin: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {
    this.userName = this.authService.userName;
    this.isLogin = this.authService.isLogin();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.userName$.subscribe((name) => (this.userName = name))
    );
    this.subscriptions.add(
      this.authService.isLogin$.subscribe(
        (loginStatus) => (this.isLogin = loginStatus)
      )
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.goToLogin();
    console.log(this.authService.isLogin());
  }
}
