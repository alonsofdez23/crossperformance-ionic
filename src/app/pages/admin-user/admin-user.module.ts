import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminUserPageRoutingModule } from './admin-user-routing.module';

import { AdminUserPage } from './admin-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AdminUserPageRoutingModule
  ],
  declarations: [AdminUserPage]
})
export class AdminUserPageModule {}
