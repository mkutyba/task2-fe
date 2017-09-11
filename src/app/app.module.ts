import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentsModule } from './material-components.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { ItemsComponent } from './items/items.component';
import { SupplierService } from './suppliers/supplier.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    AppRoutingModule,
    HttpModule,
  ],
  declarations: [
    AppComponent,
    SuppliersComponent,
    ItemsComponent,
  ],
  providers: [SupplierService],
  bootstrap: [AppComponent]
})
export class AppModule {}
