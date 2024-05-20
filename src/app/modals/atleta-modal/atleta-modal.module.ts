import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtletaModalPageRoutingModule } from './atleta-modal-routing.module';

import { AtletaModalPage } from './atleta-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtletaModalPageRoutingModule
  ],
  declarations: [AtletaModalPage]
})
export class AtletaModalPageModule {}
