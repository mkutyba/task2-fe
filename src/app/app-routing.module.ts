import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { ItemsComponent } from './items/items.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/suppliers',
    pathMatch: 'full'
  },
  {
    path: 'suppliers',
    component: SuppliersListComponent,
    data: {
      title: 'Suppliers',
    }
  },
  {
    path: 'suppliers/new',
    component: SupplierFormComponent,
    data: {
      title: 'Suppliers - Add',
    }
  },
  {
    path: 'suppliers/edit/:id',
    component: SupplierFormComponent,
    data: {
      title: 'Suppliers - Edit',
    }
  },
  {
    path: 'suppliers/view/:id',
    component: SupplierDetailsComponent,
    data: {
      title: 'Suppliers - View',
    }
  },
  {
    path: 'items',
    component: ItemsComponent,
    data: {
      title: 'Items',
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
