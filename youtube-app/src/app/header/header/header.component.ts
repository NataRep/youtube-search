import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { SearchFormComponent } from '../search-form/search-form.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, SearchFormComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {}
