import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-sorting',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule],
  templateUrl: './search-sorting.component.html',
  styleUrl: './search-sorting.component.scss',
})
export class SearchSortingComponent {
  inputControl = new FormControl('');
}
