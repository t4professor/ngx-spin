import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSpinComponent } from './ngx-spin.component';

@NgModule({
  declarations: [NgxSpinComponent],
  exports: [NgxSpinComponent],
  imports: [CommonModule],
})
export class NgxSpinModule {}
