import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SortService } from '../../../../core/services/sort.service';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  private subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private sortService: SortService,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      query: [''],
    });

    this.subscription = this.searchForm
      .get('query')!
      .valueChanges.pipe(
        debounceTime(300), //отсрочка, чтобы человек успел допечатать слово
        distinctUntilChanged(), //игнорируем повторяющиеся запросы
        filter((value) => value.length > 2)
      )
      .subscribe((value) => {
        this.search(value);
      });
  }

  private search(query: string) {
    this.sortService.searchTerm = query;
    this.router.navigate(['/']);
  }

  onSubmitResults() {
    const query = this.searchForm.get('query')!.value;
    if (query.length > 3) {
      this.search(query);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
