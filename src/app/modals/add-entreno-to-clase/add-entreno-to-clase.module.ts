import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEntrenoToClasePageRoutingModule } from './add-entreno-to-clase-routing.module';

import { AddEntrenoToClasePage } from './add-entreno-to-clase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEntrenoToClasePageRoutingModule
  ],
  declarations: [AddEntrenoToClasePage]
})
export class AddEntrenoToClasePageModule {}
