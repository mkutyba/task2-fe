import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialComponentsModule } from './material-components.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SupplierService } from './model/supplier.service';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemService } from './model/item.service';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    SuppliersListComponent,
    SupplierFormComponent,
    SupplierDetailsComponent,
    ItemsListComponent,
    ItemFormComponent,
    ItemDetailsComponent,
  ],
  providers: [
    SupplierService,
    ItemService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
