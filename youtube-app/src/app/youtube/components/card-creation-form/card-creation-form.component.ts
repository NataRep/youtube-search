import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-card-creation-form',
  templateUrl: './card-creation-form.component.html',
  styleUrl: './card-creation-form.component.scss',
})
export class CardCreationFormComponent implements OnInit {
  form!: FormGroup;
  currentDate!: Date;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createForm();
    this.currentDate = new Date();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),
      ],
      description: ['', Validators.maxLength(255)],
      imageLink: ['', Validators.required],
      videoLink: ['', Validators.required],
      creationDate: [
        '',
        Validators.compose([Validators.required, pastDateValidator()]),
      ],
    });
  }

  onSubmit() {}
}

export function pastDateValidator(): ValidatorFn {
  return (
    control: AbstractControl
  ): { [key: string]: ValidationErrors } | null => {
    const dateValue = control.value;
    const error: ValidationErrors = { pastDate: 'The date is invalid' };
    if (dateValue && new Date(dateValue) > new Date()) {
      return error;
    }
    return null;
  };
}
