import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../../../core/models/search-item.model';
import {
  generateRandomId,
  imageUrlValidator,
  pastDateValidator,
  urlValidator,
} from './helper';
import { Store } from '@ngrx/store';
import { GlobalState } from '../../../redux/store.model';
import * as AppAction from './../../../redux/actions';

@Component({
  selector: 'app-card-creation-form',
  templateUrl: './card-creation-form.component.html',
  styleUrls: ['./card-creation-form.component.scss'],
})
export class CardCreationFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    // eslint-disable-next-line @ngrx/no-typed-global-store
    private store: Store<GlobalState>
  ) {}

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
      imageLink: [
        '',
        Validators.compose([Validators.required, imageUrlValidator()]),
      ],
      videoLink: [
        '',
        Validators.compose([Validators.required, urlValidator()]),
      ],
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
      const tags = this.form.value.tags.map(
        (item: { name: string }) => item.name
      );
      const customVideo: Item = {
        kind: 'custom-video',
        id: generateRandomId(),
        snippet: {
          publishedAt: new Date(this.form.value.creationDate).toISOString(),
          title: this.form.value.title,
          description: this.form.value.description,
          thumbnails: {
            medium: {
              url: this.form.value.imageLink,
              width: 320,
              height: 180,
            },
          },
          tags: tags,
          videoLink: this.form.value.videoLink,
        },
        statistics: {
          viewCount: '0',
          likeCount: '0',
          favoriteCount: '0',
          commentCount: '0',
        },
      };
      this.store.dispatch(AppAction.addCustomVideo({ video: customVideo }));
      this.resetForm();
    }
  }

  resetForm() {
    // Сброс значений формы
    this.form.reset({
      title: '',
      description: '',
      imageLink: '',
      videoLink: '',
      creationDate: '',
      tags: [],
    });

    //  все поля формы отмечены как "чистые" и "не тронутые"
    this.form.markAsPristine();
    this.form.markAsUntouched();

    // Сброс FormArray
    const tags = this.form.get('tags') as FormArray;
    while (tags.length > 1) {
      tags.removeAt(1);
    }
    if (tags.length === 0) {
      tags.push(this.createTag());
    }

    // Сброс ошибок валидации
    tags.controls.forEach((tag) => {
      tag.setErrors(null);
    });

    // Сбрасываем ошибки валидации
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      if (control) {
        control.setErrors(null);
      }
    });
  }
}
