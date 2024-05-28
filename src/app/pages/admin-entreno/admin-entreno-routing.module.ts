import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminEntrenoPage } from './admin-entreno.page';

const routes: Routes = [
  {
    path: '',
    component: AdminEntrenoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminEntrenoPageRoutingModule {}
