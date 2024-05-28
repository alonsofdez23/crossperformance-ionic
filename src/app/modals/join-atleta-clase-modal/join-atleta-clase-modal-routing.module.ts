import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinAtletaClaseModalPage } from './join-atleta-clase-modal.page';

const routes: Routes = [
  {
    path: '',
    component: JoinAtletaClaseModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinAtletaClaseModalPageRoutingModule {}
