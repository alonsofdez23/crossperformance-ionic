import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEntrenoPageRoutingModule } from './add-entreno-routing.module';

import { AddEntrenoPage } from './add-entreno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEntrenoPageRoutingModule
  ],
  declarations: [AddEntrenoPage]
})
export class AddEntrenoPageModule {}
