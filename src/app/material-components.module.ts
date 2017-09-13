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
  MdProgressSpinnerModule,
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
    MdProgressSpinnerModule,
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
    MdProgressSpinnerModule,
  ],
})
export class MaterialComponentsModule {}
