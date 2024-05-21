import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddClasePageRoutingModule } from './add-clase-routing.module';

import { AddClasePage } from './add-clase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddClasePageRoutingModule
  ],
  declarations: [AddClasePage]
})
export class AddClasePageModule {}
