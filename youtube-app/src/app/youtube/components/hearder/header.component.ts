import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isSearchToolsVisible: boolean;

  constructor(private router: Router) {
    this.isSearchToolsVisible = false;
  }

  showSearchTools() {
    this.isSearchToolsVisible = !this.isSearchToolsVisible;
  }

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }
}
