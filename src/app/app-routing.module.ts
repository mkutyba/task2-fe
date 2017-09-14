import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

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
    component: ItemsListComponent,
    data: {
      title: 'Items',
    }
  },
  {
    path: 'items/new',
    component: ItemFormComponent,
    data: {
      title: 'Items - Add',
    }
  },
  {
    path: 'items/edit/:id',
    component: ItemFormComponent,
    data: {
      title: 'Items - Edit',
    }
  },
  {
    path: 'items/view/:id',
    component: ItemDetailsComponent,
    data: {
      title: 'Items - View',
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
