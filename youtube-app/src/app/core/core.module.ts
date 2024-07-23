import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../youtube/pages/not-found/not-found.component';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, CoreRoutingModule],
  exports: [],
})
export class CoreModule {}
