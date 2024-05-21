import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddClasePage } from './add-clase.page';

const routes: Routes = [
  {
    path: '',
    component: AddClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddClasePageRoutingModule {}
