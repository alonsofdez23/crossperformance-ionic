import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddClasePageRoutingModule } from './add-clase-routing.module';

import { AddClasePage } from './add-clase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddClasePageRoutingModule
  ],
  declarations: [AddClasePage]
})
export class AddClasePageModule {}
