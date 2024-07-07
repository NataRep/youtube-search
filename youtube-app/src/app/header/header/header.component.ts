import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { SearchFormComponent } from '../search-form/search-form.component';
import { SearchSortButtonComponent } from '../search-sort-button/search-sort-button.component';
import { SearchSortingComponent } from '../search-sort-bar/search-sorting.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    LogoComponent,
    SearchFormComponent,
    SearchSortButtonComponent,
    SearchSortingComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isShowSorting: boolean = false;

  changeSortingVisibility() {
    this.isShowSorting = !this.isShowSorting;
  }
}
