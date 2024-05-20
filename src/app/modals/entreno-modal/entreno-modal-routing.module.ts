import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntrenoModalPage } from './entreno-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EntrenoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrenoModalPageRoutingModule {}
