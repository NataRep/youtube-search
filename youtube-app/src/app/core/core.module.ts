import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/header/logo/logo.component';
import { SearchFormComponent } from './components/header/search-form/search-form.component';
import { SharedModule } from '../shared/shared.module';
import { SearchSortButtonComponent } from './components/header/search-sort-button/search-sort-button.component';
import { SearchSortToolsComponent } from './components/header/search-sort-tools/search-sort-tools.component';
import { LoginButtonComponent } from './components/header/login-button/login-button.component';

@NgModule({
  declarations: [HeaderComponent, LogoComponent, SearchFormComponent, SearchSortButtonComponent, SearchSortToolsComponent, LoginButtonComponent],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
