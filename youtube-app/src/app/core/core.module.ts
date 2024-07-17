import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/header/logo/logo.component';
import { SearchFormComponent } from './components/header/search-form/search-form.component';
import { SharedModule } from '../shared/shared.module';
import { SearchSortButtonComponent } from './components/header/search-sort-button/search-sort-button.component';
import { SearchSortToolsComponent } from './components/header/search-sort-tools/search-sort-tools.component';
import { LoginButtonComponent } from './components/header/login-button/login-button.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    SearchFormComponent,
    SearchSortButtonComponent,
    SearchSortToolsComponent,
    LoginButtonComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule, SharedModule, CoreRoutingModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
