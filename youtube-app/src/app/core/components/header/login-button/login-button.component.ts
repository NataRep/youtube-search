import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss'],
})
export class LoginButtonComponent implements OnInit, OnDestroy {
  userName: string = '';
  isLogin: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.goToLogin();
  }
}
