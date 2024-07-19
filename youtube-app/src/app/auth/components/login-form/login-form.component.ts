import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const username = this.loginForm.get('username')!.value;
    const password = this.loginForm.get('password')!.value;

    if (username && typeof password === 'string') {
      this.authService.auth(username);
      console.log(this.authService.isLogin());
    }
  }
}
