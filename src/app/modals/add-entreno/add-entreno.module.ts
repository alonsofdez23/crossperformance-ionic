import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEntrenoPageRoutingModule } from './add-entreno-routing.module';

import { AddEntrenoPage } from './add-entreno.page';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddEntrenoPageRoutingModule,
    CKEditorModule
  ],
  declarations: [AddEntrenoPage]
})
export class AddEntrenoPageModule {}
