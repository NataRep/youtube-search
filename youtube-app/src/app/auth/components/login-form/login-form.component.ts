import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginForm: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      login: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/(?=.*[a-zA-Zа-яА-Я])/), // проверка на заглавные и строчные буквы
          Validators.pattern(/(?=.*\d)/), // проверка на цифры
          Validators.pattern(/[!#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/), // проверка на символы
        ]),
      ],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const login = this.loginForm.get('login')!.value;
      this.authService.auth(login);
      this.router.navigate(['']);
    }
  }
}
