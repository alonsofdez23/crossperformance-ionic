import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-entreno',
  templateUrl: './add-entreno.page.html',
  styleUrls: ['./add-entreno.page.scss'],
})
export class AddEntrenoPage implements OnInit {

  entrenoForm!: FormGroup;

  title = 'angular';
  public Editor = ClassicEditor;

  public denominacion: string = '';
  public entreno: string = '';

  constructor(
    private modalCtrl: ModalController,
    private utilitiesService: UtilitiesService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    // Formulario entreno
    this.entrenoForm = this.formBuilder.group({
      denominacion: ['', [Validators.required, Validators.maxLength(15)]],
      entreno: ['', [Validators.required]],
    });
  }

  closeModal(data: any = null) {
    this.modalCtrl.dismiss(data);
  }

  storeEntrenoRequest() {
    console.log(this.entrenoForm.value);

    if (this.entrenoForm.invalid) return;

    this.apiService.storeEntreno(this.entrenoForm.value)
      .subscribe({
        next: (res: any) => {
          console.log(res);

          this.closeModal('success-admin-entrenos');
          this.utilitiesService.presentToast(`Entreno ${this.entrenoForm.get('denominacion')?.value} creado correctamente`);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

}
