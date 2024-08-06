import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.userName$.subscribe((name) => {
        this.userName = name;
        //Forced change tracking for correct application operation in different tabs
        this.cd.detectChanges();
      })
    );
    this.subscriptions.add(
      this.authService.isLogin$.subscribe((loginStatus) => {
        this.isLogin = loginStatus;
        // Forced change tracking for correct application operation in different tabs
        this.cd.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }

  logout() {
    this.authService.logout();
    this.goToLogin();
  }
}
