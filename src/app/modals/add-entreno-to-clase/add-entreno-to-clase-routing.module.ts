import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEntrenoToClasePage } from './add-entreno-to-clase.page';

const routes: Routes = [
  {
    path: '',
    component: AddEntrenoToClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEntrenoToClasePageRoutingModule {}
