import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-card-creation-form',
  templateUrl: './card-creation-form.component.html',
  styleUrls: ['./card-creation-form.component.scss'],
})
export class CardCreationFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createForm();
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
      tags: this.fb.array([this.createTag()]),
    });
  }

  private createTag(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
    });
  }

  get tags(): FormArray {
    return this.form.get('tags') as FormArray;
  }

  addTag(): void {
    if (this.tags.length < 5) {
      this.tags.push(this.createTag());
    }
  }

  removeTag(index: number): void {
    if (this.tags.length > 1) {
      this.tags.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted', this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }
  resetForm() {
    this.form.reset();

    //убираю из очищенной формы ошибки
    this.form.markAsPristine();
    this.form.markAsUntouched();

    while (this.tags.length > 1) {
      this.tags.removeAt(1);
    }
    if (this.tags.length === 0) {
      this.tags.push(this.createTag());
    }
  }
}

export function pastDateValidator(): ValidatorFn {
  return (
    control: AbstractControl
  ): { [key: string]: ValidationErrors } | null => {
    const dateValue = control.value;
    const error: ValidationErrors = {
      pastDate: 'The date must be in the past',
    };
    if (dateValue && new Date(dateValue) > new Date()) {
      return error;
    }
    return null;
  };
}
