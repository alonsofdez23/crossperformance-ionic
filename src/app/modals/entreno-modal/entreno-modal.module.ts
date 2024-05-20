import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntrenoModalPageRoutingModule } from './entreno-modal-routing.module';

import { EntrenoModalPage } from './entreno-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntrenoModalPageRoutingModule
  ],
  declarations: [EntrenoModalPage]
})
export class EntrenoModalPageModule {}
