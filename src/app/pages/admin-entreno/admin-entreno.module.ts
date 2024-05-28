import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminEntrenoPageRoutingModule } from './admin-entreno-routing.module';

import { AdminEntrenoPage } from './admin-entreno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminEntrenoPageRoutingModule
  ],
  declarations: [AdminEntrenoPage]
})
export class AdminEntrenoPageModule {}
