import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { ItemsComponent } from './items/items.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/suppliers',
    pathMatch: 'full'
  },
  {
    path: 'suppliers',
    component: SuppliersComponent
  },
  {
    path: 'items',
    component: ItemsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
