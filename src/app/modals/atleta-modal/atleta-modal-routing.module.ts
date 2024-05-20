import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtletaModalPage } from './atleta-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AtletaModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtletaModalPageRoutingModule {}
