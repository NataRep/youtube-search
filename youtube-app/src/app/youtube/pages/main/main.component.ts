import { Component } from '@angular/core';
import { SearchResultsComponent } from '../../components/search-results/search-results.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SearchResultsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  constructor() {}
}
