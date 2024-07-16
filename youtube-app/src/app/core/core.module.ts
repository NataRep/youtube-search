import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/header/logo/logo.component';
import { SearchFormComponent } from './components/header/search-form/search-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, LogoComponent, SearchFormComponent],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
