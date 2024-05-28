import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinAtletaClaseModalPageRoutingModule } from './join-atleta-clase-modal-routing.module';

import { JoinAtletaClaseModalPage } from './join-atleta-clase-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinAtletaClaseModalPageRoutingModule
  ],
  declarations: [JoinAtletaClaseModalPage]
})
export class JoinAtletaClaseModalPageModule {}
