import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, MatButtonModule, MatInputModule, MatIconModule],
  exports: [MatButtonModule, MatInputModule, MatIconModule, ButtonComponent],
})
export class SharedModule {}
