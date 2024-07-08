import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../../button/button.component';
import { SearchService } from '../../search/search.service';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    ButtonComponent,
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent {
  inputControl = new FormControl('');

  constructor(private searchService: SearchService) {}

  onSearch() {
    if (this.inputControl.value) {
      this.searchService.setSearchTerm(this.inputControl.value);
    }
  }
}
