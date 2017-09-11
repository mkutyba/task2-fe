import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdCheckboxModule,
  MdMenuModule,
  MdListModule,
  MdIconModule,
  MdToolbarModule,
  MdExpansionModule,
  MdFormFieldModule,
  MdInputModule,
  MdCardModule,
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCheckboxModule,
    MdMenuModule,
    MdListModule,
    MdIconModule,
    MdToolbarModule,
    MdExpansionModule,
    MdFormFieldModule,
    MdInputModule,
    MdCardModule,
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdMenuModule,
    MdListModule,
    MdIconModule,
    MdToolbarModule,
    MdExpansionModule,
    MdFormFieldModule,
    MdInputModule,
    MdCardModule,
  ],
})
export class MaterialComponentsModule {}
