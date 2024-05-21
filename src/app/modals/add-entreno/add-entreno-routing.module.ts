import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEntrenoPage } from './add-entreno.page';

const routes: Routes = [
  {
    path: '',
    component: AddEntrenoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEntrenoPageRoutingModule {}
